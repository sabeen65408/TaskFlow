const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    let token;

    // Check Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // Get Token
            token = req.headers.authorization.split(" ")[1];

            // Verify Token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Get Full User Details
            req.user = await User.findById(decoded.id).select("-password");

            // Check User Exists
            if (!req.user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            next();

        } catch (error) {

            console.log(error);

            return res.status(401).json({
                message: "Invalid Token"
            });

        }

    } else {

        return res.status(401).json({
            message: "No Token Provided"
        });

    }

};

module.exports = protect;