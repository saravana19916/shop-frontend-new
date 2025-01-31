"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import CardCategory1 from "@/components/CardCategory1";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import CardCategory6 from "@/components/CardCategory6";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { IEventType, Event, Data } from "@/model/IEventType";
import NumberCard from "./NumberCard";
import { useTranslation } from "react-i18next";
import { IWishListEvent } from "@/model/IWishListEvent";
import wishlistServices from "@/services/wishlist.services";
import CardCategory7 from "./CardCategory7";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?:
    | "card1"
    | "card3"
    | "card4"
    | "card5"
    | "card6"
    | "card7"
    | "numbercard";
  itemPerRow?: number;
  sliderStyle?: "style1" | "style2";
  tag?: "count" | "discount";
  eventList?: Event[];
  wishListEvents?: IWishListEvent[];
  refetchWishList?: () => void;
  user?: any;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
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
      case "card1":
        return (
          <CardCategory3
            event={item}
            imgHeight={handleImageHeight}
            wishListEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "card3":
        return (
          <CardCategory3
            event={item}
            imgHeight={handleImageHeight}
            wishListEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "card4":
        return (
          <CardCategory4
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "card7":
        return (
          <CardCategory7
            event={item}
            index={index}
            tag={tag}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "card5":
        return (
          <CardCategory5
            event={item}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "card6":
        return (
          <CardCategory6
            event={item}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
      case "numbercard":
        return (
          <NumberCard
            event={item}
            index={index}
            imgHeight={handleImageHeight}
            wishlistEvents={wishListEvents}
            user={user}
          />
        );
      default:
        return (
          <CardCategory3
            event={item}
            imgHeight={handleImageHeight}
            wishListEvents={wishListEvents}
            refetchWishList={refetchWishList}
            user={user}
          />
        );
    }
  };

  if (!numberOfItems) return null;
  return (
    <>
      {categoryCardType === "card7" ? (
        <>
          <div className={`nc-SectionSliderNewCategories ${className}`}>
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
            className={`nc-SectionSliderNewCategories relative group ${className}`}
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
          <div className={`nc-SectionSliderNewCategories ${className}`}>
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

export default SectionSliderNewCategories;
