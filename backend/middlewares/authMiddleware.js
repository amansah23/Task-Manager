const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect Routes...
const protect = async (req, res, next)=>{
    try {
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1]; // Extract Token..
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } else{
            res.status(401).json({message: "Not Authorized, No Token Found!"})
        }
    } catch (error) {
        res.status(401).json({message: "Toke Failed: "+error.message});
    }
};

// Middleware for Admin Only Access...

const adminOnly = (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    } else{
        res.status(401).json({message: "Access Denied, Admin Only!"});
    }
};

module.exports = {protect, adminOnly};