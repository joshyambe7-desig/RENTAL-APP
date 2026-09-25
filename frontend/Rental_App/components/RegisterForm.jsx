
const RegisterForm = ({handleSubmit})=>{
    return (
        <form onSubmit={handleSubmit} className="form-container">

            <h2>Sign in</h2>
            <div>
            <label >
                Username
            </label><br />
            <input type="text" name="username" /><br />
            <label>
                Password
            </label><br />
            <input type="password"  name="password"/><br />
            <label>Role  </label><br />
                <select name="role">
                    <option value="TENANT">Tenant</option>
                    <option value="LANDLORD">Landlord</option>
                </select><br />
            
            </div>

            <button type="submit" className="regular-btn">Sign in</button>
        </form>
    )
}
export default RegisterForm