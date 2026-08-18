const adminOnly = (req, res, next) => {
    try {
        // Verify user is authenticated
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Check if user has admin role
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required."
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = adminOnly;
