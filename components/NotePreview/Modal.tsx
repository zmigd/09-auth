"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  // Закриття модалки через клавішу Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose ? onClose() : router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, router]);

  // Закриття модалки при кліку на бекдроп
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose ? onClose() : router.back();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

