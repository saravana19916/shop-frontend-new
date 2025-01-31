"use client";

import React from "react";
import { navItemList } from "./NavItemList";
import DropdownTravelers from "./DropDownTravelersForMobileNav";

const MobileNavItems = () => {
  return (
    <>
      {navItemList?.map((l) => (
        <>
          <DropdownTravelers title={l.nav} menuItems={l.items} />
        </>
      ))}
    </>
  );
};

export default MobileNavItems;
