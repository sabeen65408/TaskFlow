import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/departments`;

const getToken = () => localStorage.getItem("token");

/* =========================
   Get All Departments
========================= */

export const getDepartments = async () => {
    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

/* =========================
   Create Department
========================= */

export const createDepartment = async (data) => {
    const res = await axios.post(API, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

/* =========================
   Get Department
========================= */

export const getDepartment = async (id) => {
    const res = await axios.get(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

/* =========================
   Update Department
========================= */

export const updateDepartment = async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

/* =========================
   Delete Department
========================= */

export const deleteDepartment = async (id) => {
    const res = await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

/* =========================
   Get Department Employees
========================= */

export const getDepartmentEmployees = async (id) => {
    const res = await axios.get(`${API}/${id}/employees`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};
