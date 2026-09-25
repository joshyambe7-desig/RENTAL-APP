import { getCredentials } from "../Services/auth.service"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useContext } from "react"
import { userContext } from "../Context/UserContext"
import "../style/Login.css"
const Login = ()=>{
    const navigate = useNavigate()
    const {isAuthenticated, setIsAuthenticated} = useContext(userContext)

    const handleSubmit = async (event)=>{
        event.preventDefault()
        const authentcationData = new FormData(event.target)

        const username = authentcationData.get("username")
        const password = authentcationData.get("password")

        await getCredentials(username, password)
        setIsAuthenticated(true)
        console.log("Authentification",isAuthenticated)
        navigate('/properties')

    }

    return(
        <>
        <Header/>
        <main className="container login-page">
            <form onSubmit={handleSubmit} className="form-container" >
                    <h2>Welcome Back</h2>

                <div>
                    <label >
                    Username  <div><input  type="text" name="username"/></div>
                    </label>
                </div>
                <div>
                    <label>
                        Password  <div><input  type="password" name="password" /></div>
                    </label>
                </div>
                <button className="regular-btn -login" type="submit">Login</button>
            </form>
        </main>
        <Footer/>
        </>


    )
}
export default Login