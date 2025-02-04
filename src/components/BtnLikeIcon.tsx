"use client";

import React, { FC, useEffect, useState } from "react";
import { Event } from "@/model/IEventType";
import WishlistService from "@/services/wishlist.services";
import { toast } from "react-toastify";
import { IWishListEvent } from "@/model/IWishListEvent";
import { toTitleCase } from "@/utils/helpers";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  event?: Event;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
  isHomev2?: boolean;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  event,
  wishlistEvents,
  refetchWishList,
  user,
  isHomev2,
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  const handleLiked = async () => {
    const wishlist = await WishlistService?.handleWishlist({
      event_id: event?.event_id,
    });

    if (wishlist?.status === 200 || wishlist?.status === 201) {
      const eventName = event?.event?.identifier
        ? toTitleCase(event?.event?.identifier)
        : "Event";
      const toastMessage = `${eventName} ${
        likedState ? "removed from" : "added to"
      } wishlist successfully!`;
      toast.dark(toastMessage);
      refetchWishList?.();
      setLikedState((prev) => !prev);
    } else {
      toast.error(
        wishlist?.data?.error?.message || "Unable to update the wishlist!"
      );
    }
  };

  useEffect(() => {
    if (wishlistEvents?.length) {
      const isEventLiked = wishlistEvents.some(
        (item) => item.event_id === event?.event_id
      );
      setLikedState(isEventLiked);
    }
  }, [event, wishlistEvents]);

  return (
    <>
      {user?.user &&
        (!isHomev2 ? (
          <div
            className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
              likedState ? "nc-BtnLikeIcon--liked" : ""
            } ${colorClass} ${className}`}
            data-nc-id="BtnLikeIcon"
            title="Save"
            onClick={handleLiked}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={likedState ? "rgb(239, 68, 68)" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        ) : (
          <span
            className="absolute font-bold text-white text-xs z-20 text-center flex items-center justify-center rounded-lg right-3 top-3"
            onClick={handleLiked}
          >
            <i
              className={`las la-heart text-4xl ${
                likedState ? "text-red-600" : ""
              }`}
            ></i>
          </span>
        ))}
    </>
  );
};

export default BtnLikeIcon;
