import logo from './logo.svg';
import './App.css';
import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { Navbar , Main, Schedule, Edit } from './components';
import { BrowserRouter, Route ,Routes, useHistory } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/schedule" element={<Schedule/>} />
      <Route path="/edit" element={<Edit/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
