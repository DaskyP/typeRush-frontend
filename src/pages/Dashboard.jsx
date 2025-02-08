import { useEffect, useState, useRef } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particle from "../components/Particle";
import Navbar from "../components/Navbar";
import MusicPlayerModal from "../components/MusicPlayerModal"; 
import SettingsBar from "../components/SettingsBar"; 

const Dashboard = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
  const particlesInitialized = useRef(false); 

  useEffect(() => {
    if (!particlesInitialized.current) {
      particlesInitialized.current = true; 
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
  }, []); 

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Particle />
      </div>

      <div className="relative z-10">
        <Navbar toggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} />
        <SettingsBar isOpen={isSettingsOpen} />
      </div>

      <MusicPlayerModal />
    </div>
  );
};

export default Dashboard;
