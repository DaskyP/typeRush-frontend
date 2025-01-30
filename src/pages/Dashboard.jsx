import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-black">
      <Navbar />
      <div className="p-4 text-white">Dashboard Content</div>
    </div>
  );
};

export default Dashboard;
