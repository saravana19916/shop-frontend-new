"use client";

import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { range } from "../utils/range";
import downloadPhoto from "../utils/downloadPhoto";
import { variants } from "@/utils/animationVariants";
import type { IGallery } from "@/model/IEventDetail";

interface SharedModalProps {
  index: number;
  images?: IGallery[];
  currentPhoto?: IGallery;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [imageWidth, setImageWidth] = useState(580);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize screen size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const widthMapping = [
      { maxWidth: 2500, imageWidth: 750 },
      { maxWidth: 2300, imageWidth: 700 },
      { maxWidth: 2100, imageWidth: 650 },
      { maxWidth: 1900, imageWidth: 620 },
      { maxWidth: 1700, imageWidth: 580 },
      { maxWidth: 1500, imageWidth: 530 },
      { maxWidth: 1390, imageWidth: 480 },
      { maxWidth: 1220, imageWidth: 430 },
      { maxWidth: 1150, imageWidth: 390 },
      { maxWidth: 1090, imageWidth: 360 },
      { maxWidth: 1020, imageWidth: 320 },
      { maxWidth: 850, imageWidth: 280 },
      { maxWidth: 700, imageWidth: 250 },
      { maxWidth: 600, imageWidth: 210 },
      { maxWidth: 500, imageWidth: 180 },
    ];
    const match = widthMapping.find(
      ({ maxWidth }) => screenSize.width > maxWidth
    ) || { imageWidth: 150 };
    setImageWidth(match.imageWidth);
  }, [screenSize]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => index < images?.length - 1 && changePhotoId(index + 1),
    onSwipedRight: () => index > 0 && changePhotoId(index - 1),
    trackMouse: true,
  });

  let currentImage = images ? images[index] : currentPhoto;
  let filteredImages = images?.filter((img: IGallery) =>
    range(index - 15, index + 15).includes(img.id)
  );

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" // Adjusted z-index
        {...handlers}
      >
        {/* Main image display */}
        <div className="relative w-full max-w-5xl flex flex-col items-center z-50">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants()}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute flex justify-center items-center w-full h-full"
            >
              <Image
                src={
                  process.env.AWS_CLOUD_FRONT_URL +
                    "images/events/" +
                    currentImage?.img_name || ""
                }
                width={imageWidth}
                height={navigation ? 853 : 1280}
                priority
                alt="Gallery image"
                onLoadingComplete={() => setLoaded(true)}
                sizes="(max-width: 1025px) 100vw, 1280px"
                className={`rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
                  loaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1/2 opacity-0"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          {loaded && (
            <div className="fixed inset-0 flex items-center justify-between px-4 z-50">
              {/* Left/Right navigation */}
              {navigation && index > 0 && (
                <button
                  className="absolute left-4 top-[calc(50%-16px)] bg-black/50 p-3 rounded-full text-white hover:bg-black/75 z-50"
                  onClick={() => changePhotoId(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
              )}
              {navigation && index < images.length - 1 && (
                <button
                  className="absolute right-4 top-[calc(50%-16px)] bg-black/50 p-3 rounded-full text-white hover:bg-black/75 z-50"
                  onClick={() => changePhotoId(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}
              {/* Close/Download/Share */}
              <div className="absolute top-4 right-4 flex gap-2 z-50">
                {/* {navigation && (
                  <a
                    href={currentImage?.img_name}
                    className="bg-black/50 p-2 rounded-full text-white hover:bg-black/75 z-50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  </a>
                )} */}
                <button
                  onClick={() =>
                    downloadPhoto(currentImage?.img_name || "", `${index}.jpg`)
                  }
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/75 z-50"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={closeModal}
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/75 z-50"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails at the bottom */}
        {navigation && (
          <div className="fixed bottom-4 inset-x-0 flex justify-center gap-2 z-50">
            {filteredImages?.map((item) => (
              <button
                key={item.id}
                onClick={() => changePhotoId(item.id)}
                className={`${
                  item.id === index ? "border-white" : "border-transparent"
                } border-2 rounded-lg p-1 z-50`}
              >
                <Image
                  src={
                    process.env.AWS_CLOUD_FRONT_URL +
                      "images/events/" +
                      item?.img_name || ""
                  }
                  alt="Thumbnail"
                  width={80}
                  height={50}
                  className="rounded object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
