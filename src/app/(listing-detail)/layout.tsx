"use client";

import BackgroundSection from "@/components/BackgroundSection";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import { imageGallery as listingStayImageGallery } from "./listing-stay-detail/constant";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { imageGallery as listingExperienceImageGallery } from "./listing-experiences-detail/constant";
import { Route } from "next";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";
import HomeService from "@/services/home.services";
import eventDetailServices from "@/services/event-detail.services";
import { IEventData, IEventDetails } from "@/model/IEventDetail";

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");
  const id = searchParams?.get("id");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const events: Event[] = [];
  const [eventData3, setEventData3] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const event: IEventData = {
    id: 0,
    identifier: "",
    slugified_identifier: "",
    facebook: "",
    twitter: "",
    age_policy: "",
    has_promotion_code: 0,
    email_mandatory: 0,
    publish_status: "",
    type: "",
    active: 0,
    free: 0,
    hidden: 0,
    use_dtcm: 0,
    added_date: undefined,
    updated_date: undefined,
    venue_id: 0,
    promoter_id: 0,
    country_id: 0,
    city_id: 0,
    template_id: 0,
    has_custom_gac: 0,
    google_analytics_code: "",
    ticket_template: "",
    has_custom_fbc: 0,
    facebook_code: "",
    has_custom_purchase: 0,
    purchase_code: "",
    purchase_disable_for_mobile: 0,
    start_date: undefined,
    end_date: undefined,
    use_paypal: 0,
    trailer: "",
    show_duration: "",
    reference_key: null,
    has_custom_confirmation: 0,
    confirmation_code: "",
    paypal_discount_value: null,
    vat: 0,
    insured: 0,
    third_party_buy_url: "",
    promotion_by_card: 0,
    insurance_value: null,
    insurance_percentage: 0,
    test_rajesh: null,
    enable_external_purchase: 0,
    external_purchase_url: null,
    display_date: "",
    detail: undefined,
    performances: [],
    eventrules: [],
    venue: undefined,
    promoter: undefined,
    galleries: [],
  };

  const [eventDetail, setEventDetail] = useState<IEventDetails>({
    message: "",
    data: event,
    success: false,
    id: "",
  });

  useEffect(() => {
    HomeService.getEventsForType(EventTypes[2]).then(
      (data) => {
        setEventData3(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    if (id && id !== null && id != "") {
      eventDetailServices.getEventDetail(Number(id)).then(
        (res) => {
          setEventDetail(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  const getImageGalleryListing = (eventData: Data) => {
    // console.log('test 1');
    if (
      thisPathname?.includes("/listing-stay-detail") ||
      thisPathname?.includes("/event-detail")
    ) {
      return listingStayImageGallery;
    }
    if (thisPathname?.includes("/listing-car-detail")) {
      return listingCarImageGallery;
    }
    if (thisPathname?.includes("/listing-experiences-detail")) {
      return listingExperienceImageGallery;
    }

    return [];
  };
  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing(eventData3)}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Highly recommended"
            subHeading="Here are some events you might also like to experience"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            eventList={
              eventData3 && eventData3?.events ? eventData3?.events : undefined
            }
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
