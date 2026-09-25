const RentalRequestForm = ({handleSubmit})=>{
    return (
        <form onSubmit={handleSubmit} >
            <div className="form-rental-request">
                <h3>Send an offert to the landord</h3>
                <textarea name="message" rows={10} cols={50}></textarea>
                <button type="submit" className="regular-btn">Send</button>

            </div>
            
        </form>
    )
}

export default RentalRequestForm