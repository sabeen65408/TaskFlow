const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getProfile,
    updateProfile,
    changePassword,
    updatePreferences

} = require("../controllers/settingsController");


// Profile

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfile
);


// Password

router.put(
    "/password",
    protect,
    changePassword
);


// Preferences

router.put(
    "/preferences",
    protect,
    updatePreferences
);

module.exports = router;