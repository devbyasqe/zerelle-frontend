"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button, IconWrapper } from "./button";
import { EyeCloseIcon, EyeOpenIcon } from "../svg";

export const TextInput = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      {...props}
      className={cn(
        "h-9 w-full px-3 py-1 flex rounded-xl border disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
    />
  );
};

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center isolate ">
      <input
        type={show ? "text" : "password"}
        data-slot="input"
        {...props}
        className={cn(
          "h-9 w-full px-3 py-1 flex rounded-xl border disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
      />
      <Button
        type="button"
        padding={null}
        size={null}
        variant={null}
        className="bg-background size-7 absolute right-2 focus-visible:bg-muted "
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? <EyeCloseIcon /> : <EyeOpenIcon />}{" "}
      </Button>
    </div>
  );
};
