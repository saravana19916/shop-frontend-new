import React, { FC } from "react";
import Heading from "@/shared/Heading";
import { CheckCircle, CalendarSearch, Ticket } from "lucide-react";
import Image from "next/image";
import stepsImg from "@/images/steps.jpg";

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

const STEPS: Step[] = [
  {
    id: "1",
    title: "Search for an event",
    description:
      "You can now search simply for your event by entering name, date or location into the search area or scrolling through the events list on the homepage.",
    icon: <CalendarSearch className="w-12 h-12 text-red-500" />,
  },
  {
    id: "2",
    title: "Select your seat",
    description:
      "Our seat selection process has become much easier and more user-friendly. Select your seat using any device such as smartphones, iPads, laptops, or desktop computers.",
    icon: <CheckCircle className="w-12 h-12 text-red-500" />,
  },
  {
    id: "3",
    title: "Get your ticket",
    description:
      "Receiving your ticket is now simpler. Get it via email, SMS, or smartphone-selected apps such as iPhone Wallet apps.",
    icon: <Ticket className="w-12 h-12 text-red-500" />,
  },
];

export interface SectionStepsProps {
  className?: string;
}

const SectionSteps: FC<SectionStepsProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionSteps relative ${className}`}>
      <Heading desc="Keep calm & travel on" isCenter>It's easy</Heading>

      {/* Image added properly */}
      <div className="flex justify-center my-8">
        <Image src={stepsImg} alt="Steps Illustration" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 xl:gap-8 mt-8">
        {STEPS.map((step) => (
          <div key={step.id} className="p-6 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200">
              {step.title}
            </h3>
            <p className="text-sm text-neutral-500 mt-2 dark:text-neutral-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSteps;
