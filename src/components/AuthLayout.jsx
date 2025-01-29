// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children, backgroundImage, fullImage = false, imageStyle = "object-cover" }) => {
  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      <div className="absolute top-8 left-1/10 z-2">
        <img src="/logo.svg" alt="TypeRush Logo" className="w-48" />
      </div>

      <div className="flex w-1/2 items-center justify-center">
        <div className="bg-[#191919] rounded-xl z-2 shadow-lg w-full max-w-md p-10 ">
          {children}
        </div>
      </div>

      <div className={`absolute right-0 top-0 h-full z-1 ${fullImage ? "w-full" : "w-2/3"}`}>
        <img
          src={backgroundImage}
          alt="Background"
          className={`h-full w-full ${imageStyle}`}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
