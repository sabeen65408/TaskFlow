const Department = require("../models/Department");
const User = require("../models/User");

/* =====================================
Create Department
===================================== */

const createDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;

        // =====================================
        // Validate required fields
        // =====================================

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Department name is required",
            });
        }

        // =====================================
        // Check duplicate name
        // =====================================

        const existingDept = await Department.findOne({
            name: name.trim().toLowerCase(),
        });

        if (existingDept) {
            return res.status(400).json({
                message: "Department already exists with this name",
            });
        }

        // =====================================
        // Create department
        // =====================================

        const department = await Department.create({
            name: name.trim(),
            description: description ? description.trim() : "",
        });

        res.status(201).json(department);
    } catch (error) {
        // =====================================
        // MongoDB duplicate key protection
        // =====================================

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Department name already exists",
            });
        }

        res.status(500).json({
            message: error.message,
        });
    }
};

/* =====================================
Get All Departments
===================================== */

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ name: 1 });

        res.json(departments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* =====================================
Get Single Department
===================================== */

const getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
            });
        }

        res.json(department);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* =====================================
Update Department
===================================== */

const updateDepartment = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
            });
        }

        // =====================================
        // Check duplicate name
        // =====================================

        if (name && name.trim() !== department.name) {
            const existingDept = await Department.findOne({
                name: name.trim().toLowerCase(),
                _id: { $ne: department._id },
            });

            if (existingDept) {
                return res.status(400).json({
                    message: "Department name already exists",
                });
            }
        }

        // =====================================
        // Update fields
        // =====================================

        department.name = name ? name.trim() : department.name;
        department.description = description
            ? description.trim()
            : department.description;

        if (isActive !== undefined) {
            department.isActive = isActive;
        }

        await department.save();

        res.json(department);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* =====================================
Delete Department
===================================== */

const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
            });
        }

        // =====================================
        // Check if employees exist in department
        // =====================================

        const employeeCount = await User.countDocuments({
            department: department._id,
        });

        if (employeeCount > 0) {
            return res.status(400).json({
                message: `Cannot delete department. ${employeeCount} employee(s) assigned to this department.`,
            });
        }

        await department.deleteOne();

        res.json({
            message: "Department deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/* =====================================
Get Employees in Department
===================================== */

const getDepartmentEmployees = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found",
            });
        }

        const employees = await User.find({
            department: department._id,
        }).select("-password");

        res.json({
            department,
            employees,
            count: employees.length,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentEmployees,
};
