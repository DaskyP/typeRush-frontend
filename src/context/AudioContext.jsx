import { createContext, useContext, useEffect, useState, useRef } from "react";
import { Howl } from "howler";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

// eslint-disable-next-line react/prop-types
export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState(Math.floor(Math.random() * 10)); 
  const soundRef = useRef(null);

  const songs = [
    "/sounds/music/Aura.mp3",
    "/sounds/music/Bakar.mp3",
    "/sounds/music/Daft Punk - Instant Crush (Video) ft. Julian Casablancas.mp3",
    "/sounds/music/El Paisano.mp3",
    "/sounds/music/Gorillaz - Feel Good Inc HD.mp3",
    "/sounds/music/Kanye West - Love Lockdown.mp3",
    "/sounds/music/Nothing Burns Like The Cold.mp3",
    "/sounds/music/So Fresh, So Clean Outkast.mp3",
    "/sounds/music/Superstar (feat. Matthew Santos).mp3",
    "/sounds/music/Whistle.mp3",
  ];

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [songs[currentSong]],
        volume: volume,
        loop: true,
        onend: () => handleNextSong(),
      });

      if (isPlaying) {
        soundRef.current.play();
      }
    }
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]); 

  const handlePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const nextSong = Math.floor(Math.random() * songs.length);
    setCurrentSong(nextSong);

    soundRef.current = new Howl({
      src: [songs[nextSong]],
      volume: volume,
      loop: true,
      onend: () => handleNextSong(),
    });

    if (isPlaying) {
      soundRef.current.play();
    }
  };

  const handlePrevSong = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const prevSong = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prevSong);

    soundRef.current = new Howl({
      src: [songs[prevSong]],
      volume: volume,
      loop: true,
      onend: () => handleNextSong(),
    });

    if (isPlaying) {
      soundRef.current.play();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, handlePlayPause, handleNextSong, handlePrevSong, handleVolumeChange, volume }}>
      {children}
    </AudioContext.Provider>
  );
};
