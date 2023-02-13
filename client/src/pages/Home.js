import MovieCarousel from "../components/MovieCarousel";

function Home() {
    const categories = [
        "Sci-Fi",
        "Adventure",
        "Comedy",
        "Drama",
        "Action",
        "Crime",
        "Romance",
        "Mystery",
        "History",
        "Biography",
        "Fantasy",
        "War",
        "Animation",
        "Thriller",
    ];

    return(
        <div className="flex flex-col w-4/5 mx-auto my-6 gap-12">
            {
                categories.map((e) => {
                    return <MovieCarousel genre={e} key={e}></MovieCarousel>
                })
            }
        </div>
    )
}

export default Home;