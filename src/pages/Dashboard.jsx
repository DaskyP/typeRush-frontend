import { useEffect, useState, useRef } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particle from "../components/Particle";
import Navbar from "../components/Navbar";
import MusicPlayerModal from "../components/MusicPlayerModal";
import SettingsBar from "../components/SettingsBar";
import Keyboard from "../components/Keyboard";
const Dashboard = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const particlesInitialized = useRef(false);

  useEffect(() => {
    if (!particlesInitialized.current) {
      particlesInitialized.current = true;
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
    const handleKeyDown = (event) => {
      setPressedKey(event.key.toLowerCase());
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
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

      <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 z-9">
        <Keyboard pressedKey={pressedKey} />
      </div>
    </div>
  );
};

export default Dashboard;
