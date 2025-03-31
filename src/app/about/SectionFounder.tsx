import Heading from "@/shared/Heading";
import Image, { StaticImageData } from "next/image";
import avatar1 from "@/images/avatars/profile-avatar.png";
import avatar3 from "@/images/avatars/profile-avatar-3.png";
import avatar4 from "@/images/avatars/profile-avatar-4.png";
import avatar2 from "@/images/avatars/profile-avatar-2.png";
import React from "react";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string | StaticImageData;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: "User-friendly",
    job: "Navigate with ease throught our fun, user-freindly interface",
    avatar: avatar1,
  },
  {
    id: "4",
    name: `Safe & Sound`,
    job: "Your transactions are always secure with us",
    avatar: avatar3,
  },
  {
    id: "3",
    name: `Friendly Support`,
    job: "We're here whenever you need a hand",
    avatar: avatar2,
  },
  {
    id: "2",
    name: `Insights on Demand`,
    job: "Get real-time reports and stay on top of your events",
    avatar: avatar4,
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading desc="TixBox redefines the ticketing experience by merging cutting-edge design with top-tier e-commerce services. Launched in 2013, we focus on providing a seamless and secure platform for purchasing event tickets.">
        ⛱ Our Core Straights
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <div className="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden">
              <Image
                fill
                className=" object-cover"
                src={item.avatar}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
              />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="mt-2 block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
