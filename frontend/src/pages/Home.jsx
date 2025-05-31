import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center min-h-dvh">
      <span className="text-white text-6xl">Hoşgeldin, {authUser?.name}</span>
      <Link
        to="/logout"
        className="text-black px-4 py-1 bg-white hover:bg-gray-400 transition-all duration-300 border rounded cursor-pointer"
      >
        Çıkış Yap
      </Link>
    </div>
  );
};

export default Home;
