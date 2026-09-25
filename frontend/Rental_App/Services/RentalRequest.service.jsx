import AuthApi from "../api/Authaxios";

export async function makeRentalRequest(propertyId, message) {

    const response = await AuthApi.post('/rental-requests/', {
        property_id: propertyId,
        message: message,
    })

}

export async function getRentalRequests(id) {

    const response = await AuthApi.get(`/rental-requests/`)

    return response.data
    
}

export async function  acceptRentalRequest(id) {
    try{
    const response = await AuthApi.post(`/rental-requests/${id}/accept/`)
    return response.data
    }catch(error){
        console.log("Accept Rental Renquest Error ", error.message)
    }

    
    
}

export async function  rejectRentalRequest(id) {
    try{
    const response = await AuthApi.post(`/rental-requests/${id}/reject/`)
    return response.data
    }catch(error){
        console.log("Reject Rental Request Error", error.message)
    }

    
    
}


