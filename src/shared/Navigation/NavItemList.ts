import {
  IconFour,
  IconOne,
  IconThree,
  IconTwo,
} from "@/components/IconComponent";
import MenuItem from "@/model/MenuItem";

export interface IMobileNavItemList {
  nav: string;
  items: MenuItem[];
}
export const navItemList: IMobileNavItemList[] = [
  {
    nav: "tickets",
    items: [
      {
        name: "events",
        description: "concert",
        href: "/",
        icon: IconOne,
      },
      // {
      //   name: "flights",
      //   description: "(comingSoon)",
      //   href: "/",
      //   icon: IconTwo,
      // },
      // {
      //   name: "bus",
      //   description: "(comingSoon)",
      //   href: "/",
      //   icon: IconThree,
      // },
      // {
      //   name: "metro",
      //   description: "(comingSoon)",
      //   href: "/",
      //   icon: IconFour,
      // },
    ],
  },
  // {
  //   nav: "accommodation",
  //   items: [
  //     {
  //       name: "(comingSoon)",
  //       description: "",
  //       href: "/",
  //       icon: IconOne,
  //     },
  //   ],
  // },
  // {
  //   nav: "hotels",
  //   items: [
  //     {
  //       name: "(comingSoon)",
  //       description: "",
  //       href: "/",
  //       icon: IconOne,
  //     },
  //   ],
  // },
  // {
  //   nav: "restaurants",
  //   items: [
  //     {
  //       name: "(comingSoon)",
  //       description: "",
  //       href: "/",
  //       icon: IconOne,
  //     },
  //   ],
  // },
  // {
  //   nav: "bars&Clubs",
  //   items: [
  //     {
  //       name: "(comingSoon)",
  //       description: "",
  //       href: "/",
  //       icon: IconOne,
  //     },
  //   ],
  // },
  // {
  //   nav: "addOns",
  //   items: [
  //     {
  //       name: "(comingSoon)",
  //       description: "",
  //       href: "/",
  //       icon: IconOne,
  //     },
  //   ],
  // },
];
