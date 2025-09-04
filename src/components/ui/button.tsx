import React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";

export const buttonVariants = cva(
  "relative cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 shrink-0 [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-secondary text-foreground-secondary hover:bg-secondary/80 focus-visible:bg-secondary/80 disabled:bg-secondary/80 disabled:text-foreground-muted",
        success:
          "bg-success text-white hover:bg-success/80 focus-visible:bg-success/80 disabled:bg-success/80 disabled:text-white/70",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 focus-visible:bg-destructive/80 disabled:bg-destructive/80 disabled:text-white/70",
        accent:
          "bg-muted text-foreground hover:bg-accent focus-visible:bg-accent disabled:bg-accent disabled:text-foreground-muted",
        link: "text-foreground  hover:text-foreground-muted focus-visible:text-foreground-muted disabled:text-foreground-muted",
        outline:
          "border hover:bg-accent focus-visible:bg-accent disabled:bg-accent disabled:text-foreground-muted",
      },
      size: {
        default: "h-9",
        icon: "size-9",
        theme: "size-7",
      },
      padding: { default: "px-4 py-2", "icon-last": "gap-2 ps-3 pe-0.5" },
      hover: {
        scale: "focus-visible:scale-105 hover:scale-110 active:scale-95",
      },
    },
    defaultVariants: {
      variant: "primary",
      padding: "default",
      size: "default",
    },
  }
);

export const Button = ({
  className,
  variant,
  size,
  hover,
  padding,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({
          size,
          padding,
          variant,
          hover,

          className,
        })
      )}
      {...props}
    />
  );
};

export const CustomLink = ({
  className,
  variant,
  size,
  padding,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps &
  VariantProps<typeof buttonVariants>) => (
  <Link
    data-slot="link"
    href={href}
    className={cn(
      buttonVariants({
        size,
        padding,
        variant,
        className,
      })
    )}
    {...props}
  />
);

export const iconWrapperVariants = cva(
  "relative size-8 inline-flex items-center justify-center rounded-xl transition-all duration-300 shrink-0 [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-secondary text-foreground-secondary",
        destructive: "bg-destructive text-white",
        warning: "bg-warning text-black",
        success: "bg-success text-white",
        accent: "bg-muted text-foreground",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  }
);

export const IconWrapper = ({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof iconWrapperVariants>) => {
  return (
    <div
      className={cn(
        iconWrapperVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  );
};
