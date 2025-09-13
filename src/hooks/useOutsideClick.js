import { useEffect, useRef } from "react";

const UseOutsideClick = (handler, listenCapturing = true) => {
  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handler, listenCapturing]);
  return modalRef;
};

export default UseOutsideClick;
