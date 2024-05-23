import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
      <footer className="bg-gray-950 border-t border-gray-700 py-12 text-white">
        <div className="w-[96%] max-w-screen-lg mx-auto flex flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold text-white">
            Casino.100x
          </span>
          </Link>
          <div className="space-y-2 text-center">
            <h1 className="text-lg">Follow On</h1>
            <div className="flex items-center gap-3 justify-center">
              <a href="https://github.com/hkirat" target="_blank">
                <FaGithub size={30} className="text-white hover:text-gray-400" />
              </a>
              <a href="https://www.youtube.com/@harkirat1" target="_blank">
                <FaYoutube size={30} className="text-white hover:text-gray-400" />
              </a>
              <a href="https://twitter.com/kirat_tw" target="_blank">
                <FaTwitter size={30} className="text-white hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};
