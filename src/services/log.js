import { API } from './../backend';
import { isAuthenticated } from './auth';



export const submitLog = (log) =>{
    const result = isAuthenticated();
    const token=result.token;
    const id=result._id;
    console.log("final log ", log);
    return fetch(`${API}/create/log/${id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(log)
    }).then(res => res.json())
    .catch(err=>console.log(err))
}

