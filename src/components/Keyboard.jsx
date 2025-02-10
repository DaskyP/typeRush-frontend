// eslint-disable-next-line react/prop-types
const Keyboard = ({ pressedKey }) => {
    const rows = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
      ["SPACE"]
    ];
  
    return (
      <div className="flex flex-col items-center space-y-2 mt-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            {row.map((keyItem) => {
              const isSpace = keyItem === "SPACE";
              const isPressed = pressedKey === keyItem.toLowerCase();
              return (
                <div
                  key={keyItem}
                  className={`h-14 flex items-center justify-center rounded-lg border-4
                    border-[#787878] text-white select-none transition duration-150
                    ${isPressed ? "opacity-50 bg-[#787878]" : "opacity-100"}
                    ${isSpace ? "w-48" : "w-14"}`} 
                >
                  <span className={isPressed ? "invisible" : "visible"}>
                    {isSpace ? "SPACE" : keyItem}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  
  export default Keyboard;
  