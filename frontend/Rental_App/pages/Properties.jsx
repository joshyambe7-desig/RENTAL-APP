import { useState, useEffect } from "react"
import Property from "../components/Property"
import Filters from "../components/Filters"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../style/Property.css"
import { getProperties } from "../Services/Property.service"

const Properties = ()=>{
    const [showFilterForm, setShowFilterForm] = useState(false)
    const [properties, setProperties] = useState([])

    useEffect(()=>{
            getProperties()
            .then(data=> setProperties(data))
            .catch(error => console.log("errors: "+ error.message))
        }, [])
        
        const handleSubmit = async (event)=>{
            event.preventDefault()
            const data = new FormData(event.target)
            const filterAttributes ={
                furnished: data.get("furnished") === "on",
                wifi:data.get("wifi") === "on",
                category: data.get("category"),
                min_price: data.get("min_price"),
                max_price: data.get("max_price"),
                min_rooms: data.get("min_rooms"),
                max_rooms : data.get('max_rooms'),
                min_bathrooms : data.get("min_bathroooms"),
                max_bathrooms: data.get('max_bathrooms')
            }
            try{
                setProperties(await getProperties(filterAttributes))
            }catch(error){
                console.log(error.message)
            }
        }
        

        const propertiesList = properties.map(item =><Property key={item.id} category={item.category} image={item.images} title={item.title} id={item.id}/>)

    return (
        <>
            <Header/>
            <div className="container">
            <main>
            <button onClick={()=>setShowFilterForm(prev=>!prev)} className="regular-btn">Filter</button>
            {showFilterForm && <Filters handleSubmit={handleSubmit}/>}
            <div className="row">
            <div className="container-property">
            {propertiesList}
            </div>
            </div>
            
            </main>
            </div>
            <Footer/>
        </>
    )
}
export default Properties