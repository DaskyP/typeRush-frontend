/* eslint-disable react/prop-types */
const OAuthButton = ({ provider, logo, onClick }) => {
    const colors = {
      github: "bg-[#242424] hover:bg-[#2d2d2d]",
      discord: "bg-[#242424] hover:bg-[#2d2d2d]", 
    };
  
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-36 h-12 border border-gray-500 rounded-lg transition ${colors[provider] || "bg-gray-600"}`}
      >
        <img src={logo} alt={`${provider} logo`} className="w-8 h-8" />
      </button>
    );
  };
  
  export default OAuthButton;
  