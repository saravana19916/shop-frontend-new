"use client";
import Label from "@/components/Label";
import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: string;
  children?: React.ReactNode;
  isRequired?: boolean;
  labelClassName?: string;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  labelClassName = "",
  desc,
  isRequired,
}) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {label && (
        <Label className={labelClassName}>
          {t(label)}{" "}
          {isRequired && (
            <>
              <span className="text-red-600">*</span>
            </>
          )}
        </Label>
      )}
      <div className="mt-1">{children}</div>
      {desc && (
        <span className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </span>
      )}
    </div>
  );
};

export default FormItem;
