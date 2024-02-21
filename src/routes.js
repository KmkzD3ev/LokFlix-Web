import {BrowserRouter,Routes,Route, defer} from 'react-router-dom'

import Error from './Pages/Error';
import Home from './Pages/Home'
import Filme from './Pages/Filme'
import Header from './Components/Header';
import Favoritos from './Pages/Favoritos';




function RoutesApp(){
   return(
   <BrowserRouter>
   <Header/>
   <Routes>
   <Route path='/' element ={<Home/>}/>
   <Route path='/filme/:id' element = {<Filme/>}/>
   <Route path='/Favoritos' element = {<Favoritos/>}/>
   



    <Route path='*' element={ <Error/> }/>
   </Routes>

   
   </BrowserRouter>



   );


}

export default RoutesApp





