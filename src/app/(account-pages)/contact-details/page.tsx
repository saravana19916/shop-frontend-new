"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import AuthService from "@/services/auth.service";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AccountPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  // const handleVerification = (type: "phone" | "email") => {
  //   switch (type) {
  //     case "phone":
  //       handleVerifyPhone();
  //       break;
  //     case "email":
  //       handleVerifyEmail();
  //       break;
  //     default:
  //       break;
  //   }
  // };
  const user = AuthService.authUser();
  useEffect(() => {
    if (
      user &&
      user.user &&
      user.user.profile &&
      user.user.profile.phone_number &&
      user.user.email
    ) {
      setPhoneNumber(user.user.profile.phone_number);
      setEmail(user.user.email);
    }
  }, []);

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handleUpdate = () => {
    console.log("Updating phone number:", phoneNumber);
    console.log("Updating email:", email);
  };
  const { t } = useTranslation();
  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">
        {t("updateYourPhoneNumberAndEmail")}
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {user.user.profile.phone_number ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span className="font-medium">{t("warningAlert!")}</span>{" "}
            {t("yourPhoneNumberHasBeenVerifiedAs")}
            {user.user.profile.phone_number}.{" "}
            {t("ifYouWantToUpdateYourPhoneNumber,PleaseVerifyIt.")}
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="max-w-2xl space-y-6">
        <div>
          <Label className="ml-3 mb-2 inline-block">
            &nbsp;{t("pleaseEnterYourPhoneNumber")}
          </Label>
          <div className="flex gap-3">
            <div className="w-10/12">
              <PhoneInput
                country="ae"
                value={phoneNumber || ""}
                autoFormat={false}
                placeholder=""
                inputClass="rounded w-full mt-1.5"
                inputStyle={{
                  minWidth: "100%",
                  borderRadius: "50px",
                  height: "auto",
                  paddingLeft: "60px",
                }}
                buttonStyle={{
                  borderStartStartRadius: "50px",
                  borderEndStartRadius: "50px",
                  backgroundColor: "#fff",
                  borderStartEndRadius: "0",
                  borderEndEndRadius: "0",
                  borderInlineEnd: 0,
                  paddingLeft: "10px",
                }}
                dropdownClass="rounded-xl"
              />
            </div>
            <div className="w-2/12 flex align-middle justify-center">
              <div className="font-semibold text-xs p-3 bg-neutral-100 rounded-full px-8 cursor-pointer">
                Verify
              </div>
            </div>
          </div>
          {/* <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            className="mt-1.5"
          /> */}
        </div>
        <div>
          <Label className="ml-3 mb-2 inline-block">
            &nbsp;{t("pleaseEnterYourEmail")}
          </Label>
          <div className="flex gap-3">
            <div className="w-10/12">
              <Input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="rounded-full"
              />
            </div>
            <div className="w-2/12 flex align-middle justify-center">
              <div className="font-semibold text-xs p-3 bg-neutral-100 rounded-full px-8 cursor-pointer">
                Verify
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <ButtonPrimary
            onClick={handleUpdate}
            sizeClass="py-3 px-12 rounded-full rounded-l-full  rounded-r-full"
          >
            {t("update")}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPhoneNumber;
