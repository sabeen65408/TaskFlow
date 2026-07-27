const router = require("express").Router();

const protect = require("../middleware/authMiddleware");

const {
    getActivities,
    getProjectActivities
} = require("../controllers/activityController");

// Dashboard
router.get(
    "/",
    protect,
    getActivities
);

// Particular Project
router.get(
    "/:projectId",
    protect,
    getProjectActivities
);

module.exports = router;