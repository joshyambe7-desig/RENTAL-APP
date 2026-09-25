import AuthApi from "../api/Authaxios"
import publicApi from "../api/Publicaxios"
import getUserId from "../utils/UserId"

export async  function getCredentials(username, password){

    const response = await publicApi.post('/auth/token/',{
        username,
        password
    })
    const {access, refresh} = response.data

    localStorage.setItem("access_token",access)
    localStorage.setItem("refresh_token", refresh)
    }

export async function  register (username, password, role){
    const response = await publicApi.post('/register/',{
        username,
        password,
        role
        })

}

export function logout(){

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

}

export async function getUserInfo(){
    const id = getUserId()
    if(!id){
        return null
    }
    const response = await AuthApi.get(`/users/${id}/`)
    return response.data

    
}