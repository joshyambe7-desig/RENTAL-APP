const CreatePropertyForm = ({handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a new Property</h2>
            <label>
                Title : 
            </label>
            <input type="text" name="title"/>
            <br />
            <label >
                Description:             
            </label><br />
            <textarea name="description"  cols={50} rows={4}></textarea>
            <br />
            <label >Price:</label>
            <input type="number" min={100} step={0.01} name="price"/>
        
            <br />
            <label >Adress:</label>
            <input type="text" name="address" />
            <br />
            <label >Rooms:</label>
            <input type="number" min={0} name="rooms" />
            <br />
            <label >bathrooms:</label>
            <input type="number" min={1} name="bathrooms" />
            <br />
            <label >Surface:</label>
            <input type="number" min={0} step={0.01} name="surface"/>
            <br />
                <input type="checkbox" name="has_wifi" />  <label>wifi</label>
            <br />

                <input type="checkbox" name="is_furnished" /> <label>furnished</label>
            <br />
            <label>
                Location:
            </label>
            <input type="url" name="google_maps_link" placeholder="https://googlelocation.com" />

            <br />
            <label >
                Category:
                <select name="category">
                    <option value="APPARTEMENT">Appartement</option>
                    <option value="DUPLEX">DUPLEX</option>
                    <option value="HOUSE">House</option>
                    <option value="STUDIO">Studio</option>
                </select>
                
            </label>
            <br />
            <button type="submit" className="regular-btn">Créer</button>           
        </form>
    )
}
export default CreatePropertyForm