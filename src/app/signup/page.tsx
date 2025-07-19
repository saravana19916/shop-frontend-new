"use client";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import googleSvg from "@/images/Google.svg";
import appleSvg from "@/images/Apple.svg";
import appleWhiteSvg from "@/images/AppleWhite.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import FormItem from "../add-listing/FormItem";
import Select from "@/shared/Select";
import Checkbox from "@/shared/Checkbox";
import UtilityService from "@/services/utility.service";
import AuthService from "@/services/auth.service";
import LoadingSpinner from "@/components/LoadingSpinner";
import AlertSection from "@/components/AlertSection";
import Response from "@/model/response";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useThemeMode } from "@/utils/useThemeMode";
import SocialMediaLoginComponent from "../login/SocialMediaLoginComponent";

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [response, setResponse] = useState<Response | null | undefined>(null);

  const [genderOptions, setGenderOptions] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setShowAlert(true);
    setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
    formOptions();
    document.title = "TixBox-Book Now-Events in Dubai,Qatar";
  }, []);

  const formOptions = () => {
    UtilityService.genders().then(
      (data) => {
        setGenderOptions(data);
      },
      (error) => console.log(error)
    );

    UtilityService.countries().then(
      (data) => setCountryOptions(data),
      (error) => console.log(error)
    );
  };

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

  if (!genderOptions) return null;

  if (!countryOptions) return null;

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("profile[phone_number]", phoneNumber);
    AuthService.signup(formData).then(
      (res) => {
        UtilityService.storeResponse(res);
        setShowAlert(true);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        if (res.token) {
          router.push("/");
        } else {
          router.push("/login");
        }
      },
      (error) => {
        UtilityService.storeResponse(error);
        setShowAlert(true);
        setResponse(UtilityService.getSessionResponse());
        setIsLoading(false);
        UtilityService.deleteSessionResponse();
      }
    );
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const _handlePhoneNumberChange = (e: any) => setPhoneNumber(e);
  const { t } = useTranslation();
  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-14 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {t("signUp")}
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-2">
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
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              {t("OR")}
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}

          <AlertSection response={response} show={showAlert} />

          <form className="grid grid-cols-1 gap-6" onSubmit={handleSignup}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200 ml-4">
                {t("emailAddress")} <span className="text-red-600">*</span>
              </span>
              <Input
                type="email"
                name="email"
                rounded="rounded-full"
                // placeholder="example@example.com"
                className="mt-1"
                disabled={isLoading}
              />
              {response && response!.error && response!.error!.email && (
                <div className="text-red-600"> {response.error.email} </div>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200 ml-4">
                {t("confirmEmailAddress")}{" "}
                <span className="text-red-600">*</span>
              </span>
              <Input
                type="email"
                name="confirm_email"
                // placeholder={`${t("ReenterEmailId")}  example@example.com`}
                className="mt-1"
                rounded="rounded-full"
                disabled={isLoading}
              />
              {response &&
                response!.error &&
                response!.error!.confirm_email && (
                  <div className="text-red-600">
                    {" "}
                    {response.error.confirm_email}{" "}
                  </div>
                )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200 ml-4">
                {t("firstName")} <span className="text-red-600">*</span>
              </span>
              <Input
                type="text"
                name="profile[first_name]"
                placeholder={t("firstName")}
                rounded="rounded-full"
                className="mt-1"
                disabled={isLoading}
              />
              {response &&
                response!.error &&
                response!.error["profile.first_name"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.first_name"]}{" "}
                  </div>
                )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200 ml-4">
                {t("lastName")} <span className="text-red-600">*</span>
              </span>
              <Input
                type="text"
                name="profile[last_name]"
                placeholder={t("lastName")}
                className="mt-1"
                rounded="rounded-full"
                disabled={isLoading}
              />
              {response &&
                response!.error &&
                response!.error["profile.last_name"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.last_name"]}{" "}
                  </div>
                )}
            </label>
            <FormItem label="gender" isRequired labelClassName="ml-4">
              <Select
                name="profile[gender_id]"
                disabled={isLoading}
                className="pl-4 rounded-full"
              >
                <option value="">{t("selectGender")}</option>
                {genderOptions &&
                  genderOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {t(name)}
                    </option>
                  ))}
              </Select>
              {response &&
                response!.error &&
                response!.error["profile.gender_id"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.gender_id"]}{" "}
                  </div>
                )}
            </FormItem>
            <FormItem label="nationality" isRequired labelClassName="ml-4">
              <Select
                name="profile[nationality_id]"
                disabled={isLoading}
                className="pl-4 rounded-full"
              >
                <option value="">{t("selectNationality")}</option>
                {countryOptions &&
                  countryOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </Select>
              {response &&
                response!.error &&
                response!.error["profile.nationality_id"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.nationality_id"]}{" "}
                  </div>
                )}
            </FormItem>
            <FormItem label="country" isRequired labelClassName="ml-4">
              <Select
                name="profile[country_id]"
                disabled={isLoading}
                className="rounded-full"
              >
                <option value="">{t("selectCountry")}</option>
                {countryOptions &&
                  countryOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </Select>
              {response &&
                response!.error &&
                response!.error["profile.country_id"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.country_id"]}{" "}
                  </div>
                )}
            </FormItem>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 ml-4">
                <span>
                  {t("dateOfBirth")} <span className="text-red-600">*</span>
                </span>
              </span>
              <Input
                type="date"
                name="profile[birth_date]"
                className="mt-1"
                rounded="rounded-full"
                disabled={isLoading}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => console.log(e.target.value)}
              />
              {response &&
                response!.error &&
                response!.error["profile.birth_date"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.birth_date"]}{" "}
                  </div>
                )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 ml-4">
                <span>
                  {t("password")} <span className="text-red-600">*</span>
                </span>
              </span>
              <Input
                type="password"
                name="password"
                rounded="rounded-full"
                className="mt-1"
                disabled={isLoading}
              />
              {response && response!.error && response!.error!.password && (
                <div className="text-red-600"> {response.error.password} </div>
              )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 ml-4">
                <span>
                  {t("confirmPassword")} <span className="text-red-600">*</span>
                </span>
              </span>
              <Input
                type="password"
                name="confirm_password"
                rounded="rounded-full"
                className="mt-1"
                disabled={isLoading}
              />
              {response &&
                response!.error &&
                response!.error!.confirm_password && (
                  <div className="text-red-600">
                    {" "}
                    {response.error.confirm_password}{" "}
                  </div>
                )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 ml-4">
                <span>
                  {t("phoneNumber")} <span className="text-red-600">*</span>
                </span>
              </span>
              <div className="flex items-center space-x-3 mt-1">
              <PhoneInput
                autoFormat={false}
                country={"us"}
                inputClass="rounded-full w-full !border-neutral-200 focus:!border-primary-200 dark:!border-neutral-700 dark:focus:!ring-primary-6000 dark:focus:!ring-opacity-25"
                inputStyle={{
                  minWidth: "100%",
                  borderRadius: "50px",
                  height: "auto",
                }}
                buttonStyle={{
                  borderStartStartRadius: "50px",
                  borderEndStartRadius: "50px",
                  paddingRight: "5px",
                }}
                buttonClass="!bg-white !border-neutral-200 dark:!bg-neutral-900 dark:!border-neutral-700 pe-1"
                onChange={_handlePhoneNumberChange}
                disabled={isLoading}
              />
              <div
                  className="font-semibold text-xs p-3 rounded-full px-8 cursor-pointer bg-neutral-100 text-black dark:bg-[#1DB954] dark:text-white hover:dark:bg-[#1AA34A]"
                >
                  Verify
                </div>
              {" "}
              {/* <Input
                type="number"
                name="profile[phone_number]"
                className="mt-1"
                disabled={isLoading}
              /> */}
              {response &&
                response!.error &&
                response!.error["profile.phone_number"] && (
                  <div className="text-red-600">
                    {" "}
                    {response.error["profile.phone_number"]}{" "}
                  </div>
                )}
                </div>
            </label>
            <Checkbox
              label="I agree to terms and conditions and privacy policy of Tixbox"
              name="agree_terms"
              disabled={isLoading}
              className="!text-[10px]"
            />
            {response && response!.error && response!.error!.agree_terms && (
              <div className="text-red-600"> {response.error.agree_terms} </div>
            )}
            <div className="pt-2">
              <ButtonSecondary
                type="submit"
                rounded="rounded-full"
                bgColor="bg-reddish-600 hover:bg-primary-6000"
                sizeClass="py-3 !px-16 text-base"
                borderColor="border-0"
                fontSize="text-md"
                textColor="text-white"
                disabled={isLoading}
              >
                {t("continue")} &nbsp; {isLoading && <LoadingSpinner />}
              </ButtonSecondary>
            </div>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            {t("alreadyHaveAnAccount?")} {` `}
            <Link href="/login" className="font-semibold underline">
              {t("signIn")}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
