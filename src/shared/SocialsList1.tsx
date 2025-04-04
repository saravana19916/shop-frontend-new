import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export interface SocialsList1Props {
  className?: string;
  socialName?: boolean;
}

/*const socials: SocialType[] = [
  { name: "Facebook", icon: "lab la-facebook-square", href: "https://www.facebook.com/TixboxMENA" },
  { name: "Twitter", icon: "lab la-twitter", href: "https://twitter.com/TixBox" },
  { name: "Youtube", icon: "lab la-youtube", href: "http://www.youtube.com/user/tixboxofficial" },
  { name: "Instagram", icon: "lab la-instagram", href: "https://instagram.com/tixbox" },
  { name: "LinkedIn", icon: "lab la-linkedin-in", href: "https://www.linkedin.com/company/tixbox" }
];*/

const socials: SocialType[] = [
  {
    name: "facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/TixboxMENA",
  },
  // {
  //   name: "twitter",
  //   icon: "la la-twitter-square",
  //   href: "https://twitter.com/TixBox",
  // },
  {
    name: "youtube",
    icon: "lab la-youtube",
    href: "https://www.youtube.com/user/tixboxofficial",
  },
  {
    name: "instagram",
    icon: "lab la-instagram",
    href: "https://instagram.com/tixbox",
  },
];

const SocialsList1: FC<SocialsList1Props> = ({
  className = "space-y-2.5",
  socialName = true,
}) => {
  const { t } = useTranslation();

  const renderItem = (item: SocialType, index: number) => {
    return (
      <>
        <a
          href={item.href}
          target="_blank"
          className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
          key={index}
        >
          <i className={item.icon}></i>
          {socialName && (
            <span className="hidden lg:block text-sm">{t(item.name)}</span>
          )}
        </a>
      </>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
      <a
        style={{
          borderRadius: "5px",
        }}
        href="https://twitter.com/TixBox"
        target="_blank"
        className="flex items-center text-2xl text-neutral-700 hover:text-black border border-1 border-neutral-700 dark:border-neutral-400 dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
      >
        <svg
          style={{ padding: "2px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="14px"
          height="14px"
          className="fill-black dark:fill-white"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>

      </a>
    </div>
  );
};

export default SocialsList1;
