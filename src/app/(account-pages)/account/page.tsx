"use client";
import React, { FC, useEffect, useState } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth.service";
import UtilityService from "@/services/utility.service";
import FormItem from "@/app/add-listing/FormItem";
import { useTranslation } from "react-i18next";
import ButtonSecondary from "@/shared/ButtonSecondary";

export interface AccountPageProps {}

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [occupationsOptions, setOccupationsOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [response, setResponse] = useState<Response | null | undefined>(null);

  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [facebookAddress, setFacebookAddress] = useState("");
  const [twitterAddress, setTwitterAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  
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

    UtilityService.occupation().then(
      (data) => setOccupationsOptions(data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    setShowAlert(true);
    // setResponse(UtilityService.getSessionResponse());
    UtilityService.deleteSessionResponse();
    formOptions();
    const user: any | undefined | null = AuthService.authUser();
    if (user && user.user && user.user.profile) {
      SetFirstName(user.user.profile.first_name);
      SetLastName(user.user.profile.last_name);
      setSelectedGender(user.user.profile.gender_id);
      setBirthDate(user.user.profile.birth_date.slice(0, 10));
      setSelectedCountry(user.user.profile.country_id);
      setSelectedNationality(user.user.profile.nationality_id);
      setFacebookAddress(user.user.profile.facebook_address);
      setTwitterAddress(user.user.profile.twitter_address);
      if(user.user.profile.image_file_name != undefined) {
        setProfilePic(
          process.env.AWS_CLOUD_FRONT_URL + "images/users/" + user.user.profile.image_file_name
        );
      } else {
        setProfilePic("");
      }
    }
  }, []);

  if (!genderOptions) return null;

  if (!countryOptions) return null;
  const { t } = useTranslation();
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">{t("accountInformation")}</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar
              sizeClass="w-32 h-32"
              imgUrl={profilePic}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">{t("changeImage")}</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label className="ml-3">&nbsp;{t("firstName")}</Label>
            <Input
              type="text"
              name="profile[first_name]"
              placeholder={t("firstName")}
              className="mt-1"
              rounded="rounded-full"
              value={firstName || ""}
              onChange={(e) => SetFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label className="ml-3">&nbsp;{t("lastName")}</Label>
            <Input
              type="text"
              name="profile[last_name]"
              placeholder={t("lastName")}
              className="mt-1"
              rounded="rounded-full"
              value={lastName || ""}
              onChange={(e) => SetLastName(e.target.value)}
            />
          </div>
          {/* ---- */}
          <div>
            <FormItem label="gender" labelClassName="pl-4">
              <Select
                value={selectedGender || ""}
                name="profile[gender_id]"
                disabled={isLoading}
                className="pl-4 rounded-full"
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">{t("selectGender")}</option>
                {genderOptions &&
                  genderOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {t(name)}
                    </option>
                  ))}
              </Select>
            </FormItem>
          </div>
          {/* ---- */}
          <div className="max-w-full">
            <Label className="ml-3">&nbsp;{t("dateOfBirth")}</Label>
            <Input
              type="date"
              name="profile[last_name]"
              className="mt-1 w-full"
              rounded=" rounded-full"
              value={birthDate || ""}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          {/* ---- */}
          <div>
            <FormItem label="occupation" labelClassName="pl-4">
              <Select
                name="profile[occupation_id]"
                disabled={isLoading}
                className="pl-4 rounded-full"
                value={selectedOccupation || ""}
                onChange={(e) => setSelectedOccupation(e.target.value)}
              >
                <option value="">{t("selectOccupation")}</option>
                {occupationsOptions &&
                  occupationsOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </Select>
            </FormItem>
          </div>
          {/* ---- */}
          <div>
            <FormItem label="countryOfResidence" labelClassName="pl-4">
              <Select
                name="profile[country_id]"
                disabled={isLoading}
                value={selectedCountry || ""}
                className="pl-4 rounded-full"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">{t("selectNationality")}</option>
                {countryOptions &&
                  countryOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </Select>
            </FormItem>
          </div>
          {/* ---- */}
          <div>
            <FormItem label="nationality" labelClassName="pl-4">
              <Select
                name="profile[nationality_id]"
                disabled={isLoading}
                className="pl-4 rounded-full"
                value={selectedNationality || ""}
                onChange={(e) => setSelectedNationality(e.target.value)}
              >
                <option value="">{t("selectNationality")}</option>
                {countryOptions &&
                  countryOptions!.map(({ id, name }, index) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
              </Select>
            </FormItem>
          </div>
          {/* ---- */}
          <div>
            <Label className="ml-3">&nbsp;{t("facebookAddress")}</Label>
            <Input
              type="text"
              name="profile[facebook_address]"
              className="mt-1"
              rounded=" rounded-full"
              value={facebookAddress || ""}
              onChange={(e) => setFacebookAddress(e.target.value)}
            />
          </div>
          {/* ---- */}
          <div>
            <Label className="ml-3">&nbsp;{t("twitterAddress")}</Label>
            <Input
              type="text"
              name="profile[twitter_address]"
              className="mt-1"
              rounded=" rounded-full"
              value={twitterAddress || ""}
              onChange={(e) => setTwitterAddress(e.target.value)}
            />
          </div>
          {/* ---- */}
          <div className="pt-2">
            <ButtonSecondary
              rounded="rounded-full"
              bgColor="bg-reddish-600 hover:bg-primary-6000"
              sizeClass="py-3 !px-16 text-base"
              borderColor="border-0"
              fontSize="text-md"
              textColor="text-white"
            >
              {t("update")}
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
