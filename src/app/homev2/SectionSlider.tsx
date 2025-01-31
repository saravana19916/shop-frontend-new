"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import LastChance from "./LastChance";
import HotOnes from "./HotOnes";
import Top10 from "./Top10";
import Specials from "./Specials";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import CardCategory6 from "@/components/CardCategory6";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "@/components/PrevBtn";
import NextBtn from "@/components/NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { Event } from "@/model/IEventType";
import NumberCard from "@/components/NumberCard";
import { useTranslation } from "react-i18next";
import { IWishListEvent } from "@/model/IWishListEvent";

export interface SectionSliderProps {
  customClass?: string;
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?:
    | "lastChance"
    | "hotOnes"
    | "top10"
    | "specials"
  itemPerRow?: number;
  sliderStyle?: "style1" | "style2";
  tag?: "count" | "discount";
  eventList?: Event[];
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const SectionSlider: FC<SectionSliderProps> = ({
  customClass = "",
  className = "",
  itemClassName = "",
  heading = "",
  subHeading = "",
  categories = [],
  categoryCardType = "card3",
  itemPerRow = 5,
  sliderStyle = "style1",
  eventList = [],
  tag,
  wishListEvents,
  refetchWishList,
  user,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItem] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const windowWidth = useWindowSize().width;
  
  useEffect(() => {
    if (windowWidth < 576) {
      return setNumberOfItem(1);
    }
    if (windowWidth < 768) {
      return setNumberOfItem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfItem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfItem(itemPerRow - 1);
    }

    setNumberOfItem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < eventList?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });
  const handleImageHeight = (height: number) => setImageHeight(height);
  const { t } = useTranslation();
  useEffect(() => {}, [imageHeight]);
  const renderCard = (item: Event, index: number) => {
    switch (categoryCardType) {
      case "lastChance":
        return (
          <LastChance
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
            className={customClass}
          />
        );
      case "hotOnes":
        return (
          <HotOnes
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
            className={customClass}
          />
        );
      case "top10":
        return (
          <Top10
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
            className={customClass}
          />
        );
      case "specials":
        return (
          <Specials
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
            className={customClass}
          />
        );
    }
  };

  if (!numberOfItems) return null;
  return (
    <>
      {categoryCardType === "card7" ? (
        <>
          <div className={`nc-SectionSlider p-8 ${className}`}>
            {heading !== "" && (
              <Heading desc={t(subHeading)} isCenter={sliderStyle === "style2"}>
                {t(heading)}
              </Heading>
            )}

            <MotionConfig
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className={`relative flow-root`} {...handlers}>
                <div className={`flow-root overflow-hidden rounded-xl`}>
                  <motion.ul
                    initial={false}
                    className="relative whitespace-nowrap -mx-2 xl:-mx-4"
                  >
                    <AnimatePresence initial={false} custom={direction}>
                      {eventList &&
                        eventList.length > 0 &&
                        eventList!.map((item, indx) => (
                          <motion.li
                            className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                            custom={direction}
                            initial={{
                              x: `${(currentIndex - 1) * -100}%`,
                            }}
                            animate={{
                              x: `${currentIndex * -100}%`,
                            }}
                            variants={variants(200, 1)}
                            key={indx}
                            style={{
                              width: `calc(1/${numberOfItems} * 100%)`,
                            }}
                          >
                            {renderCard(item, indx)}
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </motion.ul>
                </div>

                {currentIndex ? (
                  <PrevBtn
                    style={{
                      transform: `${
                        windowWidth < 600
                          ? "translate(-10%, -50%)"
                          : windowWidth < 1000
                          ? "translate(-80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(-80%, -50%)"
                          : "translate(-80%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex - 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute xl:-left-6 -left-3  z-[1]"
                  />
                ) : null}

                {eventList.length > currentIndex + numberOfItems ? (
                  <NextBtn
                    style={{
                      transform: `${
                        windowWidth < 600
                          ? "translate(10%, -50%)"
                          : windowWidth < 1000
                          ? "translate(80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(80%, -50%)"
                          : "translate(80%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex + 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute  xl:-right-6 -right-3 z-[1]"
                  />
                ) : null}
              </div>
            </MotionConfig>
          </div>
        </>
      ) : categoryCardType === "numbercard" ? (
        <>
          <div
            className={`nc-SectionSlider relative group ${className}`}
          >
            {heading !== "" && (
              <Heading desc={t(subHeading)} isCenter={sliderStyle === "style2"}>
                {t(heading)}
              </Heading>
            )}

            <MotionConfig
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="relative flow-root" {...handlers}>
                <div className="flow-root rounded-xl">
                  <motion.ul
                    // ref={topEventsRef}
                    initial={false}
                    className="relative whitespace-nowrap -mx-2 xl:-mx-4 -ml-6 xl:-ml-36"
                  >
                    <AnimatePresence initial={false} custom={direction}>
                      {eventList &&
                        eventList.length > 0 &&
                        eventList!.map((item, indx) => (
                          // mr-10 sm:mr-14
                          <motion.li
                            className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                            custom={direction}
                            initial={{
                              x: `${(currentIndex - 1) * -100}%`,
                            }}
                            animate={{
                              x: `${currentIndex * -100}%`,
                            }}
                            variants={variants(200, 1)}
                            key={indx}
                            style={{
                              width: `calc(1/${numberOfItems} * 100%)`,
                            }}
                          >
                            {renderCard(item, indx)}
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </motion.ul>
                </div>

                {currentIndex ? (
                  <PrevBtn
                    style={{
                      transform: `${
                        windowWidth < 600
                          ? "translate(5%, -50%)"
                          : windowWidth < 1000
                          ? "translate(-80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(-80%, -50%)"
                          : "translate(-5%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex - 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute xl:-left-6 -left-3  z-[1]"
                  />
                ) : null}

                {(eventList.length > currentIndex + numberOfItems) && 
                  (windowWidth < 1984) ? (
                  <NextBtn
                    style={{
                      transform: `${
                        windowWidth < 768
                          ? "translate(-5%, -50%)"
                          : windowWidth < 1024
                          ? "translate(80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(80%, -50%)"
                          : "translate(-20%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex + 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute xl:-right-6 -right-3 z-[1]"
                  />
                ) : null}
              </div>
            </MotionConfig>
          </div>
        </>
      ) : (
        <>
          <div className={`nc-SectionSlider ${className}`}>
            {heading !== "" && (
              <Heading desc={t(subHeading)} isCenter={sliderStyle === "style2"}>
                {t(heading)}
              </Heading>
            )}

            <MotionConfig
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className={`relative flow-root`} {...handlers}>
                <div className={`flow-root overflow-hidden rounded-xl`}>
                  <motion.ul
                    initial={false}
                    className="relative whitespace-nowrap -mx-2 xl:-mx-4"
                  >
                    <AnimatePresence initial={false} custom={direction}>
                      {eventList &&
                        eventList.length > 0 &&
                        eventList!.map((item, indx) => (
                          <motion.li
                            className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                            custom={direction}
                            initial={{
                              x: `${(currentIndex - 1) * -100}%`,
                            }}
                            animate={{
                              x: `${currentIndex * -100}%`,
                            }}
                            variants={variants(200, 1)}
                            key={indx}
                            style={{
                              width: `calc(1/${numberOfItems} * 100%)`,
                            }}
                          >
                            {renderCard(item, indx)}
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </motion.ul>
                </div>

                {currentIndex ? (
                  <PrevBtn
                    style={{
                      transform: `${
                        windowWidth < 600
                          ? "translate(-10%, -50%)"
                          : windowWidth < 1000
                          ? "translate(-80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(-80%, -50%)"
                          : "translate(-80%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex - 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute xl:-left-6 -left-3  z-[1]"
                  />
                ) : null}

                {eventList.length > currentIndex + numberOfItems ? (
                  <NextBtn
                    style={{
                      transform: `${
                        windowWidth < 600
                          ? "translate(10%, -50%)"
                          : windowWidth < 1000
                          ? "translate(80%, -50%)"
                          : windowWidth < 1280
                          ? "translate(80%, -50%)"
                          : "translate(80%, -50%)"
                      }`,
                      top: `calc(${imageHeight / 2}px)`,
                    }}
                    onClick={() => changeItemId(currentIndex + 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute  xl:-right-6 -right-3 z-[1]"
                  />
                ) : null}
              </div>
            </MotionConfig>
          </div>
        </>
      )}
    </>
  );
};

export default SectionSlider;
