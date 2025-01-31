"use client";
import React, { useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Response from "@/model/response";
import AuthService from "@/services/auth.service";
import { error } from "console";
import AlertSection from "@/components/AlertSection";
import UtilityService from "@/services/utility.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import ButtonSecondary from "@/shared/ButtonSecondary";

const AccountPass = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(true);

  const [response, setResponse] = useState<any>(null);

  const ChangePasswordSchema = z.object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(1, "password is required"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  });
  type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = (data) => {
    console.log(data);
    setIsLoading(true);
    AuthService.changePassword(
      data.current_password,
      data.password,
      data.confirm_password
    ).then(
      (res) => {
        setIsLoading(false);
        console.log(res);
        if (res && res.success) {
          toast.success(res.message[0], {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          reset();
        }
      },
      (error) => {
        setIsLoading(false);
        console.log(error.response.data);
        if (error.response.data.error.current_password) {
          toast.error(error.response.data.error.current_password, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }
        if (
          error.response.data.error.confirm_password &&
          error.response.data.error.confirm_password.length > 0
        ) {
          toast.error(error.response.data.error.confirm_password[0], {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }
      }
    );
  };
  const { t } = useTranslation();
  return (
    <div className="space-y-6 sm:space-y-8">
      <ToastContainer />
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">{t("updateYourPassword")}</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <AlertSection response={response} show={showAlert} />
      <form className=" max-w-xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label className="ml-3">&nbsp;{t("currentPassword")}</Label>
          <input
            type="password"
            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1.5"
            {...register("current_password")}
            name="current_password"
          />
          {errors.current_password && (
            <span className="text-red-800 block mt-2">
              {errors.current_password?.message}
            </span>
          )}
        </div>
        <div>
          <Label className="ml-3">&nbsp;{t("newPassword")}</Label>
          <input
            type="password"
            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1.5"
            {...register("password")}
            name="password"
          />
          {errors.password && (
            <span className="text-red-800 block mt-2">
              {errors.password?.message}
            </span>
          )}
        </div>
        <div>
          <Label className="ml-3">&nbsp;{t("confirmPassword")}</Label>
          <input
            type="password"
            className=" block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1.5"
            {...register("confirm_password")}
            name="confirm_password"
          />
          {errors.confirm_password && (
            <span className="text-red-800 block mt-2">
              {errors.confirm_password?.message}
            </span>
          )}
        </div>
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
            {t("update")} &nbsp; {isLoading && <LoadingSpinner />}
          </ButtonSecondary>
        </div>
      </form>
    </div>
  );
};

export default AccountPass;
