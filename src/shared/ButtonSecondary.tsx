"use client";

import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {
  borderColor?: string;
  textColor?: string;
  bgColor?: string;
  fontWeight?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  borderColor = " border-neutral-200 dark:border-neutral-700",
  textColor = "text-neutral-700 dark:text-neutral-300",
  bgColor = "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  fontWeight = "font-semibold",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary ${fontWeight} border ${bgColor} ${className} ${borderColor} ${textColor}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
