"use client";

import React, { useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import SocialsList from "@/shared/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import LangDropdown from "@/app/(client-components)/(Header)/LangDropdown";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Route } from "@/routers/types";
import MobileNavItems from "./MobileNavItems";
import AvatarDropdown from "@/app/(client-components)/(Header)/AvatarDropdown";
import NavMobileAvatarDropdown from "./NavMobileAvatarDropdown";
import { SocialType } from "@/shared/SocialsShare";
export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}
interface IEventMenu {
  name: string;
  href: string;
  id: string;
}
const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const user: any | undefined | null = AuthService.authUser();

  const [socialsData, setSocialsData] = useState<SocialType[]>([]);
  useEffect(() => {
    setSocialsData([
      {
        name: "TIXBOX Facebook",
        icon: "lab la-facebook-square",
        href: 'https://www.facebook.com/TixboxMENA',
      },
      {
        name: "TIXBOX LinkedIn",
        icon: "lab la-linkedin",
        href: 'https://www.linkedin.com/company/tixbox',
      },
      {
        name: "TIXBOX Instagram",
        icon: "lab la-instagram",
        href: 'https://instagram.com/tixbox',
      },
      {
        name: "TIXBOX Twitter",
        icon: "lab la-twitter",
        href: 'https://twitter.com/TixBox',
      },
      {
        name: "TIXBOX YouTube",
        icon: "lab la-youtube",
        href: 'https://www.youtube.com/user/tixboxofficial',
      }
    ]);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const user: any | undefined | null = AuthService.authUser();
    if (user != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);
  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    AuthService.logout().then(
      (res) => {
        setIsLogin(false);
        router.push("/login");
      },
      (error) => {
        setIsLogin(false);
        router.push("/login");
      }
    );
  };
  const eventsMenuList: IEventMenu[] = [
    { name: "Hot Tickets", id: "hotTickets", href: "hot_tickets" },
    { name: "Top events near you", id: "topEvents", href: "top_events" },
    { name: "Catch of the day", id: "catchOfTheDay", href: "catch_of_the_day" },
    {
      name: "Concerts & Festivals",
      id: "concertsFestivals",
      href: "concerts_&_festivals",
    },
    { name: "Sports", href: "sports", id: "sports" },
    { name: "Theatre", href: "theatre", id: "theatre" },
    { name: "Movies", href: "movies", id: "movies" },
    { name: "Arts & Culture", href: "arts_&_culture", id: "artsCulture" },
    {
      name: "Parks & Attractions",
      href: "parks_&_attractions",
      id: "parksAttractions",
    },
    { name: "Experiences", href: "experiences", id: "experiences" },
    { name: "Parties", href: "parties", id: "parties" },
    { name: "Restaurants", href: "restaurants", id: "restaurants" },
    { name: "Bars", href: "bars", id: "bars" },
    {
      name: "Lounges & Nightclubs",
      href: "lounges_&_nightclubs",
      id: "loungesNightclubs",
    },
    {
      name: "Suitable for Kids",
      href: "suitable_for_kids",
      id: "suitableForKids",
    },
    {
      name: "Suitable for Families",
      href: "suitable_for_families",
      id: "suitableForFamilies",
    },
  ];
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };
  const router = useRouter();

  const _handleRedirectEventMenu = (href: string) => {
    if (window.location.pathname !== "/home") {
      router.push("/home");
      localStorage.setItem("hash", href);
    } else {
      const scrollDiv = document.getElementById(href);
      scrollDiv?.scrollIntoView({ behavior: "smooth" });
    }
    onClickClose && onClickClose();
  };
  const _renderEventMenuChild = (item: IEventMenu[]) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item?.map((i, index) => (
          <Disclosure
            key={i.href + index}
            as="li"
            onClick={() => _handleRedirectEventMenu(i.href)}
          >
            <div className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5">
              <span className={`py-2.5 pr-3 block w-full`}>{i.name}</span>
            </div>
          </Disclosure>
        ))}
      </ul>
    );
  };
  const _eventsMenu = () => {
    return (
      <>
        <li className="text-neutral-900 dark:text-white">
          <Link
            href="#"
            className="flex w-full px-4 font-medium uppercase tracking-wide text-sm rounded-lg"
          >
            <span className="py-2.5 pr-3 block w-full">Bookings</span>
          </Link>
          <div>{_renderEventMenuChild(eventsMenuList)}</div>
        </li>
      </>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className=" overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
          TixBox offers a simplified ticketing experience for live events & entertainment lovers locally and internationally.
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" socials={socialsData} />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>

      <div className="flex items-center justify-between py-6 px-2 mb-24">
        {isLogin ? (
          <>
            <span
              className="text-neutral-900 dark:text-white flex w-full px-4 font-medium uppercase tracking-wide text-sm rounded-lg gap-3"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-7" />
              <button
                className="bg-primary-6000 hover:bg-primary-700 text-neutral-50 p-1 rounded px-5"
                type="button"
              >
                Logout
              </button>
            </span>
          </>
        ) : (
          <>
            <a href="/signup" className="self-center px-3">
              <ButtonPrimary className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full">
                signUp
              </ButtonPrimary>
            </a>
          </>
        )}

        {/* {window.location.pathname === "/login" ||
        window.location.pathname === "/loginoptions" ||
        window.location.pathname === "/signup" ? (
          <>
            <span></span>
          </>
        ) : (
          <>
            {isLogin ? (
              <>
                <span
                  className="text-neutral-900 dark:text-white flex w-full px-4 font-medium uppercase tracking-wide text-sm rounded-lg gap-3"
                  onClick={handleLogout}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-7" />
                  <button
                    className="bg-primary-6000 hover:bg-primary-700 text-neutral-50 p-1 rounded px-5"
                    type="button"
                  >
                    Logout
                  </button>
                </span>
              </>
            ) : (
              <></>
            )}
          </>
        )} */}

        <LangDropdown
          className="flex"
          panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 right-3 bottom-full sm:px-0"
        />
      </div>
    </div>
  );
};

export default NavMobile;
