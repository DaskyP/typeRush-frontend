import { useEffect, useState } from "react";
import { fetchWords } from "../api";

// eslint-disable-next-line react/prop-types
const WordDisplay = ({ selectedMode, wordCount, punctuation, numbers }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const loadWords = async () => {
      const data = await fetchWords(selectedMode, wordCount, punctuation, numbers);
      if (data) {
        setWords(data.map((wordObj) => wordObj.word));
      }
    };
    loadWords();
  }, [selectedMode, wordCount, punctuation, numbers]); 

  return (
    <div className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-4xl font-bold text-center w-3/4">
      {words.length > 0 ? (
        <p className="leading-relaxed">{words.join(" ")}</p>
      ) : (
        <p className="text-gray-400">Cargando palabras...</p>
      )}
    </div>
  );
};

export default WordDisplay;
