import { FC } from "react";
interface IProps {
  onChange: (event) => void;
}
const CustomSearchBox: FC<IProps> = ({ onChange }) => {
  return (
    <div className="flex items-center bg-transparent ps-0 pe-4 py-2 w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500 mr-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197M16.804 15.804A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.608 10.608z"
        />
      </svg>
      <input
        onChange={onChange}
        type="text"
        autoFocus
        className="w-full text-gray-800 text-2xl font-medium placeholder-gray-400 bg-transparent focus:ring-0 border-none outline-none focus:outline-none"
        placeholder="Search for events"
      />
    </div>
  );
};

export default CustomSearchBox;
