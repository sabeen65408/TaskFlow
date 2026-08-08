const router = require("express").Router();

const protect = require("../middleware/authMiddleware");

const {
    getNotifications,
    markAsRead,
    markAllAsRead,
} = require("../controllers/notificationController");

// =====================================
// Get Logged-in User Notifications
// =====================================

router.get(
    "/",
    protect,
    getNotifications
);

// =====================================
// Mark All Notifications as Read
// =====================================

router.put(
    "/read-all",
    protect,
    markAllAsRead
);

// =====================================
// Mark Single Notification as Read
// =====================================

router.put(
    "/:id/read",
    protect,
    markAsRead
);

console.log("Notification routes loaded");

router.put("/read-all", protect, (req, res, next) => {
    console.log("READ ALL ROUTE HIT");
    next();
}, markAllAsRead);

router.put("/:id/read", protect, (req, res, next) => {
    console.log("READ ONE ROUTE HIT");
    next();
}, markAsRead);

module.exports = router;