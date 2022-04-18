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
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Restaurant from "./pages/Restaurant/Restaurant"
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from './pages/Feed';
import CreateRestaurant from "./pages/CreateRestaurant";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="search" element={<Search />} />
            <Route path="feed" element={<Feed />} />
            <Route path="restaurant/:id/" element={<Restaurant />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="create-restaurant" element={
              <ProtectedRoute>
                <CreateRestaurant />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
