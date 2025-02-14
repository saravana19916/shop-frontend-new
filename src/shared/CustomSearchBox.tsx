import { FC } from "react";
import styled from "styled-components";
interface IProps {
  onChange: (event) => void;
}
const CustomSearchBox: FC<IProps> = ({ onChange }) => {
  return (
    <div className="flex items-center w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 bg-transparent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-2.15 2.15L21 21z"
        />
      </svg>
      <input
        onChange={onChange}
        type="text"
        autoFocus
        className="w-full text-gray-800 dark:text-gray-200 text-2xl font-medium placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:ring-0 border-none outline-none"
        placeholder="Search for events"
      />
    </div>
  );
};

export default CustomSearchBox;
