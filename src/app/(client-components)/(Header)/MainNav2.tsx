import { usePathname, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import SearchDropdown from "./SearchDropdown";
//import ButtonPrimary from "@/shared/ButtonPrimary";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import NavMobile from "@/shared/Navigation/NavMobile";
import LangDropdown from "./LangDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import Link from "next/link";
import { Route } from "@/routers/types";
import DropdownTravelers from "./DropdownTravelers";
import styled from "styled-components";
import {
  dropdownItems1,
  dropdownItems2,
  dropdownItems3,
  dropdownItems4,
  dropdownItems5,
} from "@/data/dropdownitems";
import AuthService from "@/services/auth.service";
import { useTranslation } from "react-i18next";
import { EventTypes, IEventDataSetForSearch } from "@/model/IEventType";
import ReactSearchBox from "react-search-box";
import HomeService from "@/services/home.services";
import NavBarCart from "@/shared/NavBarCart";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export interface MainNav2Props {
  className?: string;
}
const ButtonPrimary = styled.button`
  background-color: rgb(235, 0, 59);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  vertical-align: middle;
`;
const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const pathname = usePathname();
  const dropdownRef = React.useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const langDropdownRef = React.useRef(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const user: any | undefined | null = AuthService.authUser();
  const [eventDataSet, setEventDataSet] = useState<IEventDataSetForSearch[]>(
    []
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      } 

      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  };

  const { t } = useTranslation();

  const { push } = useRouter();

  const _handleSelect = (event: any) => {
    const eventId = event.item.key;
    if (eventId) push(`/${eventId}`);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLangToggleDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  return (
    <div className={`nc-MainNav2 relative z-10 ${className}`}>
      <div className="px-4 lg:container h-20 flex justify-between">
        <div className="flex justify-start space-x-4 sm:space-x-10 lg:space-x-5">
          <Logo className="w-16 self-center" />

          <div className="hidden lg:flex">
            <DropdownTravelers title="tickets" menuItems={dropdownItems1} isOpen={isDropdownOpen}
              onToggle={handleToggleDropdown}
              dropdownRef={dropdownRef} />
          </div>

          {/* <div className="hidden lg:flex">
            <DropdownTravelers
              title="accommodation"
              menuItems={dropdownItems2}
            />
          </div>
          <div className="hidden lg:flex">
            <DropdownTravelers title="hotels" menuItems={dropdownItems2} />
          </div>
          <div className="hidden lg:flex">
            <DropdownTravelers title="restaurants" menuItems={dropdownItems3} />
          </div>

          <div className="hidden lg:flex">
            <DropdownTravelers title="bars&Clubs" menuItems={dropdownItems4} />
          </div>

          <div className="hidden lg:flex">
            <DropdownTravelers title="addOns" menuItems={dropdownItems5} />
          </div> */}
        </div>
        {/* <div className="hidden md:flex sm:flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 "> */}
        {/* <div className="self-center flex-1">
            <HeroSearchForm2MobileFactory />
          </div> */}
        {/* </div> */}
        <div className="justify-start flex-1 hidden">
          <div className="mt-5 text-neutral-700 dark:text-neutral-700">
            <ReactSearchBox
              placeholder="Search"
              data={eventDataSet}
              onSelect={(record: any) => {
                _handleSelect(record);
              }}
              onChange={(value) => {}}
              autoFocus
              leftIcon={
                <>
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </>
              }
              iconBoxSize="38px"
              dropdownHoverColor="#F6F5F5"
            />
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex space-x-0.5">
            <SwitchDarkMode />
            {/*<TemplatesDropdown />*/}
            <LangDropdown isOpen={isLangDropdownOpen}
              onToggle={handleLangToggleDropdown}
              dropdownRef={langDropdownRef} />
            <SearchDropdown className="flex items-center" />
            {/* <Link
              href={"/add-listing" as Route<string>}
              className="self-center hidden text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Create a Listing
            </Link> */}
            {pathname === "/login" || pathname === "/signup" ? (
              <></>
            ) : (
              <>
                <NavBarCart user={user} />
              </>
            )}

            {pathname !== "/login" && (
              <>
                {user ? (
                  <>
                    <NotifyDropdown />

                    <AvatarDropdown />
                  </>
                ) : (
                  <>
                    <div className="px-1" />
                    <Link
                      href={"/login" as Route<string>}
                      className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full"
                    >
                      {t("login")}
                    </Link>
                    <div className="px-1" />
                    <a href="/signup" className="self-center">
                      <ButtonPrimary className="w-full py-3 sm:px-4 rounded-full rounded-l-full  rounded-r-full">
                        {t("signUp")}
                      </ButtonPrimary>
                    </a>
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex xl:hidden items-center">
            {user ? (
              <>
                <SwitchDarkMode />

                <NavBarCart user={user} />

                <SearchDropdown className="flex items-center" />
              </>
            ) : (
              <>
                <SwitchDarkMode />

                <NavBarCart user={user} />

                <SearchDropdown className="flex items-center" />

                {pathname !== "/signup" && (
                  <>
                    <Link
                      href={"/signup" as Route<string>}
                      className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 rounded-full"
                    >
                      <ButtonPrimary className="w-full rounded-full rounded-l-full  rounded-r-full">
                        {t("signUp")}
                      </ButtonPrimary>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
