import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}admin/check`, {
          withCredentials: true, // send cookie
        });

        setIsAuth(res.data.authenticated);
      } catch (err) {
        setIsAuth(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuth === null) return <div>Checking authentication...</div>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
