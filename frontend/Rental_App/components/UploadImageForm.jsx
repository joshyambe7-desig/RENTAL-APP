

const UploadImageForm = ({handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="d-flex flex-column gap-2" >
            <h2>Uplad an image for your property</h2>
            <label>
                Upload image: 
            </label>
            <input type="file" name="image" accept="image/png,image,jpeg" />
            <label>
                Your property id
            </label>
            <input type="number" min={1}  name="property"/>
            <button type="submit" className="regular-btn">Send</button>
        </form>
    )
}
export default UploadImageForm