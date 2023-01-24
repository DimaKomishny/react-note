import React, {useContext} from 'react';
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Login/Login";
import AuthContext from "./context/AuthProvider";

function App() {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={auth.accessToken != null  ? <Home/> : <Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
