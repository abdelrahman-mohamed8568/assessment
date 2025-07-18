import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import loginLogo from "../assets/loginLogo.png";
import loginText from "../assets/loginText.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const emtyInput = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const disableButton =
    !email || !password || !emtyInput(email) || status === "loading";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emtyInput(email)) {
      return setError("Enter a valid email address");
    }
    if (!password) {
      return setError("Password required");
    }
    setError("");
    try {
      const token = await dispatch(login({ email, password })).unwrap();
      if (token) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError("Email or password is incorrect");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="loginBackground">
          <span className="colorA"></span>
          <span className="colorB"></span>
          <span className="colorC"></span>
          <span className="colorD"></span>
        </div>
        <div className="loginContainer">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="loginHeader">
              <h1>Welcome back</h1>
              <p>
                Step into our shopping metaverse for an unforgettable shopping
                experience
              </p>
            </div>
            <div className="loginInput">
              <div className="inputContainer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H17C20.65 2.75 22.75 4.85 22.75 8.5V15.5C22.75 19.15 20.65 21.25 17 21.25ZM7 4.25C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V8.5C21.25 5.64 19.86 4.25 17 4.25H7Z"
                    fill="#1A1A1E"
                  />
                  <path
                    d="M11.9998 12.87C11.1598 12.87 10.3098 12.61 9.65978 12.08L6.52978 9.57997C6.20978 9.31997 6.14978 8.84997 6.40978 8.52997C6.66978 8.20997 7.13978 8.14997 7.45978 8.40997L10.5898 10.91C11.3498 11.52 12.6398 11.52 13.3998 10.91L16.5298 8.40997C16.8498 8.14997 17.3298 8.19997 17.5798 8.52997C17.8398 8.84997 17.7898 9.32997 17.4598 9.57997L14.3298 12.08C13.6898 12.61 12.8398 12.87 11.9998 12.87Z"
                    fill="#1A1A1E"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputContainer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10.75C17.59 10.75 17.25 10.41 17.25 10V8C17.25 4.85 16.36 2.75 12 2.75C7.64 2.75 6.75 4.85 6.75 8V10C6.75 10.41 6.41 10.75 6 10.75C5.59 10.75 5.25 10.41 5.25 10V8C5.25 5.1 5.95 1.25 12 1.25C18.05 1.25 18.75 5.1 18.75 8V10C18.75 10.41 18.41 10.75 18 10.75Z"
                    fill="#1A1A1E"
                  />
                  <path
                    d="M12 19.25C10.21 19.25 8.75 17.79 8.75 16C8.75 14.21 10.21 12.75 12 12.75C13.79 12.75 15.25 14.21 15.25 16C15.25 17.79 13.79 19.25 12 19.25ZM12 14.25C11.04 14.25 10.25 15.04 10.25 16C10.25 16.96 11.04 17.75 12 17.75C12.96 17.75 13.75 16.96 13.75 16C13.75 15.04 12.96 14.25 12 14.25Z"
                    fill="#1A1A1E"
                  />
                  <path
                    d="M17 22.75H7C2.59 22.75 1.25 21.41 1.25 17V15C1.25 10.59 2.59 9.25 7 9.25H17C21.41 9.25 22.75 10.59 22.75 15V17C22.75 21.41 21.41 22.75 17 22.75ZM7 10.75C3.42 10.75 2.75 11.43 2.75 15V17C2.75 20.57 3.42 21.25 7 21.25H17C20.58 21.25 21.25 20.57 21.25 17V15C21.25 11.43 20.58 10.75 17 10.75H7Z"
                    fill="#1A1A1E"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="loginButton">
              <button type="submit" disabled={disableButton}>
                {status === "loading" ? "Logging in…" : "Login"}
              </button>
              {error && <p className="error">{error}</p>}
            </div>
            <p className="loginFooter">Don't have an account? Sign up</p>
          </form>
          <div className="loginLogo">
            <div className="loginLogoImg">
              <img src={loginLogo} alt="Login Logo" />
            </div>
            <div className="loginTextImg">
              <img src={loginText} alt="Login Text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
