import React from 'react'
import './App.css';
import {Route, Routes, Link} from 'react-router-dom';
import About from "./pages/About";
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Layout from "./Layout";
import MyPage from "./pages/Mypage";
import Login from "./pages/Login";

const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/profile/:username' element={<Profile/>} />
                </Route>
                <Route path='/articles' element={<Articles/>} >
                    <Route path=':id' element={<Article/>} />
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path='/mypage' element={<MyPage/>} />

            </Routes>
        </div>
    );
};

export default App;
