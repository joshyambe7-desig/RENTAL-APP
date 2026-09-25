const UpdatePropertyForm = ({handleSubmit, property})=>{
    return(
        <form onSubmit={handleSubmit}  >
            <h2>Update your Property</h2>
            <label>Title :</label> 
            <input type="text" name="title" defaultValue={property.title}/><br />
            <label >Description:</label>
            <br />
                <textarea name="description" defaultValue={property.description} rows={4} cols={50} ></textarea> 
            <br />
            <label >Price:</label>
            <input type="number" min={100} step={0.01} name="price" defaultValue={property.price}/>

            <br />
            <label >Address:            </label>
                <input type="text" name="address" defaultValue={property.address} />
            <br />
            <label >Rooms:            </label>
                <input type="number" min={0} name="rooms" defaultValue={property.rooms}/>
            <br />
            <label >bathrooms:            </label>
            <input type="number" min={1} name="bathrooms" defaultValue={property.bathrooms} />
            <br />
            <label >Surface:           </label>
            <input type="number" min={0} step={0.01} name="surface" defaultValue={property.surface}/>
            <br />
            
                <input type="checkbox" name="has_wifi" defaultChecked={property.has_wifi}/> <label>wifi</label>
            <br />
                <input type="checkbox" name="is_furnished" defaultChecked={property.is_furnished} /> <label >furnished</label> 
            
            <br />
            <label> Location:</label>
            <input type="url" name="google_maps_link" placeholder="https://googlelocation.com" defaultValue={property.google_maps_link || ""} />
            <br />
            <label >
                Category:
                <select name="category"  defaultValue={property.category}>
                    <option value="APPARTEMENT">Appartement</option>
                    <option value="DUPLEX">DUPLEX</option>
                    <option value="HOUSE">House</option>
                    <option value="STUDIO">Studio</option>
                </select>
                
            </label>
            <br />
            <button type="submit" className="regular-btn">update</button>           
        </form>
    )
}
export default UpdatePropertyForm