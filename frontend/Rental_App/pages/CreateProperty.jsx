import { useEffect } from "react";
import CreatePropertyForm from "../components/CreatePropertyForm";
import { useNavigate } from "react-router-dom";
import { createMyProperty } from "../Services/Property.service";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreateProperty = ()=> {
    const navigate = useNavigate()

    const handleSubmit = async(event)=>{
        event.preventDefault()
        const form = new FormData(event.target)
        const formData = Object.fromEntries(form.entries())
        formData.has_wifi = form.has("has_wifi")
        formData.is_furnished = form.has("is_furnished")
        try{
            await createMyProperty(formData)
        }catch(error){
            console.log(error.response?.data)
        }
        navigate('/properties')
    }

    return (
        <>
        <Header/>
        <main className="container">
        <CreatePropertyForm handleSubmit={handleSubmit}/>
        </main>
        <Footer/>
        </>
    )



}
export default CreateProperty