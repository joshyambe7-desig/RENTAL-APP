import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { userContext } from "../Context/UserContext"
import { addToFavorites } from "../Services/Favorite.service"
import { deleteFavorite } from "../Services/Favorite.service"
import '../style/PropertyDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



const PropertyDetail = ({property, handleDelete})=>{
    
    const {user} = useContext(userContext)
    const [favoriteId, setFavoriteId] = useState(null)
    const[currentPosition, setCurrentPosition]=useState(0)

    const handleFavorite = async() => {

        if(favoriteId===null){
            try{
                const response = await addToFavorites(property.id)
                setFavoriteId(response.id)
            }catch(error){
                console.log(error.response?.data)
                }
        } 
        else{
            try{
                await deleteFavorite(favoriteId)
                setFavoriteId(null)
            }catch(error){
            console.log(error.response?.data)
            }
        }
    }

    useEffect(()=>{
        if(property){
            setFavoriteId(property.favorite_id)
        }
        
    },[property])

    const isFavorite = favoriteId !== null
    return (
        <div className="card-detail-property">
            <div className="col-5" >
                <div className="image-property-detail">
                    <img src={property.images[currentPosition]?.image} alt={property.title} />   
                </div>
                
                <div className="d-flex justify-content-center mt-3 gap-2">
                    <button 
                    disabled={currentPosition===0}
                    onClick={()=>{setCurrentPosition(prev=>prev-1)}}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button 
                    disabled={currentPosition === property.images.length-1}
                    onClick={()=>{setCurrentPosition(prev=>prev+1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            
            </div>
            <div className="col-7 property_info">
                <div>
                    <span className="property-info-label" >Id : </span>
                    <span className="property-info-field"> {property.id}</span>
                </div>
                <div>
                    <span className="property-info-label" >Title : </span>
                    <span className="property-info-field"> {property.title}</span>
                </div>
                <div>
                    <span className="property-info-label" >Description : </span>
                    <span className="property-info-field"> {property.description}</span>
                </div>
                <div>
                    <span className="property-info-label" >Price : </span>
                    <span className="property-info-field"> {property.price}</span>
                </div>
                <div>
                    <span className="property-info-label" >Address : </span>
                    <span className="property-info-field"> {property.address}</span>
                </div>
                <div>
                    <span className="property-info-label" >rooms : </span>
                    <span className="property-info-field"> {property.rooms}</span>
                </div>
                <div>
                    <span className="property-info-label" >Barthrooms : </span>
                    <span className="property-info-field"> {property.barthrooms}</span>
                </div>
                <div>
                    <span className="property-info-label" >Surface : </span>
                    <span className="property-info-field"> {property.surface}</span>
                </div>
                <div>
                    <span className="property-info-label" >Wifi : </span>
                    <span className="property-info-field"> {property.has_wifi ? "Yes" : "No"}</span>
                </div>
                <div>
                    <span className="property-info-label" >Furnished : </span>
                    <span className="property-info-field"> {property.is_furnished ? "Yes" : "No"}</span>
                </div>
                <div>
                    <span className="property-info-label" >Location link : </span>
                    <span className="property-info-field"> {property.google_maps_link ?  property.google_maps_link : "No google map link"}</span>
                </div>
                <div>
                    <span className="property-info-label" >Category : </span>
                    <span className="property-info-field"> {property.category}</span>
                </div>
                { user?.role === "TENANT" && <div className="tenant-action">
                                                <Link to={`/rental-requests/${property.id}/`} className="link regular-btn"> Make a request </Link>
                                                <button onClick={handleFavorite}>
                                                    { isFavorite ? <FontAwesomeIcon icon={faThumbsDown} /> : <FontAwesomeIcon icon={faThumbsUp} />}
                                                </button>

                                            </div>}
                {user?.role === "LANDLORD" && user?.id === property.landlord &&
                                            <div className="d-flex justify-content-center gap-3">
                                           <button className="regular-btn"><Link to={`/update-property/${property.id}/`} className="link" >Update</Link> </button>
                                            <button  onClick={handleDelete} className="regular-btn danger-btn">Delete</button>
                                            </div>
                                            }
                
                

            </div>

        </div>)





}
export default PropertyDetail