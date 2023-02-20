import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

function WatchList () {
    const [watchListMovies, setWatchListMovies] = useState(null);
    const { displayAlert, watchList } = useAppContext();

    useEffect(() => {
        const getWatchListMovies = async () => {
            const watchListArr = [];

            for (const movieNo of watchList) {
                const { data } = await axios.get(`http://localhost:5000/api/movies/${movieNo}`).catch((err) => { displayAlert(err.response.data.msg, "danger"); });

                watchListArr.push(data);
            }

            setWatchListMovies(watchListArr);
        };

        getWatchListMovies();
    }, []);
    
    return (
        <div className="w-screen bg-slate-800">
            <div className="flex">
                <div className="w-4/5 mx-auto">
                    {
                        watchListMovies ?
                            <div className="grid grid-cols-4 gap-5 my-4">
                                {
                                    watchListMovies.map((e) => {
                                        return <MovieCard id={e.no} title={e.title} image={e.poster_url} year={e.year} rate={e.rate} key={e.no} />
                                    })
                                }
                            </div>
                        :
                            <div className="">
                                <div className="h-24 w-24 absolute left-[calc(50%-48px)] top-[calc(50%-48px)] animate-spin rounded-full border-t-4 border-gray-400 border-t-slate-500"></div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WatchList;