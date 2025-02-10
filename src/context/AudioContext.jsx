/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const [queue, setQueue] = useState([
    {
      title: "Aura",
      artist: "Desconocido",
      src: "/sounds/music/Aura.mp3",
      cover: "/cover/aurakid.jpg",
    },
    {
      title: "Hell N Back",
      artist: "Desconocido",
      src: "/sounds/music/Bakar.mp3",
      cover: "/cover/hellnback.jpg",
    },
    {
      title: "Instant Crush",
      artist: "Daft Punk ft. Julian Casablancas",
      src: "/sounds/music/Daft Punk - Instant Crush (Video) ft. Julian Casablancas.mp3",
      cover: "/cover/instantcrush.jpg",
    },
    {
      title: "El Paisano",
      artist: "Desconocido",
      src: "/sounds/music/El Paisano.mp3",
      cover: "/cover/elpaisano.jpg",
    },
    {
      title: "Feel Good Inc",
      artist: "Gorillaz",
      src: "/sounds/music/Gorillaz - Feel Good Inc HD.mp3",
      cover: "/cover/feelgoodinc.jpg",
    },
    {
      title: "Love Lockdown",
      artist: "Kanye West",
      src: "/sounds/music/Kanye West - Love Lockdown.mp3",
      cover: "/cover/Love_lockdown.jpeg",
    },
    {
      title: "Nothing Burns Like The Cold",
      artist: "Snoh Aalegra",
      src: "/sounds/music/Nothing Burns Like The Cold.mp3",
      cover: "/cover/nothingburns.jpg",
    },
    {
      title: "So Fresh, So Clean",
      artist: "OutKast",
      src: "/sounds/music/So Fresh, So Clean Outkast.mp3",
      cover: "/cover/sofresh.jpg",
    },
    {
      title: "Superstar",
      artist: "Matthew Santos",
      src: "/sounds/music/Superstar (feat. Matthew Santos).mp3",
      cover: "/cover/superstar.jpg",
    },
    {
      title: "Whistle",
      artist: "Flo Rida",
      src: "/sounds/music/Whistle.mp3",
      cover: "/cover/whistle.jpg",
    },
    {
      title: "Mañana",
      artist: "Tainy, Young Miko, The Marias",
      src: "/sounds/music/mañana · Tainy · Young Miko · The Marias.mp3",
      cover: "/cover/mañanatainy.jpg",
    },
  ]);

  const soundRef = useRef(null);
  const prevSongSrcRef = useRef(null);
  useEffect(() => {
    if (!queue.length) return; 

    const currentSrc = queue[0].src;

    if (currentSrc !== prevSongSrcRef.current) {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [currentSrc],
        volume: volume,
        loop: false,
        onend: handleNextSong, 
      });

      if (isPlaying) {
        soundRef.current.play();
      }

      prevSongSrcRef.current = currentSrc;
    } else {
      if (soundRef.current) {
        if (isPlaying && !soundRef.current.playing()) {
          soundRef.current.play();
        } else if (!isPlaying && soundRef.current.playing()) {
          soundRef.current.pause();
        }

        soundRef.current.volume(volume);
      }
    }
  }, [queue, isPlaying, volume]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextSong = () => {
    if (queue.length > 1) {
      const updatedQueue = [...queue];
      const current = updatedQueue.shift();
      updatedQueue.push(current);
      setQueue(updatedQueue);
    }
  };

  const handlePrevSong = () => {
    if (queue.length > 1) {
      const updatedQueue = [...queue];
      const lastSong = updatedQueue.pop();
      updatedQueue.unshift(lastSong);
      setQueue(updatedQueue);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        handlePlayPause,
        handleNextSong,
        handlePrevSong,
        handleVolumeChange,
        volume,
        queue,
        setQueue,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
