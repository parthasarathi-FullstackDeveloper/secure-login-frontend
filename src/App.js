import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationFetcher from './LocationFetcher';
import ReactTables from "./components/ReactTables";
import Login from "./components/Login";
import Register from "./Register";

function App() {
  return (
  
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<LocationFetcher />} />
            <Route path="/react-tables" element={<ReactTables />} />
            <Route  path="/register" element={<Register/>}/>
          </Routes>
        </Router>
  );
}

export default App;
