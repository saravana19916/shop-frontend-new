import React, { Dispatch, FC, SetStateAction } from "react";
interface IProps {
  acceptRulesAndRegulations: boolean;
  setAcceptRulesAndRegulations: Dispatch<SetStateAction<boolean>>;
}
const AcceptRulesAndRegulations: FC<IProps> = ({
  acceptRulesAndRegulations,
  setAcceptRulesAndRegulations,
}) => {
  return (
    <div className="mb-3">
      <label
        className="inline-flex items-center ms-4 space-x-2"
        htmlFor="rulesAndRegulationCheck"
      >
        <input
          type="checkbox"
          name="rulesAndRegulationCheck"
          id="rulesAndRegulationCheck"
          checked={acceptRulesAndRegulations}
          onChange={() =>
            setAcceptRulesAndRegulations((prev) => {
              return !prev;
            })
          }
          className="h-5 w-5 form-checkbox text-reddish-600 focus:ring-primary-6000 focus:ring-opacity-50 border-neutral-200 rounded"
        />
        <span className="text-neutral-700 dark:text-neutral-300 cursor-pointer">
          {" "}
          I agree to{" "}
          <a href="#" className="text-reddish-600">
            the Rules and Regulations of the venue
          </a>{" "}
          of event for customers{" "}
        </span>
      </label>
    </div>
  );
};

export default AcceptRulesAndRegulations;
