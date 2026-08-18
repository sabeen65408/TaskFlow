import { useState } from "react";

import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiUserCheck,
  FiSave,
  FiPlus,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

function EmployeeModal({
  show,
  editingEmployee,
  formData,
  handleChange,
  handleSubmit,
  loading,
  onClose,
  departments = [],
  onCreateDepartment,
}) {

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [addingDepartment, setAddingDepartment] = useState(false);

  const handleAddDepartment = async () => {
    const name = newDepartmentName.trim();

    if (!name || !onCreateDepartment) return;

    setAddingDepartment(true);

    try {
      const department = await onCreateDepartment(name);

      if (department?._id) {
        handleChange({ target: { name: "department", value: department._id } });
        setNewDepartmentName("");
      }
    } finally {
      setAddingDepartment(false);
    }
  };

  if (!show) return null;

  return (

    <div className="modal-overlay">

      <div className="employee-modal">

        {/* Header */}

        <div className="employee-modal-header">

          <div>

            <h2>

              {editingEmployee
                ? "Edit Employee"
                : "Add Employee"}

            </h2>

            <p>

              {editingEmployee
                ? "Update employee information."
                : "Create a new employee account."}

            </p>

          </div>

          <button
            className="popup-close-btn"
            onClick={onClose}
          >

            <FiX />

          </button>

        </div>

        {/* Name */}

        <div className="employee-input-group">

          <label>Full Name</label>

          <div className="employee-input-box">

            <FiUser />

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Email */}

        <div className="employee-input-group">

          <label>Email Address</label>

          <div className="employee-input-box">

            <FiMail />

            <input
              type="email"
              name="email"
              placeholder="john@email.com"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Phone Number */}

        <div className="employee-input-group">

          <label>Phone Number</label>

          <div className="employee-input-box">

            <FiPhone />

            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Password */}

        {!editingEmployee && (

          <div className="employee-input-group">

            <label>Temporary Password</label>

            <div className="employee-input-box">

              <FiLock />

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

          </div>

        )}

        {/* Designation */}

        <div className="employee-input-group">

          <label>Designation</label>

          <div className="employee-input-box">

            <FiBriefcase />

            <input
              type="text"
              name="designation"
              placeholder="e.g., Senior Developer"
              value={formData.designation || ""}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Department */}

        <div className="employee-input-group">

          <div className="department-label-row">
            <label>Department</label>
            <span>Add one if it is not listed</span>
          </div>

          <div className="employee-input-box">

            <FiBriefcase />

            <select
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
            >

              <option value="">Select Department</option>

              {departments.map((dept) => (

                <option key={dept._id} value={dept._id}>

                  {dept.name}

                </option>

              ))}

            </select>

          </div>

          <div className="add-department-row">
            <input
              type="text"
              aria-label="New department name"
              placeholder="New department name"
              value={newDepartmentName}
              onChange={(event) => setNewDepartmentName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddDepartment();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddDepartment}
              disabled={!newDepartmentName.trim() || addingDepartment}
            >
              {addingDepartment ? "Adding..." : "Add"}
            </button>
          </div>

        </div>

        {/* Joining Date */}

        <div className="employee-input-group">

          <label>Joining Date</label>

          <div className="employee-input-box">

            <FiCalendar />

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate ? formData.joiningDate.split('T')[0] : ""}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Status */}

        <div className="employee-input-group">

          <label>Status</label>

          <div className="employee-input-box">

            <FiUserCheck />

            <select
              name="status"
              value={formData.status || "Active"}
              onChange={handleChange}
            >

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>

              <option value="On Leave">On Leave</option>

              <option value="Suspended">Suspended</option>

            </select>

          </div>

        </div>

        {/* Role */}

        <div className="employee-input-group">

          <label>Role</label>

          <div className="employee-input-box">

            <FiUserCheck />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="employee">
                Employee
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

        </div>

        {/* Footer */}

        <div className="modal-actions">

          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >

            Cancel

          </button>

          <button
            type="button"
            className="modal-save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >

            {editingEmployee
              ? <FiSave />
              : <FiPlus />
            }

            {loading

              ? editingEmployee
                ? "Updating..."
                : "Creating..."

              : editingEmployee
                ? "Save Changes"
                : "Create Employee"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default EmployeeModal;
