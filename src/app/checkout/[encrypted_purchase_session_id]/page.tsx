import dynamic from "next/dynamic";

// Dynamically import the PageMain component with SSR disabled
const CheckOutPagePageMain = dynamic(() => import("./PageMain"), {
  ssr: false,
});

const Page = () => {
  return <CheckOutPagePageMain />;
};

export default Page;
