import { useState } from "react";
import ProfileContent from "./ProfileContent"; 
import SettingsContent from "./SettingsContent"; 

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div>
      {/* Navegación de Tabs */}
      <div className="flex border-b border-gray-600">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "perfil"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("perfil")}
        >
          Perfil
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "configuracion"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("configuracion")}
        >
          Configuración
        </button>
      </div>

      {/* Contenido del Tab */}
      <div className="p-4">
        {activeTab === "perfil" && <ProfileContent />}
        {activeTab === "configuracion" && <SettingsContent />}
      </div>
    </div>
  );
};

export default ProfileTabs;
