import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import Particle from "../components/Particle";
import { loadSlim } from "@tsparticles/slim";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Particle />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="p-4 text-white">Dashboard Content</div>
      </div>
    </div>
  );
};

export default Dashboard;
