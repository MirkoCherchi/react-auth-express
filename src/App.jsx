import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import PrivateRoute from "./components/middlewares/PrivateRoute";
import Posts from "./components/Posts/Posts";
import Login from "./components/Pages/Login";
import CreatePost from "./components/Posts/CreatePost";
import SinglePost from "./components/Posts/SinglePost";
import Home from "./components/Pages/Home";
import PrivateNavLinks from "./PrivateNavLinks";
import Admin from "./components/Pages/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <ul className="navLinks">
            <li>
              <Link to="/">Home</Link>
            </li>
            <PrivateNavLinks />
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route path="/post/:slug" element={<SinglePost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
