import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/comments`;

const token = () => localStorage.getItem("token");

export const getComments = async (taskId) => {

    const res = await axios.get(`${API}/${taskId}`, {

        headers: {
            Authorization: `Bearer ${token()}`
        }

    });

    return res.data;
};

export const addComment = async (commentData) => {

    const res = await axios.post(API, commentData, {

        headers: {
            Authorization: `Bearer ${token()}`
        }

    });

    return res.data;
};