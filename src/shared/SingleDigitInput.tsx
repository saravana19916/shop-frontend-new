import React, { useState } from "react";

function SingleDigitInput() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    // Check if the entered value is a single digit
    if (value === "" || /^(\d){1}$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <input
      type="text"
      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg text-gray-950 focus:bg-gray-50 focus:ring-1 ring-blue-700"
      value={inputValue}
      onChange={handleChange}
      maxLength={1} // Limit the input length to 1 character
    />
  );
}

export default SingleDigitInput;
