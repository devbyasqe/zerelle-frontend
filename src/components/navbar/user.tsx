import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CartIcon, MenuIcon, SearchIcon, WishlistIcon } from "../svg";

const UserNavbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 isolate min-w-80 w-[95%] sm:max-md:max-w-[40rem] max-w-[90rem] mx-auto ">
      <nav className="h-14 flex items-center justify-between border-b border-r border-l bg-background/50 backdrop-blur">
        <Link href={"/"} className="inline-flex text-xl font-semibold px-4">
          Zerelle
        </Link>
        <div className="flex gap-2 pe-4">
          <Button size={"icon"} variant={"accent"}>
            <SearchIcon />
          </Button>
          <Button size={"icon"} variant={"accent"}>
            <CartIcon />
          </Button>
          <Button size={"icon"} variant={"accent"}>
            <WishlistIcon />
          </Button>
          <Button size={"icon"} variant={"accent"}>
            <MenuIcon />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;

 
