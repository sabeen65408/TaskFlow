import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

const getToken = () => localStorage.getItem("token");

/* =========================
   Get All Users
========================= */

export const getUsers = async () => {

    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.data;

};

/* =========================
   Get Employees Only
========================= */

export const getEmployees = async () => {

    const res = await axios.get(
        `${API}/employees`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return res.data;

};

/* =========================
   Create Employee
========================= */

export const createEmployee = async (data) => {

    const res = await axios.post(

        `${API}/employees`,

        data,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return res.data;

};

/* ==========================
   Update Employee
========================== */

export const updateEmployee = async (id, data) => {

    const res = await axios.put(

        `${API}/employees/${id}`,

        data,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return res.data;

};

/* ==========================
   Delete Employee
========================== */

export const deleteEmployee = async (id) => {

    const res = await axios.delete(

        `${API}/employees/${id}`,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return res.data;

};

/* =========================
   Get Employee Details
========================= */

export const getEmployeeDetails = async (id) => {

    const res = await axios.get(

        `${API}/employees/${id}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return res.data;

};