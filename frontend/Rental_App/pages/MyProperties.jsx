import { useEffect,useState } from "react"
import { getMyPoperties } from "../Services/Property.service"
import Property from "../components/Property"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../style/Property.css"

const MyProperties = ()=>{

    const [properties, setProperties] = useState([])

    useEffect(()=>{
        getMyPoperties()
        .then(data=>setProperties(data))
        .catch(error=>console.log("My properties error :", error.message))
    },[])

    const myProperties = properties.map(property=>{
                        return(<Property
                            key={property.id}
                            category={property.category} 
                            image={property.images} title={property.title} 
                            id={property.id}/>
                        )})
    return (
        <>
        <Header/>
        <main className="container">
        <div className="row gap-3">
            {myProperties}
        </div>
        </main>
        <Footer/>

        </>
    )
}
export default MyProperties