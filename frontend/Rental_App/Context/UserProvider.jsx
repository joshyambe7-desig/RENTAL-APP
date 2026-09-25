import { useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { getUserInfo } from "../Services/auth.service";

export function UserProvider({children}){

    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("access_token")))
    const [user, setUser] = useState(null)
    const loadUser = async ()=>{
        try{
            const response = await getUserInfo()
            setUser(response)
        }catch(error){
            console.log("unable to get user information ", error.message)
        }
    }
    useEffect(()=>{
        if(isAuthenticated){
            loadUser()
        }}, [isAuthenticated])

    return (
            <userContext.Provider value={{isAuthenticated, setIsAuthenticated, user}}>
                {children}
            </userContext.Provider>
        )

}
