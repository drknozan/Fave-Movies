import express from "express";
import { addMovieToWatchList, deleteMovieFromWatchList, getMoviesFromWatchList } from "../controllers/watchlist.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, getMoviesFromWatchList);
router.route("/add").post(verifyToken, addMovieToWatchList);
router.route("/delete").post(verifyToken, deleteMovieFromWatchList);

export default router;