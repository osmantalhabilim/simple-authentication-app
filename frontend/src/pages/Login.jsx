import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { loginUser, isLoggingIn, authUser, checkAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(formData);
    if (user) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <div className="w-full flex justify-center items-center min-h-dvh">
      <div className="w-full md:max-w-md rounded-lg z-10 border border-gray-500 flex justify-center items-center flex-col p-6 shadow-2xl">
        <h2 className="text-white text-2xl mb-1">Giriş Yap</h2>
        <p className="text-white/75 text-xs mb-3">
          Şifrenizi kimseyle paylaşmayınız
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <br />
            <input
              name="email"
              id="email"
              type="text"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded border text-white border-white/60 px-2 py-1"
              placeholder="user@example.com"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <br />
            <div className="relative w-full">
              <input
                name="password"
                id="password"
                type={`${show ? "text" : "password"}`}
                value={formData?.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded border text-white border-white/60 px-2 py-1"
                placeholder="******"
                autoComplete="off"
              />
              {show ? (
                <EyeOff
                  onClick={() => setShow(false)}
                  className="size-5 text-white/90 absolute z-20 right-2 top-2 transition-all"
                />
              ) : (
                <Eye
                  onClick={() => setShow(true)}
                  className="size-5 text-white/90 absolute z-20 right-2 top-2 transition-all"
                />
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isLoggingIn}
              type="submit"
              className={`w-full px-4 py-1 text-white rounded ${
                isLoggingIn ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
              }  transition-all duration-300 cursor-pointer`}
            >
              {isLoggingIn ? "Yükleniyor" : "Giriş Yap"}
            </button>
          </div>
        </form>
        <span className="text-white/85 mt-15 w-full text-center">
          Hala üye değil misin ?{" "}
          <Link to="/register" className="underline font-bold text-green-400">
            Üye Ol!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
