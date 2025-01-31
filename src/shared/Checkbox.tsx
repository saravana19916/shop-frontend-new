"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  defaultChecked,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="h-5 w-5 form-checkbox text-primary-6000 focus:ring-primary-6000 focus:ring-opacity-50 border-neutral-200 rounded"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-3 flex flex-col flex-1 justify-center"
        >
          <span className="text-neutral-900 dark:text-neutral-100">
            {t(label)}
          </span>
          {subLabel && (
            <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
