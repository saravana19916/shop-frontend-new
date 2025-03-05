import React, { FC } from "react";
import Heading from "@/shared/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "4 million",
    subHeading:
      "Tickets across the region across all entertainment events in sectors of sports, music, family entertainment, social projects, and many more…",
  },
  {
    id: "2",
    heading: "5000",
    subHeading: "events across our regional and global operations, the majority of which being bespoke projects across the entertainment and sports industry.",
  },
  {
    id: "3",
    heading: "300 million",
    subHeading:
      "TixBox has a strong reach in the region and through direct and third-party promotional tools.",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc="TixBox redefines the ticketing experience by merging cutting-edge design
with top-tier e-commerce services."
      >
        🚀 Quick Records
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
