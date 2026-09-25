import { useEffect, useState } from "react"
import { getPropertiesDetail } from "../Services/Property.service"
import PropertyDetail from "../components/PropertyDetail"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProperty } from "../Services/Property.service"


const PropertyDetails = ()=>{
    
    const [propertyData, setPropertyData]=useState(null)

    const navigate = useNavigate()
    const {id} = useParams()
    const handleDelete = async ()=>{
        try{
            await deleteProperty(Number(id))
        }catch(error) {
            console.log(error.response?.data)
        }
        navigate(`/properties/`)

        
    }
    

    useEffect( ()=>{

    getPropertiesDetail(Number(id))
    .then(data=>setPropertyData(data))
    .catch(error=>console.log(error.message))

    },[id])

    if(!propertyData){
        return <p>Loading..</p>
    }

    return (
        <>
        <Header/>
        <main>
        <div className="container">
            <div className="row">
            <PropertyDetail property={propertyData} handleDelete={handleDelete} />
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )

    

}
export default PropertyDetails