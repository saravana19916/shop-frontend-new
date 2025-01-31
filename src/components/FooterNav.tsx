"use client";

import {
  HomeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { EventTypes, IEventType, Data, Event } from "@/model/IEventType";

import { PathName } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import Input from "@/shared/Input";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const NAV_LOGGED_IN: NavItem[] = [
  {
    name: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    name: "Wishlist",
    link: "/wishlist",
    icon: HeartIcon,
  },
  {
    name: "My Account",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const NAV_LOGGED_OUT: NavItem[] = [
  {
    name: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    name: "Login",
    link: "/login",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = React.createRef<HTMLInputElement>();
  const { push } = useRouter();

  const user: any | undefined | null = AuthService.authUser();
  const NAV_ITEMS = user ? NAV_LOGGED_IN : NAV_LOGGED_OUT;
  const events: Event[] = [];

  const [eventData1, setEventData1] = useState<Data>({
    title: "",
    subtitle: "",
    events: events,
  });
  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchKey = e.target.value;
    const id: Event[] = eventData1.events.filter((x) => {
      return x.event.identifier.toLowerCase().includes(searchKey.toLowerCase());
    });
    if (id.length != 0 && e.target.value != "") {
      push(`/${id[0]?.event?.slugified_identifier}`);
    } else alert("No Event Found!");
    // if (e.key === "Enter") {
    //   const searchKey = e.target.value;
    //   const id: Event[] = eventData1.events.filter((x) => {
    //     return x.event.identifier
    //       .toLowerCase()
    //       .includes(searchKey.toLowerCase());
    //   });
    //   if (id.length != 0) redirect(`/event-detail/${id[0]?.event?.id}`);
    //   else alert("No Event Found!");
    // }
  };
  const pathname = usePathname();
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const user: any | undefined | null = AuthService.authUser();
    if (user != null) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, [user]);

  const handleEvent = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    // if (typeof window === "undefined" || window?.innerWidth >= 768) {
    //   return null;
    // }

    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: NavItem, index: number) => {
    if (!isLogin && item.name === "Account") {
      return;
    }
    const isActive = pathname === item.link;

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? "text-red-600" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <>
        <div
          key={index}
          className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
            isActive ? "text-neutral-900 dark:text-neutral-100" : ""
          }`}
        >
          <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
          <span className="text-[11px] leading-none mt-1">{item.name}</span>
        </div>
      </>
    );
  };
  const router = useRouter();
  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    AuthService.logout().then(
      (res) => {
        setIslogin(false);
        router.push("/login");
      },
      (error) => {
        setIslogin(false);
        router.push("/login");
      }
    );
  };
  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV_ITEMS.map((item, index) => renderItem(item, index))}
        {/* {isLogin && (
          <div className="flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ">
            <button
              className="focus:outline-none flex items-center justify-center flex-col"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className="text-[11px] leading-none mt-1">Logout</span>
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FooterNav;
