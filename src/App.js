import {BrowserRouter,Router,Route,Routes} from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import GoogleProfile from "./components/GoogleProfile";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import Images from "./components/Images";
import Albums from "./components/Albums";
import { useState } from "react";
import AddAlbum from "./feactures/AddAlbum";
import ShareAlbum from "./components/ShareAlbum";
import LayoutWithHeader from "./components/LayoutWithHeader";


function App() {
  const [userData,setUserInfo ] = useState(null)
  console.log(userData)
    return (
      <div className="app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/v2/profile/google" element={<GoogleProfile  userData={setUserInfo}/>}/>
      <Route element={<LayoutWithHeader/>}>
      <Route path="/images" element={<Images users={userData}/>}/>
      <Route path="/albums" element={<Albums users={userData}/>}/>
      <Route path="/create-album" element={<AddAlbum />}/>
      <Route path="/share-albums" element={<ShareAlbum users={userData}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
