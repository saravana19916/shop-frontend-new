"use client";

import { FC, useState } from "react";
import NotificationDetailsModal, {
  NotificationDetails,
} from "./NotificationDetailsModal";

interface IProps {}

const Notification: FC<IProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalNotificationKey, setModalNotificationKey] = useState("");
  const [visibleNotifications, setVisibleNotifications] = useState({
    notify1: true,
    notify2: true,
    notify3: true,
    notify4: true,
  });

  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({
    notify1: false,
    notify2: false,
    notify3: false,
    notify4: false,
  });

  const handleReadMore = (key: string) => {
    setModalNotificationKey(key);
    setShowModal(true);
    setReadStatus((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const notificationData: NotificationDetails = {
    title: "Notification Details",
    time: "April 5, 2025 - 4:00 PM",
    type: "System Alert",
    status: readStatus[modalNotificationKey] ? "Read" : "Unread",
    receivedAt: "April 5, 2025 3:59 PM",
    message:
      "Warning! Better check yourself, you're not looking too goodWarning! Better check yourself",
  };

  const renderNotification = (
    key: keyof typeof visibleNotifications,
    iconColor: string,
    borderColor: string,
    badgeColor: string
  ) => {
    const isRead = readStatus[key];
    const textColor = isRead
      ? "text-gray-400"
      : "text-gray-900 dark:text-[#dedefd]";
    const iconBackground = isRead ? "bg-gray-200 border" : iconColor;
    const cardBorder = isRead
      ? "border-l-4 border-none"
      : `border-l-4 ${borderColor} dark:border-none`;
    const readMoreColor = isRead
      ? "text-blue-800 dark:text-reddish-600"
      : "text-reddish-600";

    return (
      visibleNotifications[key] && (
        <div className="w-full" key={key}>
          <div
            className={`flex p-4 mb-4 bg-white shadow rounded-lg ${cardBorder} dark:bg-[#2a2a4a] dark:border-inherit dark:shadow-md dark:text-[#dedefd]`}
          >
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBackground}`}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={isRead ? "#6c757d" : "#ffce6d"}
                    d="M18,13.18463V10c0-3.31372-2.68628-6-6-6s-6,2.68628-6,6v3.18463C4.83832,13.59863,4.00146,14.69641,4,16v2c0,0.00037,0,0.00073,0,0.00116C4.00031,18.5531,4.44806,19.00031,5,19h14c0.00037,0,0.00073,0,0.00116,0C19.5531,18.99969,20.00031,18.55194,20,18v-2C19.99854,14.69641,19.16168,13.59863,18,13.18463z"
                  ></path>
                  <path
                    fill={isRead ? "#adb5bd" : "#ffae0c"}
                    d="M8.14233 19c.4472 1.72119 1.99689 2.99817 3.85767 3 1.86078-.00183 3.41046-1.27881 3.85767-3H8.14233zM12 4c.34149 0 .67413.03516 1 .08997V3c0-.55231-.44769-1-1-1s-1 .44769-1 1v1.08997C11.32587 4.03516 11.65851 4 12 4z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h3 className={`text-md font-medium ${textColor}`}>
                  New Notification
                </h3>
                {!isRead && (
                  <span
                    className={`ml-2 text-xs font-medium ${badgeColor} text-white rounded px-2 py-1`}
                  >
                    Update
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 ${textColor}`}>
                Warning! Better check yourself, you're not looking too
                goodWarning! Better check yourself,
                <button
                  onClick={() => handleReadMore(key)}
                  className={`ml-3 hover:underline inline-flex ${readMoreColor}`}
                >
                  Read more
                </button>
              </p>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <main className="mx-2 my-2 lg:mx-8 lg:my-12 min-h-[50vh]">
        <div className="container">
          <h2 className="text-3xl font-semibold mt-16 mb-10">Notification</h2>

          <div className="max-w-4xl space-y-6">
            {renderNotification(
              "notify1",
              "bg-yellow-100 dark:bg-[rgba(255,162,43,0.1)]",
              "border-yellow-500",
              "bg-green-600"
            )}
            {renderNotification(
              "notify2",
              "bg-green-100 dark:bg-[rgba(22,163,74,0.1)]",
              "border-green-600",
              "bg-green-600"
            )}
            {renderNotification(
              "notify3",
              "bg-red-100 dark:bg-[rgba(220,38,38,0.1)]",
              "border-red-600",
              "bg-red-600"
            )}
            {renderNotification(
              "notify4",
              "bg-blue-100 dark:bg-[rgba(59,130,246,0.1)]",
              "border-blue-600",
              "bg-blue-600"
            )}
          </div>

          <NotificationDetailsModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            data={notificationData}
          />
        </div>
      </main>
    </>
  );
};

export default Notification;
