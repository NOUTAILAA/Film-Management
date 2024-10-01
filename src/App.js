// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import AddFilm from './components/admin/Films/AddFilm';
import AddGenre from './components/admin/Genres/ListGenre';
import FilmList from './components/admin/Films/FilmList';
import FilmDetail from './components/admin/Films/FilmDetails';
import CommentList from './components/admin/Comments/CommentList';
import EditFilm from './components/admin/Films/EditFilm';
import UserList from './components/admin/Visiteurs/UserList';
import AddUser from './components/admin/Visiteurs/AddUser';
import EditUser from './components/admin/Visiteurs/EditUser';

import ListFilm from './components/visiteur/ListFilm';
import DetailFilm from './components/visiteur/DetailFilm'; 
const App = () => {
    return (
        <Router>
            <div>
               
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                    <Route path="/films" element={<FilmList />} />
                    <Route path="/films/:id" element={<FilmDetail />} />
                    <Route path="/comments" element={<CommentList />} />
                    <Route path="/films/edit/:id" element={<EditFilm />} />
                    <Route path="/add-film" element={<AddFilm />} />
                    <Route path="/add-genre" element={<AddGenre />} />
                    <Route path="/users" element={<UserList />}  />
                    <Route path="/add-user" element={<AddUser/>} />
                    <Route path="/edit-user/:userId" element={<EditUser />} />





                    <Route path="/visitfilms" element={<ListFilm />}  />
                    <Route path="/visitfilms/:id" element={<DetailFilm />} />

                 </Routes>
            </div>
        </Router>
    );
};

export default App;
