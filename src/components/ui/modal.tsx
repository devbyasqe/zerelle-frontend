import { cn } from "@/lib/utils";
import React from "react";
type TModal = React.HTMLAttributes<HTMLElement> & {
  isOpen: boolean;
  isCenter?: boolean;
  centerChild?: boolean;
};

const Modal = ({
  isOpen,
  isCenter,
  centerChild = true,
  className,
  ...props
}: TModal) => {
  return (
    isOpen && (
      <section
        className={cn(
          "fixed z-50 inset-0 w-[95%] sm:max-md:max-w-[40rem] max-w-[90rem] mx-auto transition-all duration-300  bg-accent/50  backdrop-blur overflow-y-auto",
          isCenter && "flex items-center justify-center",
          centerChild ? "py-4 ":"py-1"
        )}
      >
        <div
          className={cn(
            "relative rounded-xl  bg-background border",
            centerChild && "mx-auto p-4",
            className
          )}
          {...props}
        />
      </section>
    )
  );
};

export default Modal;
