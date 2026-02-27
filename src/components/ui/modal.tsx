"use client";

import { useEffect, useRef } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/20 backdrop:backdrop-blur-sm rounded-xl border border-foreground/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-0 w-full max-w-md bg-white m-0"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
