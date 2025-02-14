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
  { name: "facebook", icon: "lab la-facebook-square", href: "https://www.facebook.com/TixboxMENA" },
  { name: "twitter", icon: "lab la-twitter", href: "https://twitter.com/TixBox" },
  { name: "youtube", icon: "lab la-youtube", href: "https://www.youtube.com/user/tixboxofficial" },
  { name: "instagram", icon: "lab la-instagram", href: "https://instagram.com/tixbox" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5", socialName = true }) => {
  const { t } = useTranslation();

  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <i className={item.icon}></i>
        {socialName && (
          <span className="hidden lg:block text-sm">{t(item.name)}</span>
        )}
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
