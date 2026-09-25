import { makeRentalRequest } from "../Services/RentalRequest.service"
import { useParams } from "react-router-dom"
import RentalRequestForm from "../components/RentalRequestForm"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import "../style/RentalRequest.css"


const MakeRentalRequest = () => {
    const navigate = useNavigate()
    const { propertyId  } = useParams()

    console.log("le property_avant nuber",propertyId)


    const handleSubmit = async(event)=>{
        event.preventDefault()

        const data = new FormData(event.target)

        const message = data.get("message")

        
        
        try{
           await makeRentalRequest(Number(propertyId), message)
           navigate('/properties')
        }catch(error){
            console.log(error.response?.data)
        }
        

    }

    return (
        <>
        <Header/>
        <main className="container">
        <RentalRequestForm handleSubmit={handleSubmit}/>
        </main>
        <Footer/>

        </>
    )
}
export default MakeRentalRequest
