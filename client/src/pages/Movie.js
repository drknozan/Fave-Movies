import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

function Movie() {
    const [movie, setMovie] = useState(null);
    const [onList, setOnList] = useState(false);
    let { id } = useParams();
    const { displayAlert, watchList, addMovieToWatchList, deleteMovieFromWatchList } = useAppContext();

    useEffect(() => {
        const getMovieInfoById = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/${id}`);

                setMovie(res.data);
            } catch (err) {
               displayAlert(err.response.data.msg, "danger");
            }
        }

        getMovieInfoById();
    }, []);

    useEffect(() => {
        if (watchList && watchList.includes(Number(id))) {
            setOnList(true);
        } else {
            setOnList(false)
        }
    }, [watchList]);

    return (
        <div className="w-screen bg-slate-800">
            <div className="flex">
                <div className="flex w-4/5 mx-auto  my-6">
                    {
                        movie ?
                        <React.Fragment>
                                <div className="w-full">
                                    <img className="w-3/4 object-cover rounded shadow-xl" src={movie.poster_url} />
                                </div>
                                <div className="w-full">
                                    <div className="p-4 text-xl text-gray-200 text-center bg-slate-900 rounded text-center shadow-md">
                                        {movie.title}
                                    </div>
                                    <div className="flex justify-between mt-6 bg-slate-900 p-4 rounded shadow-md text-gray-300">
                                        <div className="flex flex-col gap-y-4">
                                            <div className="text-sm">
                                                Year: {movie.year}
                                            </div>
                                            <div className="text-sm">
                                                Runtime: {movie.runtime}
                                            </div>
                                            <div className="text-sm">
                                                Director: {movie.director}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-4">
                                            <div className="text-sm">
                                                Genres: {movie.genre}
                                            </div>
                                            <div className="text-sm">
                                                IMDB Rate: {movie.rate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-300 mt-6 bg-slate-900 p-4 rounded shadow-md">
                                        {movie.overview}
                                    </div>
                                    {
                                        onList ?
                                        <button className="flex border border-gray-200 text-gray-200 cursor-pointer rounded bg-slate-900 items-center text-xs p-4 hover:bg-red-700 gap-x-1.5 mt-4 shadow-md active:bg-slate-900" onClick={() => deleteMovieFromWatchList(id)}>
                                            Remove from watch list
                                            <BookmarkIcon className="w-4 h-4" />
                                        </button>
                                        :
                                        <button className="flex border border-gray-200 text-gray-200 cursor-pointer rounded bg-slate-900 items-center text-xs p-4 hover:bg-green-700  gap-x-1.5 mt-4 shadow-md active:bg-slate-900" onClick={() => addMovieToWatchList(id)}>
                                            Add to watch list
                                            <BookmarkIcon className="w-4 h-4" />
                                        </button>
                                    }
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className="h-24 w-24 absolute left-[calc(50%-48px)] top-[calc(50%-48px)] animate-spin rounded-full border-t-4 border-gray-400 border-t-slate-500"></div>
                            </React.Fragment>
                    }
                </div>
            </div>
        </div>
    );
}

export default Movie