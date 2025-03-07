import { useState } from "react";

const SettingsBar = ({ isOpen, setSelectedMode, setWordCount, setIsPunctuationActive, setIsNumbersActive }) => {
  const [selectedMode, setMode] = useState("words");
  const [isWordsActive, setIsWordsActive] = useState(true);
  const [isPunctuationActive, setPunctuationActive] = useState(false);
  const [isNumbersActive, setNumbersActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(15);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setMode(mode);
    if (mode === "words") {
      setIsWordsActive(true);
    } else {
      setIsWordsActive(false);
    }
  };

  const handlePunctuationToggle = () => {
    setPunctuationActive(!isPunctuationActive);
    setIsPunctuationActive(!isPunctuationActive);
  };

  const handleNumbersToggle = () => {
    setNumbersActive(!isNumbersActive);
    setIsNumbersActive(!isNumbersActive);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setWordCount(parseInt(option));
  };

  return (
    <div
      className={`absolute top-[110px] left-1/2 transform -translate-x-1/2 rounded-xl shadow-lg border border-[#000000] p-2 text-white transition-all duration-300 ease-in-out
      ${isOpen ? "w-[1500px] opacity-100 scale-100" : "w-0 opacity-0 scale-90 overflow-hidden"}`}
      style={{ backgroundColor: "rgba(190, 191, 193, 0.3)" }}
    >
      <div className="flex justify-between items-center px-4 py-2 rounded-lg">
        <button className={`flex items-center space-x-2 text-lg ${isPunctuationActive ? "text-white" : "text-gray-400"}`} onClick={handlePunctuationToggle}>@ Punctuation</button>
        <button className={`flex items-center space-x-2 text-lg ${isNumbersActive ? "text-white" : "text-gray-400"}`} onClick={handleNumbersToggle}># Numbers</button>
        <button className={`flex items-center space-x-2 text-lg ${selectedMode === "time" ? "text-white" : "text-gray-400"}`} onClick={() => handleModeSelect("time")}>Time</button>
        <button className={`flex items-center space-x-2 text-lg ${isWordsActive ? "text-white" : "text-gray-400"}`} onClick={() => handleModeSelect("words")}>Words</button>
        <button className={`flex items-center space-x-2 text-lg ${selectedMode === "quotes" ? "text-white" : "text-gray-400"}`} onClick={() => handleModeSelect("quotes")}>Quotes</button>
        {isWordsActive && (
          <div className="flex space-x-4 transition-opacity duration-300">
            <button className={`text-xl ${selectedOption === 20 ? "text-white" : "text-gray-400"}`} onClick={() => handleOptionSelect(20)}>20</button>
            <button className={`text-xl ${selectedOption === 50 ? "text-white" : "text-gray-400"}`} onClick={() => handleOptionSelect(50)}>50</button>
            <button className={`text-xl ${selectedOption === 70 ? "text-white" : "text-gray-400"}`} onClick={() => handleOptionSelect(70)}>70</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsBar;