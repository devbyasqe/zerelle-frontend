import { cn } from "@/lib/utils";
import React from "react";
type TModal = React.HTMLAttributes<HTMLElement> & {
  isOpen: boolean;
  isCenter?: boolean;
};

const Modal = ({ isOpen, isCenter, className, ...props }: TModal) => {
  return (
    isOpen && (
      <section
        className={cn(
          "fixed z-50 inset-0  sm:max-md:max-w-[40rem] max-w-[90rem] mx-auto transition-all duration-300 py-4 bg-accent/50  backdrop-blur overflow-y-auto",
          isCenter && "flex items-center justify-center"
        )}
      >
        <div
          className={cn(
            "relative w-[92%] mx-auto rounded-xl p-4 bg-background border",
            className
          )}
          {...props}
        />
      </section>
    )
  );
};

export default Modal;
