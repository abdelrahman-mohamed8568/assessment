import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearUser } from "../features/userSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, status, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth); // جلب الـ token من auth state

  useEffect(() => {
    // شيك لو الـ token موجود
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login", { replace: true });
    } else {
      console.log("Token found, fetching user:", token);
      dispatch(fetchUser());
    }
  }, [dispatch, token, navigate]);

  // التعامل مع خطأ 401
  useEffect(() => {
    if (error && error.includes("401")) {
      console.log("401 error detected, redirecting to login");
      dispatch(logout());
      dispatch(clearUser());
      localStorage.removeItem("token"); // امسح الـ token لو فيه خطأ 401
      navigate("/login", { replace: true });
    }
  }, [error, dispatch, navigate]);

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };

  if (status === "loading") {
    return (
      <div className="mainContainer">
        <div className="loginBackground">
          <span className="colorA" />
          <span className="colorB" />
          <span className="colorC" />
          <span className="colorD" />
        </div>
        <div className="loginContainer">
          <p>Loading user info…</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mainContainer">
        <div className="loginBackground">
          <span className="colorA" />
          <span className="colorB" />
          <span className="colorC" />
          <span className="colorD" />
        </div>
        <div className="loginContainer">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mainContainer">
      <div className="loginBackground">
        <span className="colorA" />
        <span className="colorB" />
        <span className="colorC" />
        <span className="colorD" />
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
  );
}
