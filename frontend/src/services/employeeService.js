import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/employee`;

// ==============================
// Get Logged-in Employee Tasks
// ==============================

export const getMyTasks = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};

// ==============================
// Update Employee Task Column
// ==============================

export const updateMyTask = async (
    taskId,
    taskData
) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API}/tasks/${taskId}`,

        taskData,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

};

export const getMyActivities = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API}/activities`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

export const getMyCalendarTasks = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/calendar`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};