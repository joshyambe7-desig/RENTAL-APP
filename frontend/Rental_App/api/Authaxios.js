import axios from "axios"

const AuthApi = axios.create({baseURL:import.meta.env.VITE_API_URL})
AuthApi.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem("access_token")

    if(token){
        config.headers.set(
        "Authorization",
        `Bearer ${token}`
        )
    }
    return config
    },
    (error)=>{
        return Promise.reject(error)
    }

)

    AuthApi.interceptors.response.use(
    (response)=>{ return  response},
    
    (error)=>{
        const status = error.response?.status

        if(status === 401){
            
            window.location.href='/401/'
        }
        if(status === 403){
            window.location.href='/403/'

        }
        if(status === 404){
            window.location.href='/*'

        }
        if(status == 500){
            window.location.href='/500/'

        }
        return Promise.reject(error)
    }

)

export default AuthApi
