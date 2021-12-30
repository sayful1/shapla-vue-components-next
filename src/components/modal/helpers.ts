const refreshBodyClass = (active: boolean) => {
  const body = document.querySelector("body") as HTMLBodyElement;
  if (active) {
    return body.classList.add("has-shapla-modal");
  }
  setTimeout(() => {
    if (document.querySelectorAll(".shapla-modal.is-active").length === 0) {
      body.classList.remove("has-shapla-modal");
    }
  }, 50);
};

const ShaplaModalHelper = {
  refreshBodyClass,
};

export {refreshBodyClass};
export default ShaplaModalHelper;
