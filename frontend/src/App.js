import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import EnrolledCourses from './pages/EnrolledCourses';
import GPTRecommendations from './pages/GPTRecommendations';
import GptSuggest from './pages/GptSuggest';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-courses" element={<EnrolledCourses />} />
        <Route path="/recommendations" element={<GPTRecommendations />} />
        <Route path="/suggest" element={<GptSuggest />} />
      </Routes>
    </Router>
  );
}

export default App;
