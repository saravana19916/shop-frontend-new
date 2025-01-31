import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const BackBreadCrumb = () => {
  const router = useRouter();

  return (
    <>
      <nav className="flex py-4 text-gray-600" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-4">
          <li
            className="flex items-center gap-3 cursor-pointer font-medium hover:text-reddish-500"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Back
          </li>
        </ol>
      </nav>
    </>
  );
};

export default BackBreadCrumb;
