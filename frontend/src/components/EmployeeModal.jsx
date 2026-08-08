import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiUserCheck,
  FiSave,
  FiPlus,
} from "react-icons/fi";

function EmployeeModal({
  show,
  editingEmployee,
  formData,
  handleChange,
  handleSubmit,
  loading,
  onClose,
}) {

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