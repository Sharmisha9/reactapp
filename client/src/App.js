import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3002/auth/auth", null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthState(true);
        } else {
          setAuthState(false);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setAuthState(false);
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="header-bar">
            <Link to="/CreatePost">Create A Post</Link>
            <Link to="/">Home page</Link>
            {authState === false ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : authState === true ? (
              <>
                <Link to="/profile">Profile</Link>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("accessToken");
                    setAuthState(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/Post/:id" element={<Post />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;





