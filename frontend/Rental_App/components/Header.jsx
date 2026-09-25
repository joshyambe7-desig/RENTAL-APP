import { Link } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom";
import { logout } from "../Services/auth.service";
import '../style/Header.css'
import logo from '../src/assets/logo_rental_app.png'





const Header = ()=>{
    const {isAuthenticated, setIsAuthenticated, user } = useContext(userContext)
    const navigate = useNavigate()
    const handleLogout = ()=>{
            logout()
            setIsAuthenticated(false)
            navigate('/login/')
    }
    return(
        <header>
            <nav>
                <div style={{height:"75px", width:"100px"}}>
                    <img src={logo} alt="rental_app_logo"  className="img-fluid" />
                </div>
                <div>
                    <ul className="nav-link">
                        <li><Link className="link" to={`/properties/`}>Properties</Link></li>
                        {isAuthenticated && <li><Link className="link" to={`/favorites/`} >Favorites</Link></li>}
                        {!isAuthenticated && <li><Link to={`/register/`} className="link" >Register</Link></li>}
                        { isAuthenticated && <li><Link to={`/rental-requests/`} className="link">My Rental Request</Link></li>}
                        { isAuthenticated && (user?.role === "LANDLORD" && 
                        <>
                        <li><Link to={'/my-properties/'} className="link">My Properties</Link></li>
                        <li><Link to={'/create-property/'} className="link">Create Property</Link></li>
                        <li><Link to={'/upload/'} className="link">Upload an Image</Link></li></>)}
                        { isAuthenticated ? (<li><button className="btn-header" onClick={()=>{handleLogout()}}>Logout</button></li>)
                            : (<li><Link to={`/login/`} className="link"><button className="btn-header"> login</button></Link></li>)}
                    </ul>
                </div>
            </nav>
        </header>
    )

}
export default Header