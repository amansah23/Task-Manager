const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
    getUsers,
    // deleteUser,
    getUserById
} = require("../controllers/userControllers");

const router = express.Router();

// User Management Routes
router.get("/",protect,adminOnly,getUsers); // Get All Users(Admin Only)
router.get("/:id",protect,getUserById);
// router.delete("/:id",protect,adminOnly,deleteUser); // Delete the Specific User(Admin Only)

module.exports = router;