import Watchlist from "../models/watchlist.model.js";
import Movie from "../models/movie.model.js";

// Get movies from user's watch list
export const getMoviesFromWatchList = async (req, res) => {
    const user = req.user;

    try {
        const watchlist = await Watchlist.findOne({ createdBy: user._id }).lean().exec();

        const movies = watchlist.movies;

        return res.status(200).send({ movies: movies });
    } catch (err) {
        return res.status(500).send({ msg: "Something went wrong" })
    }
}

// Add new movie to user's watch list
export const addMovieToWatchList = async (req, res) => {
    let { movieNo } = req.body;
    movieNo = Number(movieNo);
    const user = req.user;

    if (!movieNo) {
        return res.status(400).send({ msg: "Required values not provided" });
    }

    try {
        const movie = await Movie.findOne({ no: movieNo }).lean().exec();

        if (!movie) {
            return res.status(404).send({ msg: "Movie not found with given id" });
        }

        const watchlist = await Watchlist.findOne({ ownedBy: user._id }).lean().exec();
        
        if (watchlist.movies.includes(Number(movieNo))) {
            return res.status(400).send({ msg: "Movie already in watch list" });
        }

        const updatedWatchList = await Watchlist.findOneAndUpdate({ ownedBy: user._id }, { $push: { movies: movieNo } }, { new: true });

        const movies = updatedWatchList.movies;

        return res.status(201).send({ movies: movies });
    } catch (err) {
        return res.status(500).send({ msg: "Something went wrong" });
    }
}

// Delete movie from user's watch list
export const deleteMovieFromWatchList = async (req, res) => {
    let { movieNo } = req.body;
    movieNo = Number(movieNo);
    const user = req.user;

    if (!movieNo) {
        res.status(400).send({ msg: "Required values not provided" });
    }

    try {
        const movie = await Movie.findOne({ no: movieNo }).lean().exec();

        if (!movie) {
            return res.status(404).send({ msg: "Movie not found with given id" });
        }

        const watchlist = await Watchlist.findOne({ ownedBy: user._id }).lean().exec();

        if (!watchlist.movies.includes(Number(movieNo))) {
            return res.status(400).send({ msg: "Watch list already does not have given movie" });
        }

        const updatedWatchList = await Watchlist.findOneAndUpdate({ ownedBy: user._id }, { $pull: { movies: movieNo } }, { new: true });

        const movies = updatedWatchList.movies;

        return res.status(200).send({ movies: movies });
    } catch (err) {
        return res.status(500).send({ msg: "Something went wrong" });
    }
}