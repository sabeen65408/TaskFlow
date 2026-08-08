import { useEffect, useMemo, useState } from "react";

import EmployeeModal from "../components/EmployeeModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Header from "../components/Header";
import "../styles/employees.css";
import toast from "react-hot-toast";
import EmployeeDrawer from "../components/EmployeeDrawer";

import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import {
  getUsers,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
} from "../services/userService";

function Employees() {

  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // ==========================================
  // Employee Form
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "employee",
  });

  // ==========================================
  // Load Employees
  // ==========================================

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {

    try {

      const data = await getUsers();

      setEmployees(data);

    } catch (err) {

      console.log(err);

      toast.error("Unable to load employees");

    }

  };

  // ==========================================
  // Handle Form Change
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================================
  // Add Employee
  // ==========================================

  const handleAddEmployee = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {

      return toast.error(
        "Please fill all fields."
      );

    }

    try {

      setLoading(true);

      await createEmployee(formData);

      toast.success(
        "Employee Added Successfully"
      );

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "employee",
      });

      loadEmployees();

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to create employee"
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // Edit Employee
  // ==========================================

  const handleEditEmployee = (employee) => {

    setEditingEmployee(employee);

    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      password: "",
      role: employee.role || "employee",
    });

    setShowModal(true);

  };

  // ==========================================
  // View Employee
  // ==========================================

  const handleViewEmployee = async (employee) => {

    try {

      const data = await getEmployeeDetails(
        employee._id
      );

      setSelectedEmployee(data);

      setShowDrawer(true);

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to load employee details."
      );

    }

  };

  // ==========================================
  // Update Employee
  // ==========================================

  const handleUpdateEmployee = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {

      return toast.error(
        "Please fill all fields."
      );

    }

    try {

      setLoading(true);

      await updateEmployee(
        editingEmployee._id,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      toast.success("Employee Updated");

      setShowModal(false);

      setEditingEmployee(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "employee",
      });

      loadEmployees();

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to update employee"
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // Delete Employee
  // ==========================================

  const handleDeleteEmployee = (employee) => {

    setSelectedEmployee(employee);

    setShowDeleteModal(true);

  };

  const confirmDeleteEmployee = async () => {

    if (!selectedEmployee) return;

    try {

      setDeleteLoading(true);

      await deleteEmployee(
        selectedEmployee._id
      );

      toast.success("Employee Deleted");

      setShowDeleteModal(false);

      setSelectedEmployee(null);

      loadEmployees();

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to delete employee"
      );

    } finally {

      setDeleteLoading(false);

    }

  };

  // ==========================================
  // Search
  // ==========================================

  const filteredEmployees = useMemo(() => {

    return employees.filter((employee) => {

      const keyword =
        search.toLowerCase();

      return (
        employee.name
          ?.toLowerCase()
          .includes(keyword) ||

        employee.email
          ?.toLowerCase()
          .includes(keyword) ||

        employee.phone
          ?.toLowerCase()
          .includes(keyword)
      );

    });

  }, [employees, search]);

  // ==========================================
  // Statistics
  // ==========================================

  const totalEmployees =
    employees.length;

  const adminCount =
    employees.filter(
      (user) =>
        user.role === "admin"
    ).length;

  const employeeCount =
    employees.filter(
      (user) =>
        user.role === "employee"
    ).length;

  // ==========================================
  // Render
  // ==========================================

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        <Header
          title="👥 Employee Management"
          subtitle="Manage employees in your organization."
        />

        {/* ================= Statistics ================= */}

        <div className="employee-stats">

          <div className="employee-stat-card">

            <div className="employee-icon blue">
              <FiUsers />
            </div>

            <div>

              <h2>{totalEmployees}</h2>

              <p>Total Users</p>

            </div>

          </div>

          <div className="employee-stat-card">

            <div className="employee-icon green">
              <FiUserCheck />
            </div>

            <div>

              <h2>{employeeCount}</h2>

              <p>Employees</p>

            </div>

          </div>

          <div className="employee-stat-card">

            <div className="employee-icon purple">
              <FiShield />
            </div>

            <div>

              <h2>{adminCount}</h2>

              <p>Admins</p>

            </div>

          </div>

        </div>

        {/* ================= Toolbar ================= */}

        <div className="employee-toolbar">

          <div className="employee-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="employee-add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >

            <FiPlus />

            Add Employee

          </button>

        </div>

        {/* ================= Table ================= */}

        <div className="employee-table-wrapper">

          <table className="employee-table">

            <thead>

              <tr>

                <th>Employee</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Role</th>

                <th>Status</th>

                <th style={{ width: "170px" }}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="employee-empty"
                  >
                    No employees found.
                  </td>

                </tr>

              ) : (

                filteredEmployees.map(
                  (employee) => (

                    <tr
                      key={employee._id}
                      onClick={() =>
                        handleViewEmployee(employee)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >

                      {/* Employee */}

                      <td>

                        <div className="employee-user">

                          <div className="employee-avatar">

                            {employee.name
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <span
                            className="employee-name-link"
                            onClick={(e) => {

                              e.stopPropagation();

                              handleViewEmployee(
                                employee
                              );

                            }}
                          >

                            {employee.name}

                          </span>

                        </div>

                      </td>

                      {/* Email */}

                      <td>
                        {employee.email}
                      </td>

                      {/* Phone */}

                      <td>
                        {employee.phone || "Not Added"}
                      </td>

                      {/* Role */}

                      <td>

                        <span
                          className={`role-badge ${
                            employee.role === "admin"
                              ? "admin"
                              : "employee"
                          }`}
                        >

                          {employee.role}

                        </span>

                      </td>

                      {/* Status */}

                      <td>

                        <span className="status-badge">

                          Active

                        </span>

                      </td>

                      {/* Actions */}

                      <td>

                        <div className="employee-actions">

                          <button
                            className="employee-edit-btn"
                            onClick={(e) => {

                              e.stopPropagation();

                              handleEditEmployee(
                                employee
                              );

                            }}
                          >

                            <FiEdit2 />

                            Edit

                          </button>

                          <button
                            className="employee-delete-btn"
                            onClick={(e) => {

                              e.stopPropagation();

                              handleDeleteEmployee(
                                employee
                              );

                            }}
                          >

                            <FiTrash2 />

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* ================= Employee Modal ================= */}

        <EmployeeModal

          show={showModal}

          editingEmployee={editingEmployee}

          formData={formData}

          handleChange={handleChange}

          handleSubmit={
            editingEmployee
              ? handleUpdateEmployee
              : handleAddEmployee
          }

          loading={loading}

          onClose={() => {

            setShowModal(false);

            setEditingEmployee(null);

            setFormData({
              name: "",
              email: "",
              phone: "",
              password: "",
              role: "employee",
            });

          }}

        />

        {/* ================= Delete Modal ================= */}

        <DeleteConfirmModal

          show={showDeleteModal}

          title="Delete Employee"

          message={`Are you sure you want to delete "${selectedEmployee?.name}"? This action cannot be undone.`}

          loading={deleteLoading}

          onCancel={() => {

            setShowDeleteModal(false);

            setSelectedEmployee(null);

          }}

          onConfirm={confirmDeleteEmployee}

        />

        {/* ================= Employee Drawer ================= */}

        <EmployeeDrawer
          show={showDrawer}
          employeeData={selectedEmployee}
          onClose={() => {

            setShowDrawer(false);

            setSelectedEmployee(null);

          }}
        />

      </div>

    </div>

  );

}

export default Employees;