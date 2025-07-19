import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useState } from "react";
interface IProps {
  onChange: (value: number) => void;
  initialValue?: number;
  min?: number;
  max?: number;
  minSalable?: number;
  isAddingCart?: boolean;
}
const NcInputNumber2: FC<IProps> = ({
  initialValue = 0,
  min = 0,
  max,
  onChange,
  minSalable = 1,
  isAddingCart,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleClickDecrement = () => {
    if (min >= value) return;
    const newValue = value - (value > minSalable ? 1 : minSalable);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    const newValue = value + (value >= minSalable ? 1 : minSalable);
    setValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <>
      <div
        className={`nc-NcInputNumber flex items-center justify-between w-28 rounded-xl p-1 bg-zinc-250 dark:bg-black ${
          isAddingCart ? "" : ""
        }`}
      >
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-inherit focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4 text-black dark:text-white" />
        </button>
        <span
          className={`text-black dark:text-white ${
            isAddingCart ? "animate-pulse" : ""
          }`}
        >
          {initialValue}
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-inherit focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <PlusIcon className="w-4 h-4 text-black dark:text-white" />
        </button>
      </div>
    </>
  );
};

export default NcInputNumber2;
