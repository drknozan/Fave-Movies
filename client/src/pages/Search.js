import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rateSort, setRateSort] = useState(false);
    const [result, setResult] = useState(null);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const genre = searchParams.get("genre") || "";
    const title = searchParams.get("title") || "";

    const onPageClick = (e) => {
        if (e.target.name === "prevPage" && page > 1) {
            const newPageNumber = page - 1;
            setPage(newPageNumber);
        }

        if (e.target.name === "nextPage" && page < pageCount ) {
            const newPageNumber = page + 1;
            setPage(newPageNumber);
        }
    }

    useEffect(() => {
        setResult(null);

        const getMovies = async () => {
            if (genre) {
                let reqUrl = `http://localhost:5000/api/movies/?genre=${genre}&page=${page}`;
                
                if (rateSort) {
                    reqUrl += '&sortByRate=descending';
                }
                
                try {
                    const { data } = await axios.get(reqUrl);
                    setResult(data.movies);
                    setPageCount(data.pageCount);
                } catch (error) {
                    
                }
            }

            if (title) {
                let reqUrl = `http://localhost:5000/api/movies/?title=${title}&page=${page}`;

                if (rateSort) {
                    reqUrl += `&sortByRate=descending`;
                }

                try {
                    const { data } = await axios.get(reqUrl);
                    setResult(data.movies);
                    setPageCount(data.pageCount);
                } catch (error) {
                    
                }
            }
        }

        getMovies();
    }, [searchParams, rateSort, page]);

    return (
        <div className="w-screen bg-slate-800">
            <div className="flex">
                <div className="w-4/5 mx-auto">
                    <label className="inline-flex relative items-center cursor-pointer mt-4">
                        <input type="checkbox" value="" className="sr-only peer" onChange={e => setRateSort(e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 text-gray-300">Sort By Rate</span>
                    </label>
                    {
                        result ?
                            <div className="grid grid-cols-4 gap-5 my-4">
                                {
                                    result.map((e) => {
                                        return <MovieCard id={e.no} title={e.title} image={e.poster_url} year={e.year} rate={e.rate} key={e.no} />
                                    })
                                }
                            </div>
                        :
                            <div className="">
                                <div className="h-24 w-24 absolute left-[calc(50%-48px)] top-[calc(50%-48px)] animate-spin rounded-full border-t-4 border-gray-400 border-t-slate-500"></div>
                            </div>
                    }
                    <div className="flex justify-center py-8 gap-x-4">
                        <button href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 border border-gray-400 bg-slate-900 rounded hover:bg-slate-800" name="prevPage" onClick={(e) => onPageClick(e)}>
                            <ChevronLeftIcon className="h-6 w-6 text-gray-400" />
                            Previous
                        </button>
                        <button href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 border border-gray-400 bg-slate-900 rounded hover:bg-slate-800" name="nextPage" onClick={(e) => onPageClick(e)}>
                            <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;