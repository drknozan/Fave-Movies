import User from "../models/user.model.js";
import Watchlist from "../models/watchlist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ msg: "Required values not provided." });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ username: username, password: hashedPassword });

        await Watchlist.create({ createdBy: user._id, movies: [] });

        return res.status(201).send({ msg: "Account successfully created" });
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ msg: "Required values not provided." });
    }

    try {
        const user = await User.findOne({ username: username }).lean().exec();

        if (!user) {
            return res.status(401).send({ msg: "Username or password is wrong" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare) {
            user.password = undefined;
            user.__v = undefined;
        
            const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: "2h"});
    
            return res.cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).status(200).send({ user });
        }

        return res.status(401).send({ msg: "Username or password is wrong" });
    } catch (err) {
        return res.status(401).send({ msg: "Username or password is wrong" });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });

        user.password = undefined;
        user.__v = undefined;

        return res.status(200).send({ user })
    } catch (err) {
        return res.status(500).send({ msg: "Something went wrong" });
    }
}

export const logout = async (req, res) => {
    return res.clearCookie("access_token", {path:'/'}).status(200).send({ msg: "Logged out" });
}