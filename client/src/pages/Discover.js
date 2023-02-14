import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getMovieForStarter = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/1`);
                setMovie(res.data);
            } catch (error) {
                setLoading(false);
            }
        }

        getMovieForStarter();
    }, []);

    const getRandomMovie = async () => {
        setLoading(true);
        const randomId = Math.floor(Math.random() * (500 - 1) + 1);
        try {
            const res = await axios.get(`http://localhost:5000/api/movies/${randomId}`);
            setMovie(res.data);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className="w-screen bg-slate-800">
            <div className="flex">
                <div className="w-4/5 mx-auto mt-6">
                    <div className="flex flex-col gap-y-6 items-center relative">
                        <div className="text-gray-300 text-2xl text-center">Discover! 🚀</div>
                        <img className="w-1/4 h-[450px] rounded shadow-2xl object-cover" src={movie.poster_url} style={{ display: loading ? "none" : "block" }} onLoad={() => setLoading(false)}></img>
                        {
                            loading &&  <div className="h-[450px] flex justify-center items-center">
                                            <div className="h-24 w-24 animate-spin rounded-full border-t-4 border-slate-900 border-t-slate-500"></div>
                                        </div>
                        }
                        <div className="flex gap-x-2 justify-center">
                            <button className="flex text-gray-200 cursor-pointer rounded bg-slate-900 items-center text-xs p-4 hover:bg-rose-700 gap-x-1.5 mt-4 shadow-md active:bg-slate-900" onClick={getRandomMovie}>
                                New random film!
                            </button>
                            <button className="flex text-gray-200 cursor-pointer rounded bg-slate-900 items-center text-xs p-4 hover:bg-green-700 gap-x-1.5 mt-4 shadow-md active:bg-slate-900" onClick={() => { navigate(`/movie/${movie.no}`) }}>
                                Look at details!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;