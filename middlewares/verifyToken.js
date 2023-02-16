import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.cookies.access_token;

    if (!token) {
        return res.status(401).send({ msg: "Invalid authentication" });
    }

    try {
        const info = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = info.data;
        
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Invalid authentication" });
    }
}