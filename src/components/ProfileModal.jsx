import ProfileTabs from "./ProfileTabs";

// eslint-disable-next-line react/prop-types
const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-opacity-50"></div>

      <div className="relative bg-[#222222] w-[1000px] h-[650px] min-h-[600px] rounded-lg  border border-[#000000] p-6 flex flex-col">
        <ProfileTabs onClose={onClose} />
      </div>
    </div>
  );
};

export default ProfileModal;
