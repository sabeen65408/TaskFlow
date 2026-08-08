import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notificationService";
import "../styles/notification.css";
import {
    FiBell,
    FiCheckCircle,
    FiMessageSquare,
    FiPaperclip,
    FiCheck,
    FiMove,
    FiClipboard,
} from "react-icons/fi";

function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

  loadNotifications();

  const interval = setInterval(() => {

    loadNotifications();

  }, 10000);

  return () => clearInterval(interval);

}, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

        if (

            notificationRef.current &&

            !notificationRef.current.contains(event.target)

        ) {

            setShow(false);

        }

    };

    document.addEventListener(

        "mousedown",

        handleClickOutside

    );

    return () =>

        document.removeEventListener(

            "mousedown",

            handleClickOutside

        );

}, []);

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      setNotifications(data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const unreadCount = notifications.filter(

    notification => !notification.read

  ).length;

  const handleRead = async (notification) => {

    try {

        if (!notification.read) {

            await markAsRead(notification._id);

            setNotifications(prev =>
                prev.map(item =>
                    item._id === notification._id
                        ? {
                              ...item,
                              read: true,
                          }
                        : item
                )
            );

        }

        setShow(false);

        if (notification.project?._id) {

            navigate(
    `/project/${notification.project._id}`,
    {
        state: {

            openTaskId:
                notification.task._id,

            notificationType:
                notification.type,

        },
    }
);

        }

    } catch (err) {

        console.log(err);

    }

};

  const handleReadAll = async () => {

    try {

        await markAllAsRead();

        setNotifications(prev =>

            prev.map(notification => ({

                ...notification,

                read: true,

            }))

        );

    }

    catch (err) {

        console.log(err);

    }

};

// 👇 PASTE THE HELPER HERE

const getNotificationIcon = (type) => {

    switch(type){

        case "comment":

            return <FiMessageSquare color="#3b82f6" />;

        case "attachment":

            return <FiPaperclip color="#f59e0b" />;

        case "completed":

            return <FiCheckCircle color="#10b981" />;

        case "task_moved":

            return <FiMove color="#8b5cf6" />;

        default:

            return <FiClipboard color="#2563eb" />;

    }

};

return (

    <div className="notification-wrapper"
    ref={notificationRef}>

      {/* Bell */}

      <button
        onClick={() => setShow(!show)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          position: "relative",
          color: "inherit",
        }}
      >

        <FiBell size={22} />

        {

          unreadCount > 0 && (

            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                minWidth: "20px",
                height: "20px",
                background: "#ef4444",
                color: "#fff",
                borderRadius: "999px",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >

              {unreadCount}

            </span>

          )

        }

      </button>

      {show && (

    <div className="notification-dropdown">

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >

              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                Notifications
              </h3>

              {

                unreadCount > 0 && (

                  <button
                    onClick={handleReadAll}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2563eb",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >

                    Mark all read

                  </button>

                )

              }

            </div>

            {

              notifications.length === 0 ? (

                <div
                  style={{
                    padding: "35px",
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >

                  No notifications

                </div>

              ) : (

                notifications.map(notification => (

                  <div
    key={notification._id}
    className="notification-item"
                    onClick={() => handleRead(notification)}
                    style={{
                      padding: "18px 20px",
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      background: notification.read
                        ? "#fff"
                        : "#eff6ff",
                      transition: ".2s",
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >

                      <div
    style={{
        display:"flex",
        gap:"12px",
        flex:1,
    }}
>

    <div
        style={{
            fontSize:"22px",
            marginTop:"3px",
        }}
    >
        {getNotificationIcon(notification.type)}
    </div>

    <div style={{flex:1}}>

                        <div
                          style={{
                            fontWeight: "600",
                            color: "#111827",
                            marginBottom: "6px",
                          }}
                        >

                          <strong>

    {notification.sender?.name}

</strong>

<br/>

{notification.message}

                        </div>

                        <small
                          style={{
                            color: "#64748b",
                          }}
                        >

                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}

                        </small>

                      </div>
                      </div>

                      {
                        

                        notification.read && (

                          <FiCheckCircle
                            color="#10b981"
                            size={18}
                          />

                        )

                      }

                    </div>

                  </div>

                ))

              )

            }

          </div>

        )

      }

    </div>

  );

}

export default NotificationBell;