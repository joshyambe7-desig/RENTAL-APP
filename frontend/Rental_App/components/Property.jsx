import { Link } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Property = ({category, image, title, id})=>{
    const[currentPosition, setCurrentPosition]=useState(0)

    return(
        <div className="col-4 property-card" style={{width:"18rem"}}>
            <div className="image-container">
                <img src={image[currentPosition]?.image} alt={title} />   
            </div>   
            <div className="card-body">
                <div className="d-flex justify-content-center mt-3 gap-2">
                <button 
                disabled={currentPosition===0}
                onClick={()=>{setCurrentPosition(prev=>prev-1)}}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button 
                disabled={currentPosition === image.length-1}
                onClick={()=>{setCurrentPosition(prev=>prev+1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
                <p className="card-title">Category: <span>{category}</span></p>
                <Link to={`/properties/${id}/`} className="regular-btn link">Show more</Link>
            </div>
        </div>

    )
}

export default Property