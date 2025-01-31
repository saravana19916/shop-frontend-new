import { Menu, Transition } from "@headlessui/react";
import WishlistService from "@/services/wishlist.services";
import { Event } from "@/model/IEventType";
import React, { FC, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { IWishListEvent } from "@/model/IWishListEvent";
import { toTitleCase } from "@/utils/helpers";

export interface LikeSaveBtnProps {
  event?: Event;
  wishlistEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const LikeSaveBtns: FC<LikeSaveBtnProps> = ({
  event,
  wishlistEvents,
  refetchWishList,
  user,
}) => {
  const [likedState, setLikedState] = useState(false);
  const [wishlist, setWishlist] = useState<Event[]>([]);
  const [shareUrls, setShareUrls] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    whatsapp: "",
    copy: "",
  });

  const handleLiked = async () => {
    const wishlist = await WishlistService?.handleWishlist({
      event_id: event?.event_id,
    });
    if (wishlist?.status === 200 || wishlist?.status === 201) {
      const eventName = event?.event?.identifier
        ? toTitleCase(event?.event?.identifier)
        : undefined;
      const toastMessage = `${eventName ?? "Event"} ${
        likedState ? "removed from" : "add to"
      } wishlist successfully!`;
      toast?.dark(toastMessage);
      refetchWishList && refetchWishList();
      setLikedState((prev) => !prev);
    } else {
      toast?.error(
        wishlist?.data?.error?.message || "Unable to wishlist the event!"
      );
    }
  };

  useEffect(() => {
    if (event) {
      const url = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${process.env.API_URL}event/${event.event_id}`,
        twitter: `https://twitter.com/intent/tweet?url=YOUR_URL&text=${process.env.API_URL}event/${event.event_id}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${process.env.API_URL}event/${event.event_id}`,
        whatsapp: `https://api.whatsapp.com/send?text=ticket-shop%20${process.env.API_URL}event/${event.event_id}`,
        copy: `${process.env.API_URL}event/${event.event_id}`,
      };
      setShareUrls(url);
    }
  }, [event]);
  useEffect(() => {
    if (wishlistEvents?.length > 0) {
      const check = wishlistEvents?.find(
        (item: IWishListEvent) => item.event_id === event?.event_id
      );
      setLikedState(() => (check ? true : false));
    }
  }, [event, wishlist]);
  const { t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrls.copy);
    toast.dark(t("linkCopiedToClipboard!"));
  };

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="hidden sm:block ml-2.5">{t("share")}</span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black/5 focus:outline-none flex w-auto">
                <div className="px-1 py-1 flex">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={shareUrls.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center rounded-md px-2 py-2 text-4xl`}
                      >
                        <i className="lab la-facebook-square"></i>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={shareUrls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center rounded-md px-2 py-2 text-4xl`}
                      >
                        <i className="lab la-twitter"></i>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={shareUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center rounded-md px-2 py-2 text-4xl`}
                      >
                        <i className="lab la-linkedin"></i>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={shareUrls.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center rounded-md px-2 py-2 text-4xl`}
                      >
                        <i className="lab la-whatsapp"></i>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleCopy}
                        className={`group flex items-center rounded-md px-2 py-2 text-4xl`}
                      >
                        <i className="las la-copy"></i>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {user && user?.user && (
          <>
            <span
              className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={handleLiked}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill={likedState ? "rgb(235, 0, 59)" : "none"}
                viewBox="0 0 24 24"
                stroke={likedState ? "rgb(235, 0, 59)" : "currentColor"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="hidden sm:block ml-2.5">{t("save")}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LikeSaveBtns;
