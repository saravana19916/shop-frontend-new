"use client";
import React, { FC, useState, useEffect } from "react";
import UtilityService from "../services/utility.service";
import Response from '@/model/response';

export interface AlertSectionProps {
  response?: Response | null | undefined;
  show?: boolean;
}

const AlertSection: FC<AlertSectionProps> = ({
  response = {},
  show = false
}) => {

  useEffect(
    () => {
      let timer1 = setTimeout(() => show = false, 5 * 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  return (
    <>
      {response && (response!.error || response!.message) && show && (
        <div>
          <div className={response.error ? "text-red-600 text-center" : "text-green-600 text-center"}> {response.error ? response.error.message : response.message} </div>
        </div>
      )}
    </>
  );
};

export default AlertSection;