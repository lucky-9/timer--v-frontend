import { API } from '../backend';

export const signup = user =>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(res => res.json())
    .catch(err=>console.log(err))
}

export const signin = (user) =>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            "Access-Control-Allow-Origin":"*"
        },
        body:JSON.stringify(user)
    }).then(res => res.json())
    .catch(err=>console.log(err))
    }



export const singout = next =>{
    if(typeof window !== undefined){
        localStorage.removeItem("jwt");
        return fetch('S{API}/signout',{method:"GET"})
        .then(
        localStorage.removeItem("jwt"))
        .catch(err =>console.log(err))
    }
}


export const authenticate =(data, next) =>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () =>{
    if(typeof window== "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}