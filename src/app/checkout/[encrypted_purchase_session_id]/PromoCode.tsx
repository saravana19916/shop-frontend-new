import React, { FC } from "react";
import Input from "@/shared/Input";
import { CheckIcon } from "@heroicons/react/24/outline";

interface IProps {
  onChangePromoCode: (code: string) => void;
  applyPromoCode: () => void;
  isPromoCodeApplied: boolean;
  promoCode: string | null;
}
const PromoCode: FC<IProps> = ({
  onChangePromoCode,
  applyPromoCode,
  isPromoCodeApplied,
  promoCode,
}) => {
  return (
    <>
      <h3 className="text-2xl font-semibold mt-8 ">Promo Code</h3>
      <div className="mt-8 lg:w-11/12 w-full">
        <div className="mb-4">
          <div className="flex items-center space-x-3">
            <Input
              placeholder={""}
              type="text"
              name="promoCode"
              rounded="rounded-full"
              value={promoCode}
              onChange={(event) => onChangePromoCode(event?.target?.value)}
              className="flex-grow py-6 px-6 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-50"
            />
            {isPromoCodeApplied ? (
              <>
                <div className="font-medium text-sm bg-greenish-500 rounded-full px-6 py-4 cursor-pointer flex gap-3">
                  <CheckIcon className="w-4 h-4" /> Applied
                </div>
              </>
            ) : (
              <>
                <div
                  className="font-semibold text-xs bg-neutral-100 rounded-full px-9 py-4 cursor-pointer dark:text-black"
                  onClick={() => applyPromoCode()}
                >
                  Apply
                </div>
              </>
            )}
          </div>
          <span className="text-xs font-normal text-grey-700 dark:text-neutral-300 block ms-3 mt-3">
            Add your promo code here and apply
          </span>
        </div>
      </div>
    </>
  );
};

export default PromoCode;
