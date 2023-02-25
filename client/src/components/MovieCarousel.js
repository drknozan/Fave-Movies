import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieCarousel({ genre }) {
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getMoviesByGenre = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/movies/?genre=${genre}`);
            setMovies(data.movies);
        }

        getMoviesByGenre();
    }, []);

    return (
        <div className="bg-slate-900 px-6 py-8 rounded">
            <div className="flex justify-between">
                <span className="text-white font-bold text-xl block mb-4">{genre}</span>
                <span onClick={() => navigate(`/search?genre=${genre}`)} className="text-white cursor-pointer border rounded bg-slate-900 flex items-center mb-2 text-xs p-2 hover:bg-slate-700">See all results</span>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    }
                }}
                navigation={true}
                modules={[ Navigation ]}
                className="mySwiper h-80"
                style={{
                    "--swiper-navigation-color": "#fff",
                }}
                >
                    {
                        movies &&
                        movies.map((e) => {
                            return (
                                <SwiperSlide className="bg-slate-400 cursor-pointer rounded" key={e.no} onClick={() => { navigate(`/movie/${e.no}`); }}>
                                    <img className="w-full h-full object-cover" src={e.poster_url} />
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>
        </div>
    )
}

export default MovieCarousel;