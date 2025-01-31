import React, { FC, useState } from "react";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { z } from "zod";
import { useTranslation } from "react-i18next";

interface IGooglePayProps {
  handelConfirmPay: () => void;
  disablePay: boolean;
}
const upiIdSchema = z.object({
  upiId: z
    .string()
    .regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, "Invalid UPI ID format"),
});
type FormData = z.infer<typeof upiIdSchema>;
const GooglePayPanel: FC<IGooglePayProps> = ({
  handelConfirmPay,
  disablePay,
}) => {
  const [formData, setFormData] = useState<FormData>({ upiId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    const result: any = upiIdSchema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldErrors = result.error.errors.reduce(
        (acc: Record<string, string>, error) => {
          if (error.path.length > 0) {
            acc[error.path[0]] = error.message;
          }
          return acc;
        },
        {}
      );
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const handleSubmit = () => {
    const allTouched: Record<string, boolean> = {
      upiId: true,
    };

    setTouched(allTouched);
    const result: any = upiIdSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});
      handelConfirmPay();
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Tab.Panel className="space-y-5">
        <div className="space-y-1">
          <Label>{t("UPIId")}</Label>
          <Input
            type="text"
            placeholder="example@abc"
            id="upiId"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.upiId && (
            <span className="text-red-500">{errors?.upiId}</span>
          )}
        </div>
        <div className="pt-4">
          <ButtonPrimary
            onClick={handleSubmit}
            disabled={disablePay}
            className="py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
          >
            {t("verifyAndPay")}
          </ButtonPrimary>
        </div>
      </Tab.Panel>
    </>
  );
};

export default GooglePayPanel;
