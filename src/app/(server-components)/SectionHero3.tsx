import React, { FC, useState } from "react";
import Image from "next/image";
import imagePng from "@/images/travelhero2.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSwipeable } from "react-swipeable";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import placeHolderImg from "@/images/placeholder-small.png";
import travelhero2Image from "@/images/travelhero2.png";
import slideImg1 from "@/images/slider/slide1.jpg";
import slideImg2 from "@/images/slider/slide2.jpg";
import slideImg3 from "@/images/slider/slide3.jpg";
import { useTranslation } from "react-i18next";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  const { t } = useTranslation();
  const navigation = true;
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = [slideImg1, slideImg2, slideImg3];

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images![index];

  const curasolSection = () => {
    return (
      <>
        <div
          className={`nc-SectionHero3 relative ${className}`}
          data-nc-id="SectionHero3"
        >
          <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
            <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
              {t("eventsNearYou")}
            </span>
            <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
              {t("newGeneration")} <br /> {t("ofBooking")}
            </h2>
            <ButtonPrimary
              sizeClass="py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full"
              fontSize="text-sm sm:text-base lg:text-lg font-medium"
            >
              {t("explore")}
            </ButtonPrimary>
          </div>
          <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
            {/*<Image
          className="absolute inset-0 object-cover rounded-xl"
          src={travelhero2Image}
          alt="hero"
          priority
        />*/}
            <Image
              src={currentImage || ""}
              alt="TixBox"
              className="absolute inset-0 object-cover rounded-xl blur"
              onLoadingComplete={() => setLoaded(true)}
            />
          </div>

          {/* Buttons + bottom nav bar */}
          <>
            {/* Buttons */}
            {loaded && navigation && (
              <div className="">
                {index > 0 && (
                  <button
                    className="absolute w-8 h-8 left-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index - 1)}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                )}
                {index + 1 < images.length && (
                  <button
                    className="absolute w-8 h-8 right-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Bottom Nav bar */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-neutral-900 opacity-50 rounded-b-lg"></div>
            <div className="flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5">
              {images.map((_, i) => (
                <button
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === index ? "bg-white" : "bg-white/60 "
                  }`}
                  onClick={() => changePhotoId(i)}
                  key={i}
                />
              ))}
            </div>
          </>
        </div>
      </>
    );
  };
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
          {t("eventsNearYou")}
        </span>
        <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
          {t("newGeneration")} <br /> {t("ofBooking")}
        </h2>
        <ButtonPrimary
          sizeClass="py-3 px-6 rounded-full rounded-l-full  rounded-r-full"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
          onClick={() => {
            const element = document.getElementById("hot_tickets");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {t("explore")}
        </ButtonPrimary>
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <Image
          className="absolute inset-0 object-cover rounded-xl"
          src={imagePng}
          alt="hero"
          priority
        />
      </div>
    </div>
  );
};

export default SectionHero3;
