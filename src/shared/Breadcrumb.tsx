import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
export interface IBreadCrumbProps {
  title: string;
  isActive: boolean;
  href: string;
  isHome: boolean;
}
interface IProps {
  breadCrumbsList: IBreadCrumbProps[];
}
const Breadcrumb: FC<IProps> = ({ breadCrumbsList }) => {
  return (
    <>
      <nav className="flex py-4 text-gray-600" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-4">
          {breadCrumbsList?.map((breadCrumb) => (
            <>
              <li className="flex items-center">
                {breadCrumb?.isHome ? (
                  <></>
                ) : (
                  <>
                    <ChevronRightIcon className="w-3 h-3 me-3 mt-1" />
                  </>
                )}
                <a
                  href={breadCrumb.href}
                  className={`inline-flex items-center  ${
                    breadCrumb?.isActive
                      ? "text-reddish-500 hover:text-primary-6000"
                      : "text-gray-700 hover:text-reddish-500"
                  }`}
                >
                  {breadCrumb?.isHome ? (
                    <>
                      <HomeIcon className="w-5 h-5 me-2" />
                    </>
                  ) : (
                    <></>
                  )}
                  <span
                    className={`capitalize	${
                      breadCrumb?.isHome
                        ? "inline-block mt-1"
                        : "inline-block mt-1"
                    }`}
                  >
                    {breadCrumb.title}
                  </span>
                </a>
              </li>
            </>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
