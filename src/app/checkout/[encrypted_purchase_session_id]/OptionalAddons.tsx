import { addonOptions, IOptionalAddonsType } from "@/model/IOptionalAddons";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, FC, SetStateAction } from "react";
interface IProps {
  optionalAddons: IOptionalAddonsType | null;
  setOptionalAddons?: Dispatch<SetStateAction<IOptionalAddonsType>>;
  paymentCurrency?: string;
  width?: string;
  border?: string;
  padding?: string;
  checkBoxColor?: string;
  hideUnSelected?: boolean;
}

const OptionalAddons: FC<IProps> = ({
  optionalAddons,
  setOptionalAddons,
  paymentCurrency,
  width = "lg:w-11/12 w-full",
  border = "border border-neutral-200 dark:border-neutral-700",
  padding = "p-3",
  checkBoxColor = "text-reddish-600",
  hideUnSelected,
}) => {
  const handleAddOptionChange = (value: string) => {
    setOptionalAddons &&
      setOptionalAddons((prev) => {
        const optionValue = !prev?.[value];
        const data = {
          ...prev,
          [value]: optionValue,
        };
        return data;
      });
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">Optional Addons</h3>
      {addonOptions?.map((addon, index) => (
        <>
          {hideUnSelected ? (
            <>
              {optionalAddons?.[addon.value] && (
                <div
                  key={(index + 1) * Math.random()}
                  className={`${
                    index === 0 ? "mt-6" : "mt-2"
                  } ${border} rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 ${width} bg-lightGrey-100 dark:bg-neutral-800 cursor-pointer`}
                  onClick={() => handleAddOptionChange(addon.value)}
                >
                  <div className="flex-1 p-0 5 flex space-x-4">
                    <div
                      className={`${padding} text-left flex-1 px-5 me-5 flex justify-between space-x-5`}
                    >
                      <div className="flex space-x-4">
                        {optionalAddons?.[addon.value] ? (
                          <>
                            <CheckCircleIcon
                              className={`w-5 h-5 lg:w-7 lg:h-7 ${checkBoxColor}`}
                            />
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-white"></div>
                          </>
                        )}
                        <span className="font-semibold text-sm block mt-1">
                          {addon.label}
                        </span>
                      </div>
                      {addon?.cost ? (
                        <>
                          <span className="font-normal text-sm block mt-1">
                            {paymentCurrency || ""} {(addon?.cost).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-normal text-sm block mt-1">
                            Free
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                key={(index + 1) * Math.random()}
                className={`${
                  index === 0 ? "mt-6" : "mt-2"
                } ${border} rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 ${width} bg-lightGrey-100 dark:bg-neutral-800 cursor-pointer`}
                onClick={() => handleAddOptionChange(addon.value)}
              >
                <div className="flex-1 p-0 5 flex space-x-4">
                  <div
                    className={`${padding} text-left flex-1 px-5 me-5 flex justify-between space-x-5`}
                  >
                    <div className="flex space-x-4">
                      {optionalAddons?.[addon.value] ? (
                        <>
                          <CheckCircleIcon
                            className={`w-5 h-5 lg:w-7 lg:h-7 ${checkBoxColor}`}
                          />
                        </>
                      ) : (
                        <>
                          <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-white"></div>
                        </>
                      )}
                      <span className="font-semibold text-sm block mt-1">
                        {addon.label}
                      </span>
                    </div>
                    {addon?.cost ? (
                      <>
                        <span className="font-normal text-sm block mt-1">
                          {paymentCurrency || ""} {(addon?.cost).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-normal text-sm block mt-1">
                          Free
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ))}
    </>
  );
};

export default OptionalAddons;
