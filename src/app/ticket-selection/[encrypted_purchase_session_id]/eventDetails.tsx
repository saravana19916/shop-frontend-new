import { IEventDetails } from "@/model/IEventDetail";
import { CalendarIcon } from "@heroicons/react/24/outline";
import placeHolderImg from "@/images/placeholder-small.png";
import React, { FC, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { MapPinIcon } from "@heroicons/react/24/outline";
import VideoPlayer from "@/components/VideoPlayer";
import { IEventDetailResponse } from "@/queries/eventDetail.query";

interface IProps {
  eventDetail: IEventDetailResponse;
  selectedPerformances;
}
const EventDetails: FC<IProps> = ({ eventDetail, selectedPerformances }) => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage = eventDetail?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventDetail?.data?.galleries[0]?.img_name
    : placeHolderImg;

  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [videoModalIsOpen, setVideoModalIsOpen] = useState<boolean>(false);

  const handleWatchVideo = () => {
    if (eventDetail?.data?.trailer) {
      setVideoLink(eventDetail?.data?.trailer);
      setVideoModalIsOpen(true);
    }
  };

  return (
    <>
      {eventDetail?.id ? (
        <>
          <div className="flex flex-col md:flex-row w-full items-center justify-between mb-12 mt-2">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  className="object-cover"
                  alt=""
                  width={0}
                  height={0}
                  sizes="200px"
                  src={currentImage}
                />
              </div>
            </div>
            <div className="lg:p-4 lg:pl-8 p-2 pb-4 mb-2 md:w-2/6 w-full">
              <div className="flex items-center space-x-2 mt-2 mb-1 text-sm">
                <CalendarIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-300" />
                <span className="text-black dark:text-neutral-300 block mt-1">
                  {moment(selectedPerformances?.start_date).format("DD MMM YY")}
                </span>
              </div>
              <h2 className="text-2xl font-bold mt-2">
                {eventDetail?.data?.detail?.name || ""}
              </h2>
              <div className="flex items-center space-x-1 mt-2 text-sm">
                <MapPinIcon className="w-4 h-4 text-neutral-500" />
                <span className="mt-0.5">
                  {eventDetail?.data?.venue?.detail?.address || ""}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-12 !text-sm text-neutral-700 dark:text-neutral-300 lg:p-4 lg:pr-8 p-2">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-clock text-2xl"></i>
                <span>{eventDetail?.data?.show_duration || 0}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="la la-youtube text-2xl"></i>
                <a href="#" onClick={handleWatchVideo}>
                  <span className="">Watch Trailer</span>
                  <VideoPlayer
                    videoLink={videoLink}
                    videoModalIsOpen={videoModalIsOpen}
                    setVideoLink={setVideoLink}
                    setVideoModalIsOpen={setVideoModalIsOpen}
                  />
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-user-friends text-2xl"></i>
                <span>Up to {eventDetail?.data?.venue?.capacity} people</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-people-carry text-2xl"></i>
                <span>Age limit {eventDetail?.data?.age_policy}+</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-96 w-full rounded-md bg-gray-300 animate-pulse"></div>
        </>
      )}
    </>
  );
};

export default EventDetails;
