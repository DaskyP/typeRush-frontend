import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SettingsBar = ({ isOpen }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isWordsActive, setIsWordsActive] = useState(false);
  const [isPunctuationActive, setIsPunctuationActive] = useState(false);
  const [isNumbersActive, setIsNumbersActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleModeSelect = (mode) => {
    if (mode === "punctuation") {
      if (!isPunctuationActive) {
        setIsPunctuationActive(true);
        setIsWordsActive(true);
        setSelectedMode("words");
      } else {
        setIsPunctuationActive(false);
      }
    } else if (mode === "numbers") {
      if (!isNumbersActive) {
        setIsNumbersActive(true);
        setIsWordsActive(true);
        setSelectedMode("words");
      } else {
        setIsNumbersActive(false);
      }
    } else {
      setSelectedMode(mode);
      setIsWordsActive(mode === "words");
      setIsPunctuationActive(false);
      setIsNumbersActive(false);
      setSelectedOption(null); 
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div
      className={`absolute top-[110px] left-1/2 transform -translate-x-1/2 rounded-xl shadow-lg border border-[#000000] p-2 text-white transition-all duration-300 ease-in-out
      ${isOpen ? "w-[1500px] opacity-100 scale-100" : "w-0 opacity-0 scale-90 overflow-hidden"}`}
      style={{ backgroundColor: "rgba(190, 191, 193, 0.3)" }}
    >
      <div className="flex justify-between items-center px-4 py-2 rounded-lg">
        <button
          className={`flex items-center space-x-2 text-lg ${
            isPunctuationActive ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleModeSelect("punctuation")}
        >
          <span>@ Punctuation</span>
        </button>
        <button
          className={`flex items-center space-x-2 text-lg ${
            isNumbersActive ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleModeSelect("numbers")}
        >
          <span># Numbers</span>
        </button>
        <button
          className={`flex items-center space-x-2 text-lg ${
            selectedMode === "time" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleModeSelect("time")}
        >
          <span>Time</span>
        </button>
        <button
          className={`flex items-center space-x-2 text-lg ${
            isWordsActive ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleModeSelect("words")}
        >
          <span>Words</span>
        </button>
        <button
          className={`flex items-center space-x-2 text-lg ${
            selectedMode === "quotes" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleModeSelect("quotes")}
        >
          <span>Quotes</span>
        </button>

        {selectedMode === "time" && (
          <div className="flex space-x-25 transition-opacity duration-300">
            <button
              className={`text-xl ${selectedOption === "10s" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("10s")}
            >
              10s
            </button>
            <button
              className={`text-xl ${selectedOption === "20s" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("20s")}
            >
              20s
            </button>
            <button
              className={`text-xl ${selectedOption === "30s" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("30s")}
            >
              30s
            </button>
          </div>
        )}
        {isWordsActive && (
          <div className="flex space-x-25 transition-opacity duration-300">
            <button
              className={`text-xl ${selectedOption === "20" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("20")}
            >
              20
            </button>
            <button
              className={`text-xl ${selectedOption === "50" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("50")}
            >
              50
            </button>
            <button
              className={`text-xl ${selectedOption === "70" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("70")}
            >
              70
            </button>
          </div>
        )}
        {selectedMode === "quotes" && (
          <div className="flex space-x-25 transition-opacity duration-300">
            <button
              className={`text-xl ${selectedOption === "5" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("5")}
            >
              5
            </button>
            <button
              className={`text-xl ${selectedOption === "10" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("10")}
            >
              10
            </button>
            <button
              className={`text-xl ${selectedOption === "15" ? "text-white" : "text-gray-400"}`}
              onClick={() => handleOptionSelect("15")}
            >
              15
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsBar;
