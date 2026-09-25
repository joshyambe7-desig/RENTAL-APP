import { uploadImage } from "../Services/Property.service"
import Header from "../components/Header"
import Footer from "../components/Footer"
import UploadImageForm from "../components/UploadImageForm"

const UploadAnImage = ()=>{
    const handleSubmit =async (event)=>{
        event.preventDefault()
        const form = new FormData(event.target)
        try{
            await uploadImage(form)
        }catch(error){
            console.log(error.response?.data)
        }

    }
        

    return (
        <>
        <Header/>
        <main className="container">
        <UploadImageForm handleSubmit={handleSubmit}/>
        </main>
        <Footer/>
        </>
    )

}
export default UploadAnImage
