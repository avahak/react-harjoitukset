import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import Home from './components/Home';
import Todo from './components/Todo';
import ResizeTest from './components/ResizeTest';
import Anecdotes from './components/Anecdotes';
import Login from './components/Login'
// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <TopMenu/>
            <div id="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/anecdotes" element={<Anecdotes/>}/>
                    <Route path="/resize" element={<ResizeTest/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/todo" element={<Todo/>}/>
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>);
};

export default App;