"use client";
import React, { FC } from "react";
import Image1 from "@/images/avatars/Image-1.png";
import Image2 from "@/images/avatars/Image-2.png";
import Image3 from "@/images/avatars/Image-3.png";
import Image4 from "@/images/avatars/Image-4.png";
import Image5 from "@/images/avatars/Image-5.png";
import Image6 from "@/images/avatars/Image-6.png";
import Image7 from "@/images/avatars/Image-7.png";
import Image8 from "@/images/avatars/Image-8.png";
import DefaultAvatar from "@/images/avatars/default-avatar.png";
import Image from "next/image";
import ButtonCircle from "@/shared/ButtonCircle";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import {
  PaperClipIcon,
  MicrophoneIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { CheckAll } from "react-bootstrap-icons";

export interface PageChatProps {}

interface onlineuser {
  id: number;
  src1: any;
  heading: string;
  color: string;
}

const PageChat: FC<PageChatProps> = () => {
  const onlineusers: onlineuser[] = [
    { id: 1, src1: Image1, heading: "Ariana", color: "blue" },
    { id: 2, src1: Image2, heading: "Monino", color: "red" },
    { id: 3, src1: Image3, heading: "Reynante", color: "green" },
    { id: 4, src1: Image4, heading: "Labares", color: "yellow" },
    { id: 5, src1: Image5, heading: "Rolando", color: "blue" },
    { id: 6, src1: Image6, heading: "Paloso", color: "red" },
    { id: 7, src1: Image7, heading: "Maricel", color: "green" },
    { id: 8, src1: Image8, heading: "Villalon", color: "yellow" },
  ];

  return (
    <div className="nc-PageChat container pb-24 lg:pb-32">
      <header className="text-start mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Chat
        </h2>
      </header>

      <section className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
        <div className="flex flex-col xl:flex-row gap-6 py-4">
          {/* Left Panel */}
          <div className="w-full xl:w-1/3">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700">
                <p className="text-sm dark:text-gray-400 font-semibold">
                  Messages
                </p>
              </div>

              <div className="p-4 border-b dark:border-gray-700">
                <form className="relative max-w-sm">
                  <Input
                    required
                    aria-required
                    placeholder="Search..."
                    type="text"
                    rounded="rounded-full"
                    sizeClass="h-12 px-5 py-3"
                  />
                  <ButtonCircle
                    type="submit"
                    className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
                    size="w-10 h-10"
                  >
                    <i className="las la-search text-xl"></i>
                  </ButtonCircle>
                </form>
              </div>

              <div className="p-4 space-y-4 overflow-x-auto">
                <p className="text-sm dark:text-gray-400 font-semibold">
                  Online
                </p>
                <div className="flex space-x-2">
                  {onlineusers.map((user) => (
                    <div key={user.id} className="relative">
                      <Image
                        src={user.src1}
                        alt="user"
                        className="w-13 h-10 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 bg-${user.color}-500 border-2 border-white dark:border-gray-800 rounded-full`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto h-[600px]">
                <div>
                  <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    ACTIVE CHATS
                  </p>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Image
                        src={DefaultAvatar}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="user"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-white">
                          <span>Username</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            10 min
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last message preview...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    All CHATS
                  </p>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Image
                        src={DefaultAvatar}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="user"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-white">
                          <span>Username</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            10 min
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last message preview...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full xl:w-2/3">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] h-full flex flex-col justify-between">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-semibold text-gray-800 dark:text-white">
                      Saul Goodmate
                    </h6>
                    <div className="flex items-center gap-1">
                      <span className="block w-3 h-3 bg-[#09ad95] border-2 border-white dark:border-gray-800 rounded-full" />
                      <small className="text-gray-500 dark:text-gray-400">
                        Online
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="overflow-y-auto p-4 space-y-6 h-[40rem]">
                <div className="text-center text-xs text-[#ed003b] font-medium">
                  2 days ago
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center justify-end text-[12px] gap-1">
                      <CheckAll size={16} color="green" />
                      9:30 am <span className="font-bold">You</span>
                    </span>
                    <p className="bg-[rgba(255,0,62,0.2)] dark:bg-[rgba(255,0,62,0.4)] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Nulla consequat massa quis enim. Donec pede justo,
                      fringilla vel...
                    </p>
                  </div>
                </div>

                <div className="flex justify-start gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center text-[12px] gap-1">
                      <span className="font-bold">Reynante Labares</span> 9:32
                      am
                    </span>
                    <p className="bg-[#f0f0f5] dark:bg-[#333] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing
                      elit...
                    </p>
                  </div>
                </div>

                {/* Add more chat bubbles as needed */}
                <div className="text-center text-xs text-[#ed003b] font-medium">
                  Yesterday
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center justify-end text-[12px] gap-1">
                      <CheckAll size={16} color="green" />
                      9:30 am <span className="font-bold">You</span>
                    </span>
                    <p className="bg-[rgba(255,0,62,0.2)] dark:bg-[rgba(255,0,62,0.4)] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Nulla consequat massa quis enim. Donec pede justo,
                      fringilla vel...
                    </p>
                  </div>
                </div>

                <div className="flex justify-start gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center justify-start text-[12px] gap-1">
                      <span className="font-bold">Reynante Labares</span> 9:32
                      am
                    </span>
                    <p className="bg-[#f0f0f5] dark:bg-[#333] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor.
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <Image
                    src={DefaultAvatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center justify-end text-[12px] gap-1">
                      <CheckAll size={16} color="green" />
                      9:30 am <span className="font-bold">You</span>
                    </span>
                    <p className="bg-[rgba(255,0,62,0.2)] dark:bg-[rgba(255,0,62,0.4)] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Nulla consequat massa quis enim. Donec pede justo,
                      fringilla vel...
                    </p>
                    <p className="bg-[rgba(255,0,62,0.2)] dark:bg-[rgba(255,0,62,0.4)] text-black dark:text-white text-[13px] px-[15px] py-2.5 rounded">
                      Nulla consequat massa quis enim. Donec pede justo,
                      fringilla vel...
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Footer */}
              <div className="flex items-center gap-2 border-t px-4 py-2 dark:border-gray-700">
                <button className="p-3 rounded text-[#e0a01b] bg-[#f8e8c6] dark:bg-[#4a3a1e]">
                  <FaceSmileIcon className="w-5 h-5" />
                </button>

                <Input
                  placeholder="Type your message..."
                  type="text"
                  rounded="rounded-full"
                  sizeClass="h-12 px-5 py-3"
                />

                <button className="p-3 rounded text-[#ff003e] bg-[#ff003e33] dark:bg-[#4d1c25]">
                  <PaperClipIcon className="w-5 h-5" />
                </button>

                <button className="p-3 rounded text-[#13bfa6] bg-[#b2fff3] dark:bg-[#1f4741]">
                  <MicrophoneIcon className="w-5 h-5" />
                </button>

                <ButtonPrimary
                  rounded="rounded-[50px]"
                  className="bg-[#ed003b] font-medium text-sm text-white min-w-[118px] px-6 py-2.5 border-[#ed003b] hover:opacity-90"
                >
                  Send
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageChat;
