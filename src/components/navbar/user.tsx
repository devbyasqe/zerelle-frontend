"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CartIcon, MenuIcon, SearchIcon, WishlistIcon, XIcon } from "../svg";
import Modal from "../ui/modal";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
            <Button
              size={"icon"}
              variant={"accent"}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <MenuIcon />
            </Button>
          </div>
        </nav>
      </header>
      <Modal
        isOpen={isOpen}
        centerChild={false}
        className="max-w-md ms-auto h-full"
      >
        <div className="py-2 pe-4 flex justify-end">
          <Button
            size={"icon"}
            variant={"accent"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <XIcon />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserNavbar;
