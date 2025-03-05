import React from "react";

interface SingleDigitInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

function SingleDigitInput({ value, onChange }: SingleDigitInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "" || /^[0-9]$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <input
      type="text"
      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg text-gray-950 focus:bg-gray-50 focus:ring-1 ring-blue-700"
      value={value}
      onInput={handleChange}
      maxLength={1}
    />
  );
}

export default SingleDigitInput;
