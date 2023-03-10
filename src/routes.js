import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Filme from "./Pages/Filme";
import Header from "./Components/Header";
import Favoritos from "./Pages/Favoritos";
import Error from "./Pages/Erro";

export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/filme/:id" element={ <Filme/> }/>
                <Route path="/favoritos" element={ <Favoritos/>}/>

                <Route path="*" element={ <Error/>}/>
            </Routes>
        </BrowserRouter>
    )
        
    
}