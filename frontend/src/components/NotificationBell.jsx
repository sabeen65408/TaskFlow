import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { getNotifications } from "../services/notificationService";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setShow(!show)}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <FiBell size={24} />

        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: 12,
            }}
          >
            {notifications.length}
          </span>
        )}
      </div>

      {show && (
        <div
          style={{
            position: "absolute",
            top: 35,
            right: 0,
            width: 300,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 5px 15px rgba(0,0,0,.2)",
            padding: 10,
            zIndex: 999,
          }}
        >
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                style={{
                  padding: 10,
                  borderBottom: "1px solid #eee",
                }}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;