import { useState } from "react";
import ProfileForm from "./ProfileForm";
import ProfileConfiguration from "./ProfileConfiguration";

// eslint-disable-next-line react/prop-types
const ProfileTabs = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <>
      <div className="flex items-center border-b-2 border-gray-300 text-white pb-2">
        <div className="flex space-x-16 text-xl">
          <button
            className={`pb-2 transition duration-200 ${
              activeTab === "perfil" ? "font-semibold " : "text-gray-400"
            }`}
            onClick={() => setActiveTab("perfil")}
          >
            Perfil
          </button>
          <button
            className={`pb-2 transition duration-200 ${
              activeTab === "config" ? "font-semibold " : "text-gray-400"
            }`}
            onClick={() => setActiveTab("config")}
          >
            Configuración
          </button>
        </div>

        <button onClick={onClose} className="ml-auto mb-2">
          <img src="/close.svg" alt="Cerrar" className="w-10 h-10" />
        </button>
      </div>

      <div className="mt-6 h-full">
        {activeTab === "perfil" && <ProfileForm onClose={onClose} />}
        {activeTab === "config" && <ProfileConfiguration />}
      </div>
    </>
  );
};

export default ProfileTabs;
