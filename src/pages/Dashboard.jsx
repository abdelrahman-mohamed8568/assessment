import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearUser } from "../features/userSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/", { replace: true });
  };

  if (status === "loading") {
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
            <p>Loading user info…</p>
          </div>
        </div>
      </>
    );
  }
  if (status === "failed") {
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
            <p>Error: {error}</p>
          </div>
        </div>
      </>
    );
  }

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
          <div className="loginHeader">
            <h1>Welcome, {name}!</h1>
            <p>Your user ID is: {id}</p>
            <div className="loginButton">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
