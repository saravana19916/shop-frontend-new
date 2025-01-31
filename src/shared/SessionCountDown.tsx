import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import moment from "moment-timezone";

interface IProps {
  endTime: string;
  setSessionExpiry: Dispatch<SetStateAction<boolean>>;
}

const SessionCountDown: FC<IProps> = ({ endTime, setSessionExpiry }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment();
      const end = moment.utc(endTime).local();
      const diffInSeconds = end.diff(now, "seconds");

      if (diffInSeconds <= 0) {
        setTimeLeft("00:00");
        clearInterval(timer);
        return;
      }
      const minutes = Math.floor((diffInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

      setTimeLeft(`${minutes}:${seconds}`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer); // Cleanup on unmount
  }, [endTime]);
  useEffect(() => {
    if (timeLeft === "00:00") {
      setSessionExpiry(true);
    }
  }, [timeLeft]);

  return (
    <div className="my-3 p-2 text-center">
      <span className="text-reddish-500 font-semibold">{timeLeft}</span>{" "}
      remaining to complete purchase.
    </div>
  );
};

export default SessionCountDown;
