import React, { FC, useState } from "react";
import Image from "next/image";
import { IEventDetails, IPerformance } from "@/model/IEventDetail";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Avatar from "@/shared/Avatar";
import StartRating from "@/components/StartRating";
import placeHolderImg from "@/images/placeholder-small.png";

import Badge from "@/shared/Badge";

interface IProps {
  eventDetails: IEventDetails;
  onOpenGalleriesModel: (value: boolean) => void;
}

const FloorPlanEventDetails: FC<IProps> = ({
  eventDetails,
  onOpenGalleriesModel,
}) => {
  const thumbnailURL = process.env.AWS_CLOUD_FRONT_URL + "images/events/";

  const currentImage = eventDetails?.data?.galleries[0]?.img_name
    ? thumbnailURL + eventDetails?.data?.galleries[0]?.img_name
    : placeHolderImg;
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselPrev = () => {
    setCarouselIndex(carouselIndex - 1);
  };

  const handleCarouselNext = () => {
    setCarouselIndex(carouselIndex + 1);
  };
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  return (
    <>
      <div className="relative z-10 mt-11 flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/5 space-y-8 lg:space-y-10 mb-12">
          <div className="listingSection__wrap space-y-6">
            <div className="flex justify-between items-center">
              {eventDetails?.data?.type && (
                <Badge
                  color="pink"
                  name={toTitleCase(eventDetails?.data?.type)}
                />
              )}
              <LikeSaveBtns />
            </div>
            <h2 className="text-2xl font-semibold">
              {eventDetails?.data?.detail?.name || "Jawan "}
            </h2>
            <div className="flex items-center space-x-4">
              <StartRating />
              <span>
                <i className="las la-map-marker-alt"></i>
                <span className="ml-1">
                  {eventDetails?.data?.venue?.detail?.address || "Japan, Tokyo"}
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <Avatar
                hasChecked
                // sizeclassName="h-10 w-10"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                Hosted by{" "}
                <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                  Kevin Francis
                </span>
              </span>
            </div>
            {/* <div className="flex flex-row justify-between"> */}
            {/* <div className="flex flex-col justify-between">
 
              </div> */}
            {/* <div className="flex-shrink-0 w-full sm:w-40">
                <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                  <Image alt="" fill sizes="160px" src={currentImage} />
                </div>
              </div> */}
            {/* </div> */}

            <div className="flex items-center justify-between sm:justify-start space-x-6 sm:space-x-10 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-clock text-2xl"></i>
                <span className="">
                  {eventDetails?.data?.show_duration || "2 hours"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-user-friends text-2xl"></i>
                <span className="">
                  Up to {eventDetails?.data?.venue?.capacity || 50} people
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 text-center sm:text-left sm:space-x-3">
                <i className="las la-language text-2xl"></i>
                <span className=""> English, Arabic</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full lg:w-3/5 lg:pl-10 mb-12"
          onClick={() => onOpenGalleriesModel(true)}
        >
          {/* // aspect-w-4 aspect-h-3 sm:aspect-h-4// */}
          <div className="relative overflow-auto sidebar-scrollbar rounded-lg xl:h-[20rem] lg:h-[19rem] md:h-72 h-64 flex gap-3">
            <img
              key={eventDetails?.data.galleries[0].img_name}
              alt={eventDetails?.data.galleries[0].img_name}
              className="block w-full h-full object-cover rounded-lg"
              // src={
              //   process.env.AWS_CLOUD_FRONT_URL +
              //     "images/events/" +
              //     eventDetails?.data.galleries[0].img_name || ""
              // }
              src={"https://static.toiimg.com/thumb/msid-103359834,width-1280,height-720,resizemode-4/103359834.jpg"}
            />
            {/* {eventDetails?.data.galleries.map((item, index) => (
              <img
                key={index}
                alt={item?.img_name}
                className="block w-full h-full object-cover rounded-lg"
                src={
                  process.env.AWS_CLOUD_FRONT_URL +
                    "images/events/" +
                    item?.img_name || ""
                }
              />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloorPlanEventDetails;

{
  /* <!-- Slider indicators --> */
}
{
  /* <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="true"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 4"
                  data-carousel-slide-to="3"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 5"
                  data-carousel-slide-to="4"
                ></button>
              </div> */
}
{
  /* <!-- Slider controls --> */
}

{
  /* Controls # */
}
{
  /* <div>
              {eventDetails?.data.galleries.map((item, index) => (
                <div key={index}>
                  <img
                    alt={item?.img_name}
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={
                      process.env.AWS_CLOUD_FRONT_URL +
                        "images/events/" +
                        item?.img_name || ""
                    }
                    sizes="400px"
                  />
                </div>
              ))}
            </div> */
}
