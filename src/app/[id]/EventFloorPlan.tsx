"use client";
import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import Image from "next/image";
import orderImage from "@/images/floor-plan.png";
import { useTranslation } from "react-i18next";

interface FloorPlanProps {
  eventDetail: IEventDetails;
}

const EventFloorPlan: FC<FloorPlanProps> = ({ eventDetail }) => {
  const [floorPlan, setFloorPlan] = useState<string>();
  useEffect(() => {
    setFloorPlan(eventDetail?.data?.performances[0]?.floorplan?.static_image);
  }, [eventDetail]);
  const { t } = useTranslation();
  return (
    <>
      <div className="listingSection__wrap !space-y-6" id="floorPlan">
        {eventDetail?.data?.id > 0 ? (
          <>
            <div>
              <h2 className="text-2xl font-semibold">{t("floorPlan")}</h2>
              <span className="block mt-2 text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                {t("floorPlan")}
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            <div className="flow-root w-auto text-center">
              <Image
                src={orderImage}
                alt={t("floorPlan")}
                className="mx-auto w-[747px] h-[448px] object-contain"
              />
              {/* <img
                className="w-full object-cover"
                src={`${process.env.AWS_CLOUD_FRONT_URL}images/venuehallfloorplans/${floorPlan}`}
                alt="floorPlan"
              /> */}
            </div>
          </>
        ) : (
          <>
            <div className="h-3 w-2/12 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
          </>
        )}
      </div>
    </>
  );
};

export default EventFloorPlan;
