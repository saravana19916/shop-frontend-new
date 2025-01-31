import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import ButtonSecondary from "@/shared/ButtonSecondary";

interface IProps {
  label?: string;
  title?: string;
  icon?: string;
  driver?: string;
  brand?: string;
}
const SocialMediaLoginComponent: FC<IProps> = ({
  label = "",
  title = "",
  icon = "",
  driver = "",
  brand,
}) => {
  const [loginUrl, setLoginUrl] = useState(null);
  const [isFetchingLoginUrl, setIsFetchingLoginUrl] = useState(null);
  useEffect(() => {
    setIsFetchingLoginUrl(true);
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
    setIsFetchingLoginUrl(false);
  }, []);
  return (
    <>
      <ButtonSecondary
        href={loginUrl}
        className="mb-5 w-full"
        rounded="rounded-full"
        disabled={!loginUrl || isFetchingLoginUrl}
      >
        <>
          <Image className="flex-shrink-0" src={icon} alt={title} />
          &nbsp;&nbsp;&nbsp;
          <h3 className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {label}
            <span className="font-bold ms-2">{title}</span>
            {brand === "apple" && <>&nbsp; &nbsp; &nbsp;</>}
            {brand === "google" && <>&nbsp; &nbsp; </>}
          </h3>
        </>
      </ButtonSecondary>
    </>
  );
};

export default SocialMediaLoginComponent;
