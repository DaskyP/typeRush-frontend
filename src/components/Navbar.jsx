import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center px-10 py-6 bg-transparent">
        <div className="flex items-center space-x-25">
          <button className="rounded-lg hover:bg-gray-800 transition">
            <img src="/settings.svg" alt="Configuración" className="w-10 h-10" />
          </button>
          <img src="/logobone.svg" alt="TypeRush" className="h-10" />
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition">
            <img src="/ranking.svg" alt="Ranking" className="w-10 h-10" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition">
            <img src="/alert.svg" alt="Alertas" className="w-10 h-10" />
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff"}
              alt="Usuario"
              className="w-10 h-10 rounded-full border border-gray-500 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
            <span className="text-white text-sm">{user?.username || "Invitado"}</span>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-800 transition">
            <img src="/Off.svg" alt="Cerrar sesión" className="w-10 h-10" />
          </button>
        </div>
      </nav>

      {/* Modal renderizada dentro del mismo flujo */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
