import AuthApi from "../api/Authaxios"
import publicApi from "../api/Publicaxios"

export async function getProperties(filters={}){

        const params = new URLSearchParams()

        Object.entries(filters).forEach(([key,value])=>{
            if(value !== null && value !== "" && value !== undefined){
                params.append(key, value)

            }
        })

        const response = await publicApi.get(`/properties/?${params.toString()}`)
        return response.data
    }

export async function getPropertiesDetail(id){
    const response = await AuthApi.get(`/properties/${id}/`)
    return response.data
}

export async function getMyPoperties() {
    const response = await AuthApi.get('/my-properties/')
    return response.data
    
}

export async function deleteProperty(id){
    const response = await AuthApi.delete(`/properties/${id}/`)
    return response.data
}

export async function createMyProperty(formData) {
    const response = await AuthApi.post('/properties/', formData)
    return response.data
    
}

export async function uploadImage(formData) {
    const response = await AuthApi.post('/properties-image/', formData)
    return response.data
}

export async function UpdateProperty(id,formData) {

    const response = await AuthApi.patch(`properties/${id}/`, formData)
    return response.data
    
}