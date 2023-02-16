import Movie from "../models/movie.model.js";

// Get all movies based on given query parameters
export const getMovies = async (req, res) => {
    let { page, genre, director, title, year, sortByRate} = req.query;

    // Create query object and add fields based on the given query strings
    let query = {};

    if (genre) { 
        query.genre = { $regex: genre, $options: "i" } 
    }

    if (year) {
        query.year = year;
    }
    
    if (title) {
        query.title = { $regex: title, $options: "i" };
    }
    
    if (director) {
        query.director = { $regex: director, $options: "i" };
    }

    try {
        let results = Movie.find(query).skip((page - 1) * 20).limit(20);

        // Check sortByRate parameter to sort by rate
        if (sortByRate && (sortByRate === "descending")) {
            results = results.sort("-rate");
        }

        if (sortByRate && (sortByRate === "ascending")) {
            results = results.sort("rate");
        }

        // Pagination
        page = (page && page > 0) ? Number(req.query.page) : 1;
        
        results = results.skip((page - 1) * 20).limit(20);

        const movies = await results;

        const totalResultCount = await Movie.countDocuments(query);
        
        const pageCount = Math.ceil(totalResultCount / 20);

        if (movies.length == 0) {
            return res.status(404).send({ msg: "Can't find any movie." });
        }
        
        return res.status(200).send({ movies, pageCount });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: "Something went wrong." });
    }
}

// Get specific movie details with given id
export const getMovie = async (req, res) => {
    let { id } = req.params;

    try {
        const movie = await Movie.findOne({ no: id }).lean().exec();

        if (!movie) {
            return res.status(404).send({ msg: "Can't find any movie." });
        }

        return res.status(200).send(movie);
    } catch (err) {
        return res.status(500).send({ msg: "Something went wrong." });
    }
}