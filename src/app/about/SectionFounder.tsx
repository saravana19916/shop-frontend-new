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
    name: "Lorem Ipsum",
    job: "Co-founder and Chief Executive",
    avatar: avatar1,
  },
  {
    id: "4",
    name: `Lorem Ipsum`,
    job: "Co-founder and Chief Executive",
    avatar: avatar3,
  },
  {
    id: "3",
    name: `Lorem Ipsum`,
    job: "Co-founder, Chairman",
    avatar: avatar2,
  },
  {
    id: "2",
    name: `Lorem Ipsum`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar: avatar4,
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ Founder
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
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
