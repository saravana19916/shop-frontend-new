import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export interface SocialLoginCompProps {
  name?: string;
  icon?: string;
  driver?: string;
  brand?: string;
}

const SocialLoginComp: FC<SocialLoginCompProps> = ({
  name = "",
  icon = "",
  driver = "",
  brand,
}) => {
  const [loginUrl, setLoginUrl] = useState(null);
  useEffect(() => {
    fetch(`${process.env.API_URL}socialauth/${driver}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setLoginUrl(data.url);
      })
      .catch((error) => console.error(error));
  }, []);
  const { t } = useTranslation();
  return (
    <div>
      {loginUrl != null && (
        <a
          href={loginUrl}
          className="flex justify-center items-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
        >
          <Image className="flex-shrink-0" src={icon} alt={name} />
          &nbsp;&nbsp;&nbsp;
          <h3 className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {t(name)}
            {brand === "apple" && <>&nbsp; &nbsp; &nbsp;</>}
            {brand === "google" && <>&nbsp; &nbsp; </>}
          </h3>
        </a>
      )}
    </div>
  );
};

export default SocialLoginComp;
