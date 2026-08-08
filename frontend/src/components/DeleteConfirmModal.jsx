import {
  FiTrash2,
  FiX,
} from "react-icons/fi";

function DeleteConfirmModal({
  show,
  title,
  message,
  onCancel,
  onConfirm,
  loading,
}) {

  if (!show) return null;

  return (

    <div className="modal-overlay">

      <div
        className="modal-content delete-modal"
      >

        <button
          className="popup-close-btn"
          onClick={onCancel}
        >
          <FiX />
        </button>

        <div className="delete-icon">

          <FiTrash2 />

        </div>

        <h2>

          {title}

        </h2>

        <p>

          {message}

        </p>

        <div className="modal-actions">

          <button
            className="modal-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="modal-delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >

            <FiTrash2 />

            {

              loading
                ? "Deleting..."
                : "Delete Employee"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirmModal;