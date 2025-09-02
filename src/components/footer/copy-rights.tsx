import React from "react";
import ThemeToggler from "../theme";
import { cn } from "@/lib/utils";

const CopyRights = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border-b px-4 py-2 flex items-center justify-between",
        className
      )}
    >
      <p className="font-mono tracking-tighter">
        <span>&copy;</span>
        <span className="ms-0.5">{new Date().getFullYear()}</span>
        <span className="ms-1.5 font-medium">Zerelle</span>
      </p>
      <ThemeToggler />
    </div>
  );
};

export default CopyRights;
