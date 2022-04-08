import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
