import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movies: [{
        type: Number
    }]
});

export default mongoose.model("Watchlist", watchlistSchema);