import { cn } from "@/lib/utils";
import React from "react";

const Label = ({ className, ...props }: React.ComponentProps<"label">) => {
  return (
    <label
      {...props}
      className={cn(
        "inline-flex text-sm leading-none font-medium select-none cursor-pointer",
        className
      )}
    />
  );
};

export default Label;
