import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import mongoose from "mongoose";

export const app = express();

dotenv.config();

// Enable cors
const corsOptions = {
    credentials: true,
    origin: true,
}
app.use(cors(corsOptions));

app.use(cookieParser());

// Secure HTTP headers
app.use(helmet());

// Sanitize requests for mongodb
app.use(mongoSanitize());

app.use(express.json());

// API routes

// 404 for any unknown request
app.use((req, res) => {
    res.status(404).send({ msg: "404 Not found." })
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});