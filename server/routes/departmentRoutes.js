const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentEmployees,
} = require("../controllers/departmentController");

// Get all departments (accessible to all authenticated users)
router.get("/", protect, getDepartments);

// Create department (admin only)
router.post("/", protect, adminOnly, createDepartment);

// Get single department (accessible to all)
router.get("/:id", protect, getDepartment);

// Update department (admin only)
router.put("/:id", protect, adminOnly, updateDepartment);

// Delete department (admin only)
router.delete("/:id", protect, adminOnly, deleteDepartment);

// Get employees in department (accessible to all)
router.get(
    "/:id/employees",
    protect,
    getDepartmentEmployees
);

module.exports = router;
