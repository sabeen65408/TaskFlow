import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/profile`;

const token = () => localStorage.getItem("token");

export const getProfile = async () => {

    const res = await axios.get(API, {

        headers: {
            Authorization: `Bearer ${token()}`
        }

    });

    return res.data;

};

export const updateProfile = async (data) => {

    const res = await axios.put(

        API,

        data,

        {

            headers: {

                Authorization: `Bearer ${token()}`

            }

        }

    );

    return res.data;

};