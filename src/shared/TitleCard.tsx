import React, { FC } from "react";
interface IProps {
  title: string;
  margin?: string;
}

const TitleCard: FC<IProps> = ({ title, margin = "mb-12 mt-2" }) => {
  return (
    <>
      <div
        className={`flex flex-col md:flex-row w-full items-center justify-between ${margin}`}
      >
        <span className="text-3xl lg:text-4xl font-semibold">{title}</span>
      </div>
    </>
  );
};

export default TitleCard;
