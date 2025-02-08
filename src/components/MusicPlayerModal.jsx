import { useState } from "react";
import { useAudio } from "../context/AudioContext"; 

const MusicPlayerModal = () => {
  const { isPlaying, handlePlayPause, handleNextSong, handlePrevSong } = useAudio();
  const [isFixed, setIsFixed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {!isFixed && (
        <div
          className="fixed bottom-0 left-0 w-80 h-30"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      <div
        className={`fixed bottom-4 left-4 bg-[#222222] border border-[#000000] p-4 rounded-lg shadow-lg text-white w-84 transition-all duration-300 ease-in-out
        ${isFixed || isHovered ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <img src="/music.svg" alt="Música" className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Música</h3>
          </div>
          <button
            onClick={() => setIsFixed(!isFixed)}
            className="text-gray-400 hover:text-white"
          >
            <img src={`/${isFixed ? "down" : "up"}.svg`} alt="Toggle" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between">
          <button onClick={handlePrevSong} className="px-3 py-1 rounded">
            <img src="/prev.svg" alt="Anterior" className="w-6 h-6 hover:opacity-80" />
          </button>
          <button onClick={handlePlayPause} className="px-3 py-1 rounded">
            <img src={`/${isPlaying ? "pause" : "play"}.svg`} alt="Play/Pause" className="w-6 h-6 hover:opacity-80" />
          </button>
          <button onClick={handleNextSong} className="px-3 py-1 rounded">
            <img src="/next.svg" alt="Siguiente" className="w-6 h-6 hover:opacity-80" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayerModal;
