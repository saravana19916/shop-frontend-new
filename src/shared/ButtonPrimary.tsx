import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  textColor?: string;
  fontWeight?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  textColor = "text-white",
  fontWeight = "font-semibold",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-reddish-600 hover:bg-primary-6000 ${fontWeight} ${textColor} ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
