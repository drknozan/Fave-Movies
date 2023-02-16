import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    runtime: String,
    genre: String,
    rate: Number,
    overview: String,
    director: String,
    no: Number,
    year: Number,
    poster_url: String,
}, { collection: "movies" });

export default mongoose.model("Movie", movieSchema);