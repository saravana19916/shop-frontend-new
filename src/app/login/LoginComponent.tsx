import AlertSection from "@/components/AlertSection";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import appleSvg from "@/images/Apple.svg";
import appleWhiteSvg from "@/images/AppleWhite.svg";
import Input from "@/shared/Input";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useThemeMode } from "@/utils/useThemeMode";

import SocialMediaLoginComponent from "./SocialMediaLoginComponent";

interface IProps {
  response: any;
  showAlert: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  isLogging: boolean;
}

const LoginComponent: FC<IProps> = ({
  handleLogin,
  showAlert,
  response,
  isLogging,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isDarkMode } = useThemeMode();

  const loginSocials = [
    {
      label: "Sign in with",
      title: "Apple",
      driver: "apple",
      icon: isDarkMode ? appleWhiteSvg : appleSvg,
      brand: "apple",
    },
    {
      label: "Sign in with",
      title: "Google",
      driver: "google",
      icon: googleSvg,
      brand: "google",
    },
  ];
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("The email field is required.");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!password) {
      setPasswordError("The password field is required.");
    }

    if (email && password && validateEmail(email)) {
      handleLogin(e);
    }
  };
  return (
    <>
      <div className="container my-20">
        <AlertSection response={response} show={showAlert} />

        <div className="flex flex-col md:flex-row items-center justify-center xl:px-44 lg:px-24">
          <div className="w-full md:w-1/2 lg:p-8 mb-4 md:mb-0">
            <h2 className="font-semibold ms-3 mb-4">
              Already have an account?
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Input
                  type="text"
                  name="email"
                  placeholder="Email address or Mobile Number"
                  rounded="rounded-full"
                  className="mt-1 bg-zinc-100 border-0"
                  disabled={isLogging}
                  sizeClass="p-4 lg:ps-8 ps-4"
                />
                {emailError && <div className="text-red-600 mt-1">{emailError}</div>}
              </div>
              <div className="mb-6 relative">
                <div className="flex items-center relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    rounded="rounded-full"
                    className="mt-1 bg-zinc-100 border-0 pr-12"
                    disabled={isLogging}
                    placeholder="Password"
                    sizeClass="p-4 lg:ps-8 ps-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {/* Eye Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-6 h-6 transition-transform duration-300 ${showPassword ? 'rotate-0' : 'rotate-180'}`}
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5c-7.731 0-12 7-12 7s4.269 7 12 7 12-7 12-7-4.269-7-12-7zM12 15c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                        />
                      )}
                    </svg>
                  </button>
                </div>

                {passwordError && <div className="text-red-600 mt-1">{passwordError}</div>}
              </div>

              <ButtonPrimary
                className="lg:w-1/3 w-2/5 py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
                textColor="text-white"
                type="submit"
              >
                Sign In{" "}
              </ButtonPrimary>
              <ButtonSecondary
                className="lg:w-1/3 w-2/5 py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full ms-4 border-black dark:border-neutral-700"
                bgColor="bg-white dark:bg-black"
                textColor="text-black dark:text-white"
                type="button"
                href="/signup"
              >
                Register
              </ButtonSecondary>
              <div className="mt-3 ms-3">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-6000"
                >
                  {t("forgotPassword?")}
                </Link>
              </div>
            </form>
          </div>

          <div className="text-black dark:text-white font-semibold mx-4 md:mx-8 md:my-0 my-4">
            or
          </div>

          <div className="w-full md:w-1/2 lg:p-8 pt-0 pb-12">
            {loginSocials?.map((social) => (
              <SocialMediaLoginComponent
                key={social.title}
                label={social?.label}
                title={social?.title}
                icon={social?.icon}
                driver={social?.driver}
                brand={social?.brand}
              />
            ))}
            <ButtonSecondary
              className="mt-7 w-full text-sm sm:text-base border border-neutral-200 dark:border-neutral-700"
              rounded="rounded-full"
              bgColor="bg-zinc-100 dark:bg-black"
              textColor="text-black dark:text-white"
              borderColor="border-transparent"
              href="/home"
            >
              <h3 className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm py-0.6">
                <>&nbsp; &nbsp; </>Continue as
                <span className="font-bold ms-2">Guest</span>
              </h3>
            </ButtonSecondary>
          </div>
        </div>
        <div className="w-full  xl:ps-52 lg:px-22">
          <span>
            if you don't have an account with us,{" "}
            <Link href="/signup" className="font-medium text-primary-6000">
              Register Now
            </Link>{" "}
            and receive a complementary add-on on your first purchase with us
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
