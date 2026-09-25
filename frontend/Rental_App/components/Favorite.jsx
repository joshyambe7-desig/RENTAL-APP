import { Link } from "react-router-dom"
const Favorite = ({favorite})=>{
    return (
        <tr>
            <td>
                {favorite.property}  
            </td>
            <td>
                <Link to={`/properties/${favorite.property}/`}> View </Link>
            </td>
        </tr>
    )
}
export default Favorite