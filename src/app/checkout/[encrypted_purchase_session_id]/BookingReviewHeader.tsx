import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
interface BookingReviewHeaderProps {
  isEdit: boolean;
  onEditOrderSummary: () => void;
  handleSave: () => void;
}
const EditButton: FC<BookingReviewHeaderProps> = ({
  isEdit,
  onEditOrderSummary,
  handleSave,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-3xl font-semibold">{t("reviewYourBooking")}</h3>
      {isEdit ? (
        <>
          <div className="flex gap-3">
            <ButtonSecondary
              onClick={onEditOrderSummary}
              className="py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
            >
              {t("cancel")}
            </ButtonSecondary>
            <ButtonPrimary
              className="py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
              onClick={handleSave}
            >
              {t("save")}
            </ButtonPrimary>
          </div>
        </>
      ) : (
        <>
          <ButtonPrimary
            className="py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
            onClick={onEditOrderSummary}
          >
            {t("editSelection")}
          </ButtonPrimary>
          {/* <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" /> */}
        </>
      )}
    </>
  );
};

export default EditButton;
