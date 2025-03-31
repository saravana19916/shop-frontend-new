"use client";
import React, { useState } from "react";
import Image from "next/image";
import userImage from "@/images/1.jpg";
const notifications = [
  {
    id: 1,
    date: "Today",
    time: "02:31",
    user: "Dennis Trexy",
    initials: "DT",
    message: "2 Members Accepted your Request.",
    avatar: userImage,
    notifyTime: "2 Hrs ago",
  },
  {
    id: 2,
    date: "Yesterday",
    time: "18:47",
    user: "Eileen Dover",
    message: "Created New Template for Designing Department.",
    avatar: null,
    initials: "ED",
    bgColor: "bg-pink-500",
    notifyTime: "18:47",
  },
  {
    id: 3,
    date: "Yesterday",
    time: "06:43",
    user: "Elida Distefa",
    message: "Shipment is Out for Delivery.",
    avatar: userImage,
    notifyTime: "06:43",
    badge: { text: "New Deal", color: "bg-green-500" },
  },
  {
    id: 4,
    date: "23 Oct",
    time: "03:15",
    user: "Harvey Mattos",
    message: "Mentioned you in a post.",
    avatar: userImage,
    notifyTime: "03:15",
  },
  {
    id: 5,
    date: "15 Oct",
    time: "12:14",
    user: "Catrice Doshier",
    message: "2 Members Accepted your Request.",
    avatar: userImage,
    notifyTime: "12:14",
  },
  {
    id: 6,
    date: "30 Sep",
    time: "14:04",
    user: "Mercy Ritia",
    message: "Created New Template for Designing Department.",
    avatar: userImage,
    notifyTime: "14:04",
    badge: { text: "Last Deal", color: "bg-red-500" },
  },
  {
    id: 7,
    date: "18 Sep",
    time: "12:26",
    user: "Mark Jhon",
    message: "Shipment is Out for Delivery.",
    avatar: userImage,
    notifyTime: "12:26",
  },
  {
    id: 8,
    date: "03 Sep",
    time: "05:37",
    user: "Benedict Vallone",
    message: "Thanking you for Accepting Request.",
    avatar: userImage,
    notifyTime: "05:37",
  },
  {
    id: 9,
    date: "28 Aug",
    time: "15:24",
    user: "Paul Johny",
    message: "Invited you to a Group.",
    avatar: userImage,
    notifyTime: "15:24",
  },
  {
    id: 10,
    date: "05 Sep",
    time: "05:40",
    user: "Benedict Vallone",
    message: "Thanking you for Accepting Request.",
    avatar: userImage,
    notifyTime: "05:37",
  },
  {
    id: 11,
    date: "20 Oct",
    time: "15:24",
    user: "Paul Johny",
    message: "Invited you to a Group.",
    avatar: userImage,
    notifyTime: "15:24",
  },
  {
    id: 12,
    date: "03 Nov",
    time: "05:37",
    user: "Benedict Vallone",
    message: "Thanking you for Accepting Request.",
    avatar: userImage,
    notifyTime: "05:37",
  },
  {
    id: 13,
    date: "13 Dec",
    time: "15:24",
    user: "Paul Johny",
    message: "Invited you to a Group.",
    avatar: userImage,
    notifyTime: "15:24",
  },
];

const NotificationList = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [expanded, setExpanded] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 10, notifications.length)
    );
    setExpanded(true);
  };

  const handleLoadLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 5, 5));
    setExpanded(false);
  };

  return (
    <>
      <main className="mx-2 my-2 lg:mx-8 lg:my-12">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-semibold my-16">
            Notification List
          </h2>
          <div className="relative mb-10 p-5 sm:p-0">
            <div className="absolute left-[15%] top-0 bottom-0 w-[3px] bg-red-200 hidden md:block"></div>
            <ul className="space-y-6">
              {notifications.slice(0, visibleCount).map((item) => (
                <li
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  <div className="w-full md:w-[15%] text-left md:text-right pr-4 mt-[17px]">
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <div className="text-lg font-semibold text-gray-700">
                      {item.time}
                    </div>
                  </div>

                  <div className="relative hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-white border-4 border-red-500 hover:border-blue-700 transition-colors duration-200 -ml-2 shadow mt-[30px]">
                    <div className="rounded-full"></div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-[75%] ml-0 md:ml-[50px] relative mt-1">
                    <div className="absolute left-[-12px] top-7 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-gray-300"></div>
                    <div className="absolute left-[-10px] top-7 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[10px] border-r-white"></div>

                    <div className="flex items-center space-x-3">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      ) : (
                        <span
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold ${item.bgColor}`}
                        >
                          {item.initials}
                        </span>
                      )}

                      <div className="flex flex-col md:flex-row justify-between w-full">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.user}
                            {item.badge && (
                              <span
                                className={`ms-3 px-2 pb-0.5 mb-1 text-white text-xs font-semibold rounded ${item.badge.color}`}
                              >
                                {item.badge.text}
                              </span>
                            )}
                          </p>

                          <p className="text-sm text-gray-600">
                            {item.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 md:mt-0">
                          {item.notifyTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mb-10 space-x-4">
            {!expanded && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="w-[118px] px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
              >
                Load More
              </button>
            )}
            {expanded && (
              <button
                type="button"
                onClick={handleLoadLess}
                className="w-[118px] px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
              >
                Load Less
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default NotificationList;
