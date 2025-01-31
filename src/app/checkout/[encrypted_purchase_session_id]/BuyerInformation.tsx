import Label from "@/components/Label";
import Input from "@/shared/Input";
import FormItem from "@/app/add-listing/FormItem";
import Select from "@/shared/Select";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import UtilityService from "@/services/utility.service";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FormikErrors, FormikTouched } from "formik";

interface IProps {
  values;
  setIsNumberOTPModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEmailOTPModalOpen: Dispatch<SetStateAction<boolean>>;
  setUserPhone: Dispatch<SetStateAction<string | undefined>>;
  setUserEmail: Dispatch<SetStateAction<string | undefined>>;
  isPhoneNumberVerified: boolean;
  isLogin: boolean;
  isEmailAddressVerified: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: any;
  errors: any;
}
const BuyerInformation: FC<IProps> = ({
  setIsEmailOTPModalOpen,
  setIsNumberOTPModalOpen,
  setUserEmail,
  setUserPhone,
  isPhoneNumberVerified,
  isEmailAddressVerified,
  isLogin,
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [occupationsOptions, setOccupationsOptions] = useState([]);
  const formOptions = async () => {
    setIsLoading(true);
    await UtilityService.genders().then(
      (data) => {
        setGenderOptions(data);
      }
      // (error) => console.log(error)
    );

    await UtilityService.countries().then(
      (data) => setCountryOptions(data)
      // (error) => console.log(error)
    );

    await UtilityService.occupation().then(
      (data) => setOccupationsOptions(data)
      // (error) => console.log(error)
    );
    setIsLoading(false);
  };
  useEffect(() => {
    formOptions();
  }, []);
  const handleVerifyPhone = () => {
    if (values.userDetails?.userPhoneNumber) {
      setIsNumberOTPModalOpen(true);
    } else {
      toast.error("Please enter phone number");
    }
  };
  const handleVerifyEmail = () => {
    if (values.userDetails?.userEmail) {
      setIsEmailOTPModalOpen(true);
    } else {
      toast.error("Please enter email address");
    }
  };
  const handleVerification = (type: "phone" | "email") => {
    switch (type) {
      case "phone":
        handleVerifyPhone();
        break;
      case "email":
        handleVerifyEmail();
        break;
      default:
        break;
    }
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    setUserEmail(value);
  };
  return (
    <>
      <h3 className="text-2xl font-semibold mt-2">Buyer Information</h3>
      <div className="mt-8 lg:w-11/12 w-full">
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Input
              placeholder={"Full name on the ticket"}
              type="text"
              name="userDetails.fullNameOnTicket"
              rounded="rounded-full"
              onChange={handleOnChange}
              value={values.userDetails?.fullNameOnTicket}
              className="flex-grow py-6 px-6 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 placeholder:text-gray-450 placeholder:opacity-80"
            />
          </div>
          <span className="text-xs font-normal text-grey-700 dark:text-neutral-300 block ms-3 mt-3">
            Please enter your full name as per your official ID
          </span>
          {touched &&
            touched.userDetails?.fullNameOnTicket &&
            errors &&
            errors.userDetails?.fullNameOnTicket && (
              <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                {errors.userDetails?.fullNameOnTicket}
              </span>
            )}
        </div>
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Input
              placeholder={"Enter Email Address"}
              type="email"
              name="userDetails.userEmail"
              rounded="rounded-full"
              className="flex-grow py-6 px-6 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 placeholder:text-gray-450 placeholder:opacity-80"
              value={values.userDetails?.userEmail}
              onChange={handleOnChange}
            />
            {isEmailAddressVerified ? (
              <>
                <div className="font-medium text-sm bg-greenish-500 rounded-full px-6 py-4 cursor-pointer flex gap-3">
                  <CheckIcon className="w-4 h-4" /> Verified
                </div>
              </>
            ) : (
              <>
                <div
                  className="font-semibold text-xs bg-neutral-100 rounded-full px-9 py-4 cursor-pointer dark:text-black"
                  onClick={() => handleVerification("email")}
                >
                  Verify
                </div>
              </>
            )}
          </div>
          <span className="text-xs font-normal text-grey-700 dark:text-neutral-300 block ms-3 mt-3">
            Your tickets can be sent to this email address
          </span>
          {touched &&
            touched.userDetails?.userEmail &&
            errors &&
            errors.userDetails?.userEmail && (
              <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                {errors.userDetails?.userEmail}
              </span>
            )}
        </div>
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <PhoneInput
              country="ae"
              value={values.userDetails?.userPhoneNumber || ""}
              autoFormat={true}
              placeholder=""
              inputClass="rounded-full flex-grow py-6 px-6 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 placeholder:text-gray-450 placeholder:opacity-80"
              // inputClass="rounded w-full py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 placeholder:text-gray-450 placeholder:opacity-80"
              inputStyle={{
                // minWidth: "100%",
                width: "100%",
                borderRadius: "50px",
                // height: "auto",
                paddingLeft: "60px",
                borderColor: "#e5e5e5",
                outline: "none",
              }}
              buttonStyle={{
                borderStartStartRadius: "50px",
                borderEndStartRadius: "50px",
                backgroundColor: "#fff",
                borderInlineEnd: 0,
                paddingLeft: "10px",
                borderColor: "#e5e5e5",
              }}
              dropdownStyle={{
                borderRadius: "16px",
              }}
              // buttonClass="bg-white pe-1"
              onChange={(userPhone) => {
                setFieldValue("userDetails.userPhoneNumber", userPhone);
                setUserPhone(userPhone);
              }}
              onFocus={(e) => {
                e.target.style.border = "none";
                e.target.style.outline = "2px solid #FEC9DA";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #e5e5e5";
                e.target.style.outline = "none";
              }}
            />
            {isPhoneNumberVerified ? (
              <>
                <div className="font-medium text-sm bg-greenish-500 rounded-full px-6 py-4 cursor-pointer flex gap-3">
                  <CheckIcon className="w-4 h-4" /> Verified
                </div>
              </>
            ) : (
              <>
                <div
                  className="font-semibold text-xs bg-neutral-100 rounded-full px-9 py-4 cursor-pointer dark:text-black"
                  onClick={() => handleVerification("phone")}
                >
                  Verify
                </div>
              </>
            )}
          </div>
          <span className="text-xs font-normal text-grey-700 dark:text-neutral-300 block ms-3 mt-3">
            Your tickets can be sent to this phone number or its associated
            whatsapp account
          </span>
          {touched &&
            touched.userDetails?.userPhoneNumber &&
            errors &&
            errors.userDetails?.userPhoneNumber && (
              <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                {errors.userDetails?.userPhoneNumber}
              </span>
            )}
        </div>
        {isLogin ? (
          <></>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="flex-1 space-y-1 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
                <Select
                  name="nationality"
                  disabled={isLoading}
                  value={values.userDetails?.nationality || ""}
                  className={`pl-6 rounded-full h-12 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 ${
                    values.userDetails?.nationality &&
                    values.userDetails?.nationality?.split("")?.length > 0
                      ? "text-black"
                      : "text-gray-450 opacity-50"
                  }`}
                  onChange={(e) =>
                    setFieldValue("userDetails.nationality", e.target?.value)
                  }
                >
                  <option value="" className="text-gray-450">
                    Nationality
                  </option>
                  {countryOptions &&
                    countryOptions!.map(({ id, name }, index) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </Select>
                {touched &&
                  touched.userDetails?.nationality &&
                  errors &&
                  errors.userDetails?.nationality && (
                    <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                      {errors.userDetails?.nationality}
                    </span>
                  )}
              </div>

              <div className="flex-1 space-y-1 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
                <Select
                  name="countryOfResidence"
                  disabled={isLoading}
                  value={values.userDetails?.countryOfResidence || ""}
                  className={`pl-6 rounded-full h-12 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 ${
                    values.userDetails?.countryOfResidence &&
                    values.userDetails?.countryOfResidence?.split("")?.length >
                      0
                      ? "text-black"
                      : "text-gray-450 opacity-50"
                  }`}
                  onChange={(e) =>
                    setFieldValue(
                      "userDetails.countryOfResidence",
                      e.target?.value
                    )
                  }
                >
                  <option value="" className="text-gray-450">
                    Country of Residence
                  </option>
                  {countryOptions &&
                    countryOptions.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </Select>
                {touched &&
                  touched.userDetails?.userPhoneNumber &&
                  errors &&
                  errors.userDetails?.userPhoneNumber && (
                    <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                      {errors.userDetails?.userPhoneNumber}
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="flex-1 space-y-1 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
                <Select
                  name="gender"
                  disabled={isLoading}
                  value={values.userDetails?.gender || ""}
                  className={`pl-6 font-normal rounded-full h-12 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 ${
                    values.userDetails?.gender &&
                    values.userDetails?.gender?.split("")?.length > 0
                      ? "text-black"
                      : "text-gray-450 opacity-50"
                  }`}
                  onChange={(e) =>
                    setFieldValue("userDetails.gender", e.target?.value)
                  }
                >
                  <option value="" className="text-gray-450">
                    Gender
                  </option>
                  {genderOptions &&
                    genderOptions.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </Select>
                {touched &&
                  touched.userDetails?.gender &&
                  errors &&
                  errors.userDetails?.gender && (
                    <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                      {errors.userDetails?.gender}
                    </span>
                  )}
              </div>

              <div className="flex-1 space-y-1 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
                <Select
                  name="occupation"
                  disabled={isLoading}
                  value={values?.userDetails?.occupation || ""}
                  className={`pl-6 font-normal rounded-full h-12 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50 ${
                    values?.userDetails?.occupation &&
                    values?.userDetails?.occupation?.split("")?.length > 0
                      ? "text-black"
                      : "text-gray-450 opacity-50"
                  }`}
                  onChange={(e) =>
                    setFieldValue("userDetails.occupation", e.target?.value)
                  }
                >
                  <option value="" className="text-gray-450">
                    Occupation
                  </option>
                  {occupationsOptions &&
                    occupationsOptions.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                </Select>
                {touched &&
                  touched.userDetails?.occupation &&
                  errors &&
                  errors.userDetails?.occupation && (
                    <span className="text-xs font-normal ms-3 block text-red-500 mt-2">
                      {errors.userDetails?.occupation}
                    </span>
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BuyerInformation;

{
  /* <div className="space-y-1 mb-4">
<Label className="ms-3">Phone Number</Label>
<div className="flex">
  <PhoneInput
    country="ae"
    value={userPhone || ""}
    autoFormat={false}
    placeholder=""
    inputClass="rounded w-full border-r-0"
    inputStyle={{
      minWidth: "100%",
      borderStartStartRadius: "50px",
      borderEndStartRadius: "50px",
      height: "auto",
      borderStartEndRadius: "0",
      borderEndEndRadius: "0",
      borderInlineEnd: 0,
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
    buttonClass="bg-white pe-1"
    onChange={(userPhone) => setUserPhone(userPhone)}
  />
  <button
    className="border border-l-0 text-neutral-700 rounded-full dark:text-neutral-900 px-5 rounded-tl-none rounded-bl-none focus:outline-none focus:border-neutral-300  dark:border-neutral-700 dark:bg-neutral-900"
    onClick={() => handleVerification("phone")}
  >
    <span className="inline-block bg-neutral-200 dark:bg-neutral-400 rounded-full py-1 px-8 text-xs">
      Verify{" "}
    </span>
  </button>
</div>
<span className="block ms-3 text-sm text-gray-400 font-light">
  Your tickets can be sent to this phone number or its associated
  whatsapp account
</span>
</div> */
}
