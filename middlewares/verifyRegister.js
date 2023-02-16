import User from "../models/user.model.js";

export const checkDuplicateUsername = async (req, res, next) => {
    const { username } = req.body;

    if (!username) return res.status(400).send({ msg: "Required values not provided." });

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            return res.status(400).send({ msg: "Username is already taken!" });
        }
    } catch (error) { 
        return res.status(500).send({ msg: "Something went wrong" });
    }
    
    next();
}