import Board from "./components/Board";
import React, { useState } from "react";
import axios from "axios";
import RainbowBg from "./assets/rainbowbg.jpg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [formType, setFormType] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleLogin = async () => {
    // Implement login API call and set token
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );
      console.log(response.data);
      setUser(response.data.user);
      setLoggedIn(true);
      setFormType(null);
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleRegister = async () => {
    // Implement register API call
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          username,
          password,
        }
      );
      console.log(response.data);
    } catch (error) {
      throw error.response.data;
    }
    setFormType(null);
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
    setToken(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "login") {
      handleLogin();
    } else if (formType === "register") {
      handleRegister();
    }
  };
  return (
    <div className="App">
      <img
        className="absolute h-full w-full -z-10"
        alt="bg"
        src={RainbowBg}
      ></img>

      <div className="home-page min-h-screen">
        <header
          className={`navbar ${
            loggedIn
              ? "flex justify-center p-3 text-3xl font-extrabold font-playfair bg-[#22222250]"
              : ""
          }`}
        >
          {loggedIn && <div className="title text-white ">Kanban Board</div>}
          {loggedIn && (
            <button className="logout-btn text-white" onClick={handleLogout}>
              Logout
            </button>
          )}
        </header>
        {!loggedIn ? (
          <div className="welcome-section flex flex-col items-center justify-center h-full">
            <h1 className="welcome-title text-4xl mb-8">
              Welcome to the Kanban
            </h1>
            <div className="auth-buttons space-x-4">
              <button
                className="login-btn bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setFormType("login")}
              >
                Login
              </button>
              <button
                className="register-btn bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setFormType("register")}
              >
                Register
              </button>
            </div>
            {formType && (
              <form onSubmit={handleSubmit} className="mt-8 w-1/3">
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  {formType === "login" ? "Login" : "Register"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <Board token={token} user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
