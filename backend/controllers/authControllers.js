const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{expiresIn: "7d"});
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) =>{
    try {
        const {name, email, password, profileImageUrl, adminInviteToken } = req.body;

        // check if user already exists
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({message: "User Already Exists!"});
        let role = "member";
        if(
            adminInviteToken &&
            adminInviteToken.trim() === process.env.ADMIN_INVITE_TOKEN.trim()
        ){
            role = "admin";
        }

        // Hash Password...
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // Create New User...
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });
        
        // Return User data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(401).json({message: "Server Error: "+error.message});
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({message: "Invalid Email or Password!"});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({message: "Invalid Email or Password!"});
        }

        // return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(401).json({message: "Server Error: "+error.message});
    }
};

// @desc    Get User Profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            res.status(404).json({message: "User Not Found!"});
        }
        res.json(user);
    } catch (error) {
        res.status(401).json({message: "Server Error: "+error.message});
    }
};

// @desc    Update User Profile
// @route   PUT /api/auth/profile
// @access  Private (Requires JWT)
const updateUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user){
            res.status(404).json({message: "User Not Found!"});
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.getSalt(10);
            user.password = await bcrypt.hash(req.body.password,salt)
        }

        const updatedUser = await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(updatedUser._id),
        });

    } catch (error) {
        res.status(401).json({message: "Server Error: "+error.message});
    }
};

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};