import React, { FC } from "react";
import { useTranslation } from "react-i18next";
interface ISelectedAddonsProps {
  addons: any;
}
const SelectedAddons: FC<ISelectedAddonsProps> = ({ addons }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex-1 p-5 flex space-x-4">
        {/* <ModalSelectGuests
                renderChildren={({ openModal }) => ( */}
        <button
          type="button"
          // onClick={openModal}
          className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <div className="flex flex-col">
            <span className="text-sm text-neutral-400">{t("addOns")}</span>
            <span className="mt-1.5 text-lg font-semibold">
              <span className="line-clamp-1">
                {addons && addons.insure && addons.insure.quantity ? (
                  <>Insure {addons.insure.quantity}</>
                ) : (
                  <>Insure 0</>
                )}
              </span>
            </span>
          </div>
          {/* <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" /> */}
        </button>
        {/* )}
              /> */}
      </div>
    </>
  );
};

export default SelectedAddons;
