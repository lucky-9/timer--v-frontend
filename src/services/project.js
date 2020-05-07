import { API } from './../backend';
import { isAuthenticated } from './auth';



export const submitProject = (project) =>{
    const result = isAuthenticated();
    const token=result.token;
    const id=result._id;
    console.log("final project ", project);
    return fetch(`${API}/create/project/${id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(project)
    }).then(res => res.json())
    .catch(err=>console.log(err))
}


export const getProjectName = (id) =>{
    return fetch(`${API}/project/${id}`)
}