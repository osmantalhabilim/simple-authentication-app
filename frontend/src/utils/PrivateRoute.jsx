import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      checkAuth();
      setChecked(true);
    };

    if (!authUser) {
      verifyAuth();
    } else {
      setChecked(true);
    }
  }, [authUser, checked, checkAuth]);

  if (!checked || isCheckingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-600 trxt-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
