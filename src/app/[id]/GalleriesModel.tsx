"use client";
import React, { Fragment, FC, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";
import { IEventDetails } from "@/model/IEventDetail";
import Modal from "@/components/listing-image-gallery/components/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import { useLastViewedPhoto } from "@/components/listing-image-gallery/utils/useLastViewedPhoto";
export interface GalleriesModelProps {
  openGalleri?: boolean;
  onChangeStatusGalleri?: any;
  eventDetail: IEventDetails;
}
export const getNewParam = ({
  paramName = "photoId",
  value,
}: {
  paramName?: string;
  value: string | number;
}) => {
  let params = new URLSearchParams(document.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

const GalleriesModel: FC<GalleriesModelProps> = ({
  openGalleri,
  onChangeStatusGalleri,
  eventDetail,
}) => {
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const photoId = searchParams?.get("photoId");
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(openGalleri);
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  function closeModal() {
    setIsOpen(false);
    onChangeStatusGalleri(false);
  }

  function openModal() {
    setIsOpen(true);
    onChangeStatusGalleri(true);
  }
  useEffect(() => {
    console.log(openGalleri);
    setIsOpen(openGalleri);
  }, [openGalleri]);
  return (
    <>
      {photoId && (
        <Modal
          images={eventDetail?.data?.galleries}
          onClose={() => {
            // @ts-ignore

            setLastViewedPhoto(photoId);
            let params = new URLSearchParams(document.location.search);
            console.log(params);

            params.delete("photoId");
            router.push(`${thisPathname}/?${params.toString()}` as Route);
          }}
        />
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Full-screen container to center the panel */}

                <div className="fixed inset-0 flex w-screen items-center justify-center">
                  <Dialog.Panel className="overflow-auto w-full h-screen transform  bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="sticky z-50 top-0 text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="p-4 xl:px-10 flex items-center justify-between bg-white">
                        <button className="focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100">
                          <ArrowSmallLeftIcon
                            className="w-6 h-6"
                            onClick={closeModal}
                          />
                        </button>
                        <LikeSaveBtns />
                      </div>
                    </Dialog.Title>
                    <div className="p-6 columns-1 gap-4 sm:columns-2 xl:columns-3">
                      {eventDetail?.data?.galleries.map((item, index) => (
                        <div
                          onClick={() => {
                            const newPathname = getNewParam({ value: index });
                            router.push(
                              `${thisPathname}/?${newPathname}` as Route
                            );
                          }}
                          key={item.id}
                          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
                        >
                          <Image
                            alt="chisfis listing gallery "
                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 focus:outline-none"
                            style={{
                              transform: "translate3d(0, 0, 0)",
                            }}
                            src={
                              process.env.AWS_CLOUD_FRONT_URL +
                                "images/events/" +
                                item?.img_name || ""
                            }
                            width={720}
                            height={480}
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px"
                          />
                        </div>
                      ))}
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default GalleriesModel;
