import React, { Dispatch, FC, SetStateAction } from "react";
interface IProps {
  receiveFutureUpdated: boolean;
  setReceiveFutureUpdates: Dispatch<SetStateAction<boolean>>;
}
const ReceiveFutureUpdates: FC<IProps> = ({
  receiveFutureUpdated,
  setReceiveFutureUpdates,
}) => {
  return (
    <>
      <div className="mt-6 mb-3">
        <label
          className="inline-flex items-center ms-4 space-x-2"
          htmlFor="futureUpdatesCheck"
        >
          <input
            type="checkbox"
            name="futureUpdatesCheck"
            id="futureUpdatesCheck"
            checked={receiveFutureUpdated}
            onChange={() =>
              setReceiveFutureUpdates((prev) => {
                return !prev;
              })
            }
            className="h-5 w-5 form-checkbox text-primary-6000 focus:ring-primary-6000 focus:ring-opacity-50 border-neutral-200 rounded"
          />
          <span className="text-neutral-700 dark:text-neutral-300 cursor-pointer text-[10px]">
            {" "}
            I consent to receive communications from event organizer
          </span>
        </label>
      </div>
    </>
  );
};

export default ReceiveFutureUpdates;
