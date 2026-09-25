import AuthApi from "../api/Authaxios"

export async function getFavorites() {
    const  response = await AuthApi.get('/favorites/')
    return response.data
}

export async function addToFavorites(id){
    const response = await AuthApi.post('/favorites/',{property: id})
    return response.data
}

export async function deleteFavorite(id){
    const response = await AuthApi.delete(`/favorites/${id}/`)
    return response.data
}