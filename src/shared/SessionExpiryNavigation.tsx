import React, { FC } from "react";
interface IProps {
  identifier?: string;
}

const SessionExpiryNavigation: FC<IProps> = ({ identifier }) => {
  return (
    <>
      <div className="flex items-center justify-center my-6 bg-gray-100 w-full">
        <div className="p-10 bg-red-50 border border-red-200 shadow-lg rounded-lg animate-fadeInScale w-full">
          <h1 className="text-xl font-bold text-red-500 text-center">
            Session Expired
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Click below to create a new session.
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href={`${identifier ? `/${identifier}` : "/home"}`}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
            >
              Create Session
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionExpiryNavigation;
