"use client";

// import React, { FC, useEffect, useState } from "react";
// import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
// import { EyeIcon } from "@heroicons/react/24/outline";

// export interface NcInputNumberProps {
//   className?: string;
//   defaultValue?: number;
//   min?: number;
//   max?: number;
//   onChange?: (value: number) => void;
//   label?: string;
//   desc?: string;
//   iconClass?: string;
//   insuredescription?: string;
// }

// const NcInputNumber: FC<NcInputNumberProps> = ({
//   className = "w-full",
//   defaultValue = 0,
//   min = 0,
//   max,
//   onChange,
//   label,
//   desc,
//   iconClass,
//   insuredescription,
// }) => {
//   const [value, setValue] = useState(defaultValue);

//   useEffect(() => {
//     setValue(defaultValue);
//   }, [defaultValue]);

//   const handleClickDecrement = () => {
//     if (min >= value) return;
//     setValue((state) => {
//       return state - 1;
//     });
//     onChange && onChange(value - 1);
//   };
//   const handleClickIncrement = () => {
//     if (max && max <= value) return;
//     setValue((state) => {
//       return state + 1;
//     });
//     onChange && onChange(value + 1);
//   };

//   const renderLabel = () => {
//     return (
//       <div className="flex flex-col">
//         <span className="font-medium text-neutral-800 dark:text-neutral-200">
//           {label}
//         </span>
//         {desc && (
//           <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
//             {desc}
//           </span>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
//       data-nc-id="NcInputNumber"
//     >
//       <div className="flex gap-1.5">
//         {label && renderLabel()}
//         {iconClass && (
//           <>
//             <div className="group cursor-pointer relative inline-block text-center">
//               <i className={`mt-1 ${iconClass}`}></i>

//               <div className="opacity-0 w-[20rem] bg-black dark:bg-white text-white dark:text-black text-start text-xs rounded-lg py-2 absolute z-20 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
//                 {insuredescription}
//                 <svg
//                   className="absolute text-black dark:text-white h-2 w-[6%] left-0 top-full"
//                   x="0px"
//                   y="0px"
//                   viewBox="0 0 255 255"
//                 >
//                   <polygon
//                     className="fill-current"
//                     points="0,0 127.5,127.5 255,0"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </>
//         )}

//         {/* la la-eye text-xl */}
//       </div>
//       <div
//         className={`nc-NcInputNumber flex items-center justify-between w-28`}
//       >
//         <button
//           className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
//           type="button"
//           onClick={handleClickDecrement}
//           disabled={min >= value}
//         >
//           <MinusIcon className="w-4 h-4" />
//         </button>
//         <span>{value}</span>
//         <button
//           className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
//           type="button"
//           onClick={handleClickIncrement}
//           disabled={max ? max <= value : false}
//         >
//           <PlusIcon className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NcInputNumber;
import React, { FC, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import orderImage from "@/images/floor_plan_1.png";

export interface NcInputNumberProps {
  className?: string;
  initialValue?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
  iconClass?: string;
  insuredescription?: string;
  floorplan?: string;
}

const NcInputNumber: FC<NcInputNumberProps> = ({
  className = "w-full",
  initialValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
  iconClass,
  insuredescription,
  floorplan,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleClickDecrement = () => {
    if (min >= value) return;
    const newValue = value - 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    const newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      data-nc-id="NcInputNumber"
    >
      <div className="flex gap-1.5">
        {label && (
          // <div className="flex flex-col">
          //   <span className="font-medium text-neutral-800 dark:text-neutral-200">{label}</span>
          //   {desc && <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">{desc}</span>}
          // </div>
          <>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {label}
            </span>
            {/* <div className="group cursor-pointer relative inline-block text-center">
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {floorplan && (
                  <>
                    <i className="ml-2 las la-eye"></i>
                    <div className="opacity-0 w-[35rem] right-[1000%] bg-black dark:bg-white text-white dark:text-black text-start text-xs rounded-lg py-2 absolute z-20 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
                      <Image
                        src={orderImage}
                        alt="Floor Plan"
                        width={400}
                        height={250}
                        className="mx-auto"
                      />
                      <svg
                        className="absolute text-black dark:text-white h-2 w-[6%] left-[25vw] top-full"
                        x="0px"
                        y="0px"
                        viewBox="0 0 255 255"
                      >
                        <polygon
                          className="fill-current"
                          points="0,0 127.5,127.5 255,0"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </span>
            </div> */}
          </>
        )}
        {iconClass && (
          <div className="group cursor-pointer relative inline-block text-center">
            <i className={`mt-1 ${iconClass}`}></i>
            {insuredescription && (
              <div className="opacity-0 w-[20rem] bg-black dark:bg-white text-white dark:text-black text-start text-xs rounded-lg py-2 absolute z-20 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-6 px-3 pointer-events-none">
                {insuredescription}
                <svg
                  className="absolute text-black dark:text-white h-2 w-8 left-1/2 transform -translate-x-1/2 top-full mt-4"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                ></svg>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`nc-NcInputNumber flex items-center justify-between w-28`}
      >
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span>{value}</span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NcInputNumber;
