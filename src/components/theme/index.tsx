"use client";

import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon, SystemIcon } from "../svg";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const themeList = [
  { icon: <SystemIcon />, label: "system" },
  { icon: <SunIcon />, label: "light" },
  { icon: <MoonIcon />, label: "dark" },
];

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => setMount(true), []);
  if (!mount) return null;

  return (
    <div className="[background:linear-gradient(hsl(var(--background)))_padding-box,conic-gradient(from_var(--angle),hsl(var(--muted))_40%,hsla(var(--secondary),0.5)_60%,hsl(var(--muted))_75%)_border-box] border border-transparent animate-rotate-cw rounded-xl p-1 inline-flex items-center gap-0.5">
      {themeList.map(({ icon, label }, index) => (
        <Button
          type="button"
          key={label + index}
          disabled={theme === label}
          variant={null}
          size={"theme"}
          padding={null}
          onClick={(e) => {
            setTheme(label);
          }}
          className="disabled:text-foreground-muted disabled:bg-muted disabled:border"
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};

export default ThemeToggler;
