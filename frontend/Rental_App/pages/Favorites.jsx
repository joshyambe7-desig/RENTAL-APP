import Favorite from "../components/Favorite";
import { useState, useEffect } from "react";
import { getFavorites } from "../Services/Favorite.service";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Favorites = ()=>{
    const [favorites, setFavorites] = useState([])
    useEffect(()=>{
        getFavorites()
        .then(data => setFavorites(data))
        .catch(error => console.log('error ', error.message))
    }, [])
    console.log(favorites)

    const favoritesProperties = favorites.map(item=> <Favorite key={item.id}favorite={item}/>)
    return(
        <>
            <Header/>
            
            <main className="container">
            <div className="row">
                <h2>Your favorites</h2>
            
            <table className="table table-striped table-hover table-bordered bg-light">
                
                <thead>
                    <tr className="table-light">
                        <th scope="col">PropertyId</th>
                        <th scope="col">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {favoritesProperties}
                </tbody>
            </table>
            </div>
            </main>
            <Footer/>
        </>
    )


}
export default Favorites