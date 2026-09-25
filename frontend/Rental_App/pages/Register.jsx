import { register } from "../Services/auth.service"
import RegisterForm from "../components/RegisterForm"
import { getCredentials } from "../Services/auth.service"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Register = () => {
    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
    
        const username = data.get("username")
        const password = data.get("password")
        const role = data.get('role')

        try{
            await register(username, password, role)
            await getCredentials(username, password)
            navigate('/properties')
        }catch(error){
            console.log("Register/Authentication error:", error.message)
        }

    }
    return(
        <>
        <Header/>
        <main className="container">
            <div className="d-flex justify-content-center">
            <RegisterForm handleSubmit={handleSubmit}/>
            </div>
        </main>
        <Footer/>
        </>
    )
}
export default Register