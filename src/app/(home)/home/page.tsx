"use client";
import React, { useEffect, useState } from "react";

import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CardCategory6 from "@/components/CardCategory6";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import CardCategory1 from "@/components/CardCategory1";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import CardAuthorBox from "@/components/CardAuthorBox";
import CardAuthorBox2 from "@/components/CardAuthorBox2";
import Collection from "@/components/Collection";
import CardCategoryBox1 from "@/components/CardCategoryBox1";
import CategoryBadgeList from "@/components/CategoryBadgeList";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import HomeService from "@/services/home.services";
import EventListSection from "../../../components/EventListSection";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import { IWishListEvent } from "@/model/IWishListEvent";
import WishlistService from "@/services/wishlist.services";
import AuthService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeEvents } from "@/queries/eventsList.query";

function PageHome() {
  const events: Event[] = [];
  const user: any | undefined | null = AuthService.authUser();

  const [eventData1, setEventData1] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData2, setEventData2] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData3, setEventData3] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData4, setEventData4] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData5, setEventData5] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [eventData6, setEventData6] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData7, setEventData7] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData8, setEventData8] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData9, setEventData9] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData10, setEventData10] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [eventData11, setEventData11] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData12, setEventData12] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData13, setEventData13] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData14, setEventData14] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const [eventData15, setEventData15] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [eventData16, setEventData16] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [wishlist, setWishList] = useState<IWishListEvent[]>([]);

  useEffect(() => {
    document.title = "TixBox-Book Now-Events in Dubai, Qatar";
    _getWishList();
  }, []);
  const eventQueries = EventTypes.map((type, index) =>
    useQuery({
      queryKey: [type],
      queryFn: () => fetchHomeEvents(type),
    })
  );

  useEffect(() => {
    eventQueries.forEach((query, index) => {
      if (query.data) {
        const setEventData = [
          setEventData1,
          setEventData2,
          setEventData3,
          setEventData4,
          setEventData5,
          setEventData6,
          setEventData7,
          setEventData8,
          setEventData9,
          setEventData10,
          setEventData11,
          setEventData12,
          setEventData13,
          setEventData14,
          setEventData15,
          setEventData16,
        ];
        setEventData[index](query?.data?.data);
      }
    });
  }, [eventQueries]);
  const setScroll = () => {
    const hash = localStorage.getItem("hash");
    const scrollDiv = document.getElementById(hash);
    scrollDiv?.scrollIntoView({ behavior: "smooth" });
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("hash");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setScroll();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [eventData1]);

  const fetchEventData = () => {
    HomeService.getEventsForType(EventTypes[1]).then(
      (data) => {
        setEventData2(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[2]).then(
      (data) => {
        setEventData3(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[3]).then(
      (data) => {
        setEventData4(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[4]).then(
      (data) => {
        setEventData5(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[5]).then(
      (data) => {
        setEventData6(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[6]).then(
      (data) => {
        setEventData7(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[7]).then(
      (data) => {
        setEventData8(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[8]).then(
      (data) => {
        setEventData9(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[9]).then(
      (data) => {
        setEventData10(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[10]).then(
      (data) => {
        setEventData11(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[11]).then(
      (data) => {
        setEventData12(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[12]).then(
      (data) => {
        setEventData13(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[13]).then(
      (data) => {
        setEventData14(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[14]).then(
      (data) => {
        setEventData15(data.data);
      },
      (error) => {
        console.log(error);
      }
    );

    HomeService.getEventsForType(EventTypes[15]).then(
      (data) => {
        setEventData16(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    setScroll();
  };
  const _getWishList = async () => {
    try {
      const getMyWishlist = await WishlistService.getMyWishlist();
      if (
        (getMyWishlist?.status === 200 || getMyWishlist?.status === 201) &&
        Array.isArray(getMyWishlist?.data)
      ) {
        const eventDetails: IWishListEvent[] = getMyWishlist.data;
        setWishList(eventDetails);
      } else {
        setWishList([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      setWishList([]);
    }
  };
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container px-4 mb-16 ">
        <SectionHero3 className="" />
      </div>

      {eventData1 && (
        <EventListSection
          user={user}
          data={eventData1}
          categoryCardType="card7"
          itemPerRow={3}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData2 && (
        <EventListSection
          user={user}
          data={eventData2}
          categoryCardType="numbercard"
          itemPerRow={4}
          tag="count"
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData3 && (
        <EventListSection
          user={user}
          data={eventData3}
          categoryCardType="card4"
          itemPerRow={4}
          tag="discount"
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData4 && (
        <EventListSection
          user={user}
          data={eventData4}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData5 && (
        <EventListSection
          user={user}
          data={eventData5}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData6 && (
        <EventListSection
          user={user}
          data={eventData6}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData7 && (
        <EventListSection
          user={user}
          data={eventData7}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData8 && (
        <EventListSection
          user={user}
          data={eventData8}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData9 && (
        <EventListSection
          user={user}
          data={eventData9}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData10 && (
        <EventListSection
          user={user}
          data={eventData10}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData11 && (
        <EventListSection
          user={user}
          data={eventData11}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData12 && (
        <EventListSection
          user={user}
          data={eventData12}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData13 && (
        <EventListSection
          user={user}
          data={eventData13}
          categoryCardType="card4"
          itemPerRow={5}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {eventData14 && (
        <EventListSection
          user={user}
          data={eventData14}
          categoryCardType="card4"
          itemPerRow={5}
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
          sliderStyle="style2"
        />
      )}

      {eventData15 && (
        <EventListSection
          user={user}
          data={eventData15}
          categoryCardType="card4"
          itemPerRow={5}
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
          sliderStyle="style2"
        />
      )}

      {eventData16 && (
        <EventListSection
          user={user}
          data={eventData16}
          categoryCardType="card4"
          itemPerRow={5}
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
          sliderStyle="style2"
        />
      )}
      <div className="container relative mb-24 mt-28 pt-12 ">
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome;
