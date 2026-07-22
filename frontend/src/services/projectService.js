import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/projects`;

const getProjects = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

const createProject = async (projectData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API,
        projectData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

const deleteProject = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getDashboardStats = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/stats/dashboard`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};

export {
  getProjects,
  createProject,
  deleteProject,
  getDashboardStats,
};
