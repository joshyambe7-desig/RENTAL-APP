
import  { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Properties from '../pages/Properties'
import Favorites from '../pages/Favorites'
import Register from '../pages/Register'
import MakeRentalRequest from '../pages/MakeRentalRequest'
import PropertyDetails from '../pages/PropertyDetails'
import RentalRequests from '../pages/RentalRequests'
import MyProperties from '../pages/MyProperties'
import CreateProperty from '../pages/CreateProperty'
import UploadAnImage from '../pages/UploadAnImage'
import Update from '../pages/Update'
import Error401 from '../pages/Error401'
import Error403 from '../pages/Error403'
import Error404 from '../pages/Error404'
import Error500 from '../pages/Error500'

function App() {

return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/" element={<Login/>}/>
        <Route path="/properties" element = {<Properties/>}/>
        <Route path='/properties/:id/' element = {<PropertyDetails/>}/>
        <Route path='/my-properties/' element = {<MyProperties/>}/>
        <Route path='/create-property/' element = {<CreateProperty/>}/>
        <Route path='/update-property/:id/' element= {<Update/>}/>
        <Route path='/upload/' element={<UploadAnImage/>}/>
        <Route path='/rental-requests/' element = {<RentalRequests/>}/>
        <Route path='/rental-requests/:propertyId/' element={<MakeRentalRequest/>}/>
        <Route path='/favorites/' element = {<Favorites/>}/>
        <Route path='/register/' element ={<Register/>} />
        <Route path='/401/' element={<Error401/>}/>
        <Route path='/403/' element={<Error403/>}/>
        <Route path='/*' element={<Error404/>}/>
        <Route path='/500' element={<Error500/>}/>
      </Routes>
    </BrowserRouter>

    
  )
}

export default App
