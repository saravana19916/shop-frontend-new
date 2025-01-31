"use client";
import { IEventDetails } from "@/model/IEventDetail";
import React, { Fragment, FC, useState, useEffect } from "react";
import Badge from "@/shared/Badge";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import { IWishListEvent } from "@/model/IWishListEvent";
import VideoPlayer from "@/components/VideoPlayer";

export interface EventShortDetailProps {
  eventDetail: IEventDetails;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}
const EventShortDetail: FC<EventShortDetailProps> = ({
  eventDetail,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [videoModalIsOpen, setVideoModalIsOpen] = useState<boolean>(false);

  const handleWatchVideo = () => {
    if(eventDetail?.data?.trailer) {
      setVideoLink(eventDetail?.data?.trailer);
      setVideoModalIsOpen(true);
    }
  }

  useEffect(() => {
    console.log("Event Page", videoLink, videoModalIsOpen);
  }, []);

  return (
    <div className="listingSection__wrap !space-y-6">
      {eventDetail?.data?.id > 0 ? (
        <>
          <div className="flex justify-between items-center">
            {eventDetail?.data?.type && (
              <Badge
                color="pink"
                name={eventDetail?.data?.type}
                className="capitalize"
              />
            )}
            <LikeSaveBtns
              event={{
                id: eventDetail?.data?.id,
                event_id: eventDetail.data?.id,
              }}
              refetchWishList={refetchWishList}
              wishlistEvents={wishlistEvents}
              user={user}
            />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {eventDetail?.data?.detail?.name || ""}
          </h2>
          <div className="flex items-center space-x-4">
            <span>
              <i className="las la-map-marker-alt"></i>
              <span className="ml-1">
                {" "}
                {eventDetail?.data?.venue?.detail?.address || ""}
              </span>
            </span>
          </div>
          <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
          <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
              <i className="las la-clock text-2xl"></i>
              <span className="">
                {eventDetail?.data?.show_duration || 0}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
              <i className="la la-youtube text-2xl"></i>
              <a
                href="#"
                onClick={handleWatchVideo}
              >
                <span className="">Watch Trailer</span>
                <VideoPlayer
                  videoLink={videoLink}
                  videoModalIsOpen={videoModalIsOpen}
                  setVideoLink={setVideoLink}
                  setVideoModalIsOpen={setVideoModalIsOpen}
                />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
              <i className="las la-user-friends text-2xl"></i>
              <span className="">
                Up to {eventDetail?.data?.venue?.capacity} people
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
              <i className="las la-people-carry text-2xl"></i>
              <span className="">
                Age limit {eventDetail?.data?.age_policy}+
              </span>
            </div>
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
  );
};
export default EventShortDetail;
