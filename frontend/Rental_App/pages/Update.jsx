import { useNavigate, useParams } from "react-router-dom"
import { UpdateProperty } from "../Services/Property.service"
import { getPropertiesDetail } from "../Services/Property.service"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import UpdatePropertyForm from "../components/UpdatePropertyForm"

const Update = ()=>{
    const [propertyData, setPropertyData] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const formData = new FormData(event.target)
        try{
            await UpdateProperty(Number(id), formData)
        }catch(error){
            console.log(error.response?.data)
        }
        navigate(`/properties/${id}/`)

    }

    useEffect(()=>{
        getPropertiesDetail(Number(id))
        .then(data=>setPropertyData(data))
        .catch(error=> console.log(error.response?.data))
        console.log(propertyData)
        

    },[])

    if(!propertyData){
        return <p>Loading...</p>
    }

    return(
        <>
        <Header/>
        <main className="container">
        
        <div className="d-flex justify-content-center">
                
        <UpdatePropertyForm handleSubmit={handleSubmit} property={propertyData}/>
        </div>
        </main>
        <Footer/>
        </>

    )
}
export default Update