import '../style/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../src/assets/logo_rental_app.png"

const Footer = ()=>{
    return(
    <div className="footer">
        <div className='container'>
            <div className='row'>
                <div style={{height:"170PX", width:"300px"}} className='col-12'>
                        <img src={logo}alt="logo_rental_app" className='img-fluid'/>
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <h3>RENTAL APP</h3>
                    <ul>
                        <li>Find your next</li>
                        <li>place to live.</li>
                    </ul>
                </div>
                <div className='col-4'>
                    <h3>EXPLORE</h3>
                    <ul>
                        <li>Properties</li>
                        <li>Favorites</li>
                    </ul>
                </div>
                <div className='col-4'>
                    <h3>FOR USERS</h3>
                    <ul>
                        <li>For Tenants</li>
                        <li>For Landlords</li>
                    </ul>
                </div>
                <div className='col-4'>
                    <h3>CONTACT</h3>
                    <ul>
                        <li>Email</li>
                        <li>Phone</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div>
                <p>Links : <FontAwesomeIcon icon={faGithub}/>   <FontAwesomeIcon icon={faFacebook}/> <FontAwesomeIcon icon={faInstagram}/></p>
                © 2026 Rental App           privacy policy · Terms of Service
            </div>
            

        </div>
    </div>)
} 
export default Footer