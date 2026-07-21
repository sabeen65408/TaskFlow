import axios from "axios";

const API="http://localhost:5000/api/team";

const token=()=>localStorage.getItem("token");

export const getMembers=async(projectId)=>{

const res=await axios.get(

`${API}/${projectId}`,

{

headers:{

Authorization:`Bearer ${token()}`

}

}

);

return res.data;

};

export const addMember=async(projectId,email)=>{

const res=await axios.post(

`${API}/${projectId}`,

{email},

{

headers:{

Authorization:`Bearer ${token()}`

}

}

);

return res.data;

};

export const removeMember=async(id)=>{

await axios.delete(

`${API}/${id}`,

{

headers:{

Authorization:`Bearer ${token()}`

}

}

);

};