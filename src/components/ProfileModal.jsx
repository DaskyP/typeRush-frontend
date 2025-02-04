import ProfileTabs from "./ProfileTabs";

// eslint-disable-next-line react/prop-types
const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semitransparente */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Contenedor de la modal */}
      <div className="relative bg-[#222222] w-[500px] h-[400px] rounded-lg shadow-lg border border-[#000000] p-6">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Tabs dentro de la modal */}
        <ProfileTabs />
      </div>
    </div>
  );
};

export default ProfileModal;
