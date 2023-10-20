import { useEffect } from "react";

export default function PopupEscClose(isOpen, onClose) {
  useEffect(() => {
    if (isOpen) {
      return;
    }

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);
}
