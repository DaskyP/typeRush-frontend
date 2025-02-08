import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext"; 

const ProfileConfiguration = () => {
  const { handleVolumeChange, volume } = useAudio();
  const [localVolume, setLocalVolume] = useState(volume);

  useEffect(() => {
    setLocalVolume(volume); 
  }, [volume]);

  const handleVolumeInputChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    handleVolumeChange(newVolume);
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-xl font-semibold mb-4">Configuración de Sonido</h2>

      <div className="rounded-lg shadow-md text-white w-80">
        <h3 className="text-lg font-semibold">Volumen General</h3>
        <div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localVolume}
            onChange={handleVolumeInputChange}
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileConfiguration;
