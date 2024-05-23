import { useNavigate } from "react-router-dom";
import {useUser} from "../../store/hooks/useUser.ts";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useUser();
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

  const handleLogin = () => {
    navigate("/login")
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/logout`);
      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Logout failed:", response.data.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
      <div className="appbar relative top-0 left-0 right-0 z-10 flex justify-between items-center bg-[#1a2c38] text-white p-4 border-b-2 border-gray-700">
        <button onClick={() => navigate("/")}>
          <div className="text-2xl font-bold">Casino.100x</div>
        </button>
        <div className="flex gap-4">
          <button
              className="px-4 py-2 rounded-md bg-white hover:bg-gray-300 text-black font-bold"
              onClick={() => navigate("/")}
          >
            Games
          </button>
          {!user ? (
              <button
                  className="px-4 py-2 rounded-md bg-white hover:bg-gray-300 text-black font-bold"
                  onClick={handleLogin}
              >
                Login/Signup
              </button>
          ) : (
              <div className="flex gap-4">
                <button
                    className="btn-danger px-4 py-2 rounded-md bg-white hover:bg-gray-300 text-black font-bold"
                    onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
          )}
        </div>
      </div>
  );
};
