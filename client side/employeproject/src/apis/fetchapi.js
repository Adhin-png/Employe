import commonapi from "./CommonApis"

import axios from 'axios';

export const userRegister=(data)=>{
    
    return commonapi("POST",data,"http://127.0.0.1:8000/register/","")
}
export const userLogin=(data)=>{
    
    return commonapi("POST",data,"http://127.0.0.1:8000/token","")
}



export const listEmploye=(header)=>{
    
    return commonapi("GET","","http://127.0.0.1:8000/employe/",header)
}

export const employeDetail=(id)=>{
    
    return commonapi("GET","",`http://127.0.0.1:8000/employe/${id}/`)
}


export const addEmploye=(data,header)=>{
    return commonapi("POST",data,"http://127.0.0.1:8000/employe/",header)
}
export const employeDelete=(id)=>{
    
    return commonapi("DELETE","",`http://127.0.0.1:8000/employe/${id}/`)
}
export const employeUpdate=(id,data)=>{
    return commonapi("PUT",data,`http://127.0.0.1:8000/employe/${id}/`)
}





const API_URL = "http://127.0.0.1:8000/";

export const getUserProfile = async () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${API_URL}profile/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const changePassword = async (data) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${API_URL}change-password/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};


