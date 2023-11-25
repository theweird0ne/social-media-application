import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../../features/user/userSlice";
import "./Auth.css";

export const Login = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUserAsync({ username, password }));
    navigate(location?.state?.from?.pathname || "/");
  };

  return (
    <div className="form__container">
      <h1>Login Page</h1>
      <Link to="/signup">Signup</Link>
      <form action="" className="form__body">
        <div className="form__item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form__item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form__item">
          <button onClick={handleLogin}>Signup</button>
        </div>
      </form>
    </div>
  );
};
