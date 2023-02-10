import { useNavigate } from "react-router-dom"
import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function MovieCard({ id, title, image, year, rate }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function onLoad() {
        setLoading(false)
    }

    return (
        <div className="relative cursor-pointer shadow-md group" onClick={() => { navigate(`/movie/${id}`) }}>
            {
                loading && <div className="bg-slate-400 rounded h-[calc(100vh*3/5)] w-full animate-pulse"></div>
            }
            <img className="object-cover h-[calc(100vh*3/5)] w-full rounded group-hover:opacity-60" src={image} style={{ display: loading ? "none" : "block" }} onLoad={() => onLoad()} />
            <div className="absolute hidden group-hover:block w-full bottom-0 text-white p-4 bg-black">
                <div className="text-lg">
                    {title}
                </div>
                <div className="flex justify-between text-sm">
                    <div>
                        Year: {year}
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <StarIcon className="h-4 w-4"/> Rate: {rate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard