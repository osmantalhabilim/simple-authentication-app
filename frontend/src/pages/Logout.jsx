import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logoutUser();
      navigate("/login");
    };

    doLogout();
  }, [logoutUser, navigate]);

  return <div>Çıkış yapılıyor...</div>;
};

export default Logout;
