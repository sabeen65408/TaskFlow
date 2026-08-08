import API from "../api/axios";

// =====================================
// Get All Notifications
// =====================================

export const getNotifications = async () => {

    const response = await API.get(
        "/notifications"
    );

    return response.data;

};

// =====================================
// Mark One Notification as Read
// =====================================

export const markAsRead = async (id) => {

    const response = await API.put(
        `/notifications/${id}/read`
    );

    return response.data;

};

// =====================================
// Mark All Notifications as Read
// =====================================

export const markAllAsRead = async () => {

    const response = await API.put(
        "/notifications/read-all"
    );

    return response.data;

};

// =====================================
// Get Unread Count
// =====================================

export const getUnreadCount = async () => {

    const notifications =
        await getNotifications();

    return notifications.filter(
        notification => !notification.read
    ).length;

};