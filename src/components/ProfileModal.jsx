
// eslint-disable-next-line react/prop-types
const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-opacity-30 "></div>

      <div className="relative bg-[#222222] w-240 h-150 rounded-lg shadow-lg border border-[#000000] p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
            <img src="/close.svg" alt="close" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
