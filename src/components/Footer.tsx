"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import { Link } from "react-router-dom";
import AuthService from "@/services/auth.service";
import { useTranslation } from "react-i18next";

const user: any | undefined | null = AuthService.authUser();
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

/*const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Links",
    menus: [
      { href: "/contact-us", label: "Contact Us" },
      { href: "/services", label: "Our Services" },
      { href: "/sell-ticket-with-us", label: "Sell Your Ticket With Us" },
      { href: "/join-our-team", label: "Join Our Team" },
      { href: "/exchange-refund-guarantee", label: "Exchange / Refund Guarantee" },
    ],
  },
  {
    id: "2",
    title: "Get In Touch",
    menus: [
      { href: "tel:+97142713736", label: "+971 4 271 3736" },
      { href: "mailto:support@tixbox.com", label: "support@tixbox.com" }
    ],
  },
  {
    id: "4",
    title: "TixBox",
    menus: [
      { href: "/about-us", label: "About Us" },
      { href: "/terms-and-conditions", label: "Terms and Conditions" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/faq", label: "FAQ" }
    ],
  },
];*/

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Solutions",
    menus: [
      { href: "#", label: "Marketing" },
      { href: "#", label: "Analytics" },
      { href: "#", label: "Automation" },
      { href: "#", label: "Commerce" },
    ],
  },
  {
    id: "1",
    title: "Support",
    menus: [
      { href: "#", label: "Submit ticket" },
      { href: "#", label: "Documentation" },
      { href: "#", label: "Guides" },
    ],
  },
  {
    id: "2",
    title: "Company",
    menus: [
      { href: "/about", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Jobs" },
      { href: "#", label: "Press" },
    ],
  },
  {
    id: "4",
    title: "Legal",
    menus: [
      { href: "#", label: "Terms of service" },
      { href: "#", label: "Privacy policy" },
      { href: "#", label: "License" },
      { href: "#", label: "Insights" },
    ],
  },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {t(menu.title)}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* <div className="nc-Footer relative py-16 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo className="w-full" />
            </div>
            <p className="text-balance text-sm/6 text-gray-600 dark:text-neutral-400">Making the world a better place through constructing elegant hierarchies.</p>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-6" socialName={false} />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div> */}
      <div className="nc-Footer relative py-16 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <Logo className="w-full" />
              <p className="text-balance text-sm/6 text-gray-600 dark:text-neutral-400">
                Making the world a better place through constructing elegant
                hierarchies.
              </p>
              <SocialsList1
                className="flex items-center gap-x-6"
                socialName={false}
              />
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
              <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-8">
                {widgetMenus.map(renderWidgetMenuItem)}
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo className="w-full" />
            </div>
            <p className="text-balance text-sm/6 text-gray-600 dark:text-neutral-400">Making the world a better place through constructing elegant hierarchies.</p>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-6" socialName={false} />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)} */}
        </div>
      </div>
      <div className="container">
        <div className="py-6 flex border-t border-neutral-200 text-sm/6">
          <span>
            © 2025{" "}
            <a
              href="https://www.tixbox.com"
              className="text-primary-700 hover:underline"
            >
              TixBox
            </a>
            . {t("allRightsReserved")}.
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
