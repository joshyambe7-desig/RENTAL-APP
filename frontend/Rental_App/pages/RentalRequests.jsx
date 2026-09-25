import { useContext, useEffect, useState } from "react"
import { getRentalRequests } from "../Services/RentalRequest.service"
import { acceptRentalRequest } from "../Services/RentalRequest.service"
import { rejectRentalRequest } from "../Services/RentalRequest.service"
import { userContext } from "../Context/UserContext"
import Header from "../components/Header"
import Footer from "../components/Footer"


const RentalRequests = ()=>{

    const [rentalRequest, SetRentalRequest] = useState([])
    const [refresh, setRefresh]= useState(0)
    const {user} = useContext(userContext)

    useEffect(()=>{
        getRentalRequests()
        .then(data=>SetRentalRequest(data))
        .catch(error=>console.log("Rental Request Eror", error.message))
    },[refresh])


    const handleAccept = async (id)=>{
        await acceptRentalRequest(id)
        setRefresh(prev=>prev+1)
    }

    const handleReject = async (id)=>{
        await rejectRentalRequest(id)
        setRefresh(prev=>prev+1)
    }
    

    const rentalRequests = rentalRequest.map(item=>{
                                            return(
                                            
                                            <tr key={item.id} >
                                                <th scope={"row"}>{item.property.id}</th>
                                                <td>{item.message}</td>
                                                <td className={ item.status ==="ACCEPTED"?"table-success": (item.status==="REJECTED"?"table-danger":"table-primary")}>{item.status }</td>

                                                {item.status === "PENDING" &&  user?.role==="LANDLORD" &&
                                                <td>
                                                    {
                                                    <>
                                                    <button className="regular-btn" onClick={()=>{handleAccept(item.id)
                                                    }}>Accept</button>
                                                    <button className="regular-btn danger-btn"onClick={()=>{handleReject(item.id)
                                                    }}>Reject</button>
                                                    </>
                                                    }
                                                </td>
                                                }
                                            </tr>
                                            )})
    return (
        <>
            <Header/>
                <main className="container">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr className="table-light">
                            <th scope="col">PropertyId</th>
                            <th scope="col">Message</th>
                            <th scope="col">Staus</th>
                            {user?.role ==="LANDLORD" && <th scope="col">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                    {rentalRequests}
                    </tbody>
                </table>
                </main>
            <Footer/>
        </>

    )

}
export  default RentalRequests