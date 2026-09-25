import { jwtDecode } from "jwt-decode"

/* we get the user id by jwtDecode */
const getUserId = ()=>{
    const token = localStorage.getItem("access_token")
    if (!token){
        return null
    }

    const decodedToken = jwtDecode(token)

    return decodedToken.user_id
    

}
export default getUserId