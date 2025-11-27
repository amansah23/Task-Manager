const express = require("express");
const {registerUser, loginUser, getUserProfile, updateUserProfile} = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes (The Authentication must use here to secure the platform, that's why here is '5' things, that must check that the valid user is accessing...)
router.post("/register", registerUser ) // Register User
router.post("/login",loginUser ) // Login User
router.get("/profile",protect, getUserProfile) // Get User Profile
router.put("/profile",protect, updateUserProfile) // Update User Profile

router.post("/upload-image", upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: "No file Uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({ imageUrl });
});

module.exports = router;