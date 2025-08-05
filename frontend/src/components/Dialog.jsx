import { useEffect } from "react";
import "../styles/Dialog.css";

function Dialog({ isOpen, onClose, title, message }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="dialog-close" onClick={onClose}>✕</button>
        </div>
        <div className="dialog-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
