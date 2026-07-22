import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

const getToken = () => localStorage.getItem("token");

export const getUsers = async () => {
    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.data;
};