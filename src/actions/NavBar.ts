export const closeNavbarCartDropDown = () => {
  const element = document.getElementById("cartPopoverButton");
  if (element && element.classList.contains("show-popover-custom")) {
    element.click();
    return;
  } else {
    return;
  }
};
