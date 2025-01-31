"use client";
import React, { useEffect, useState } from "react";

import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import HomeService from "@/services/home.services";
import EventList from "./EventList";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import { IWishListEvent } from "@/model/IWishListEvent";
import WishlistService from "@/services/wishlist.services";
import AuthService from "@/services/auth.service";
import Banner from "./Banner";

function PageHome() {
  const events: Event[] = [];
  const user: any | undefined | null = AuthService.authUser();

  const [lastChance, setLastChange] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [hotOnes, setHotOnes] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [top10, setTop10] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [specials, setSpecials] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [everything, seteverything] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });

  const [wishlist, setWishList] = useState<IWishListEvent[]>([]);

  useEffect(() => {
    document.title = "TixBox-Book Now-Events in Dubai, Qatar";
    fetchEventData();
    _getWishList();
  }, []);
  const fetchEventData = () => {
    HomeService.getEventsForType(EventTypes[0]).then(
      (data) => {
        console.log("home data", data.data);
        let lastChanceData = {
          title: 'Last chance',
          subtitle: 'this is your last chance to get these tickets, you better seize it.',
          events: data.data.events
        }
        setLastChange(lastChanceData);

        let hotOnesData = {
          title: 'Hot Ones',
          subtitle: "let's make sizzling hot memories",
          events: data.data.events
        }
        setHotOnes(hotOnesData);

        let top10Data = {
          title: 'Top 10',
          subtitle: "the most popular events around you",
          events: data.data.events
        }
        setTop10(top10Data);

        let specialsData = {
          title: 'The Specials',
          subtitle: "check out special offers and promotions",
          events: data.data.events
        }
        setSpecials(specialsData);

        let everythingData = {
          title: 'everything',
          subtitle: "check out all the exciting events.",
          events: data.data.events
        }
        seteverything(everythingData);
      },
      (error) => {
        console.log(error);
      }
    );
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
        <Banner className="" />
      </div>

      {lastChance && (
        <EventList
          user={user}
          data={lastChance}
          categoryCardType="lastChance"
          itemPerRow={3}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {hotOnes && (
        <EventList
          user={user}
          data={hotOnes}
          categoryCardType="hotOnes"
          itemPerRow={3}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {top10 && (
        <EventList
          user={user}
          data={top10}
          categoryCardType="top10"
          itemPerRow={3}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

     {specials && (
        <EventList
          user={user}
          data={specials}
          categoryCardType="specials"
          itemPerRow={3}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      {everything && (
        <EventList
          user={user}
          data={everything}
          categoryCardType="everything"
          itemPerRow={4}
          sliderStyle="style2"
          wishListEvents={wishlist}
          refetchWishList={_getWishList}
        />
      )}

      <div className="container relative mb-24 mt-28 pt-12 ">
        <SectionSubscribe2 />
      </div>

      
    </main>
  );
}

export default PageHome;
