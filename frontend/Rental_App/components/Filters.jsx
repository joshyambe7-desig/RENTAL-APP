import { useEffect, useState } from "react"
import Property from "./Property"
import PropertyDetail from "./PropertyDetail"
const Filters = ({handleSubmit})=>{

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <input type="checkbox" name="wifi" /> <label>Wifi</label>
            </div>
            <div>
            <input type="checkbox" name="furnished" /> <label>Furnished</label>
            </div>
            <div>
                <select name="category" >
                    <option value="">Choose a category</option>
                    <option value="HOUSE">House</option>
                    <option value="APPARTEMENT">Appartement</option>
                    <option value="STUDIO">Studio</option>
                    <option value="DUPLEX">Duplex</option>
                </select>
            </div>
            <div>
                <label>
                    Min Price   
                    <input type="number" name="min_price" min={100}  />
                </label>
            </div>
            <div>
                <label>
                    Max Price  
                    <input type="number" name="max_price" min={200}  />
                </label>
            </div>
            <div>
                <label>
                    Min Barthrooms  
                    <input type="number" name="min_bathrooms" min={1}   />
                </label>
            </div>
            <div>
            <label>
                Max Barthrooms  
                <input type="number" min={2} name="max_bathrooms" max={5} />
            </label>
            </div>
            <div>
                <label>
                    Min Rooms  
                    <input type="number" name="min_rooms" min={1}  />
                </label>
            </div>
            <div>
                <label>
                    Max Rooms  
                    <input type="number"  name="max_rooms" min={2}  max={10}/>
                </label>
            </div>

            <button type="submit" className="regular-btn"> Apply</button>
            <button type="reset" className="regular-btn">Clear </button>

        </form>

    )
}
export default Filters