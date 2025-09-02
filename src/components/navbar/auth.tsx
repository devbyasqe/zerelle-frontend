import Link from "next/link";
import React from "react";

const AuthNavbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 isolate min-w-80 w-[95%] sm:max-md:max-w-[40rem] max-w-[90rem] mx-auto ">
      <nav className="h-14 flex items-center border-b border-r border-l bg-background/50 backdrop-blur">
        <Link href={"/"} className="inline-flex text-xl font-semibold px-4">
          Zerelle
        </Link>
      </nav>
    </header>
  );
};

export default AuthNavbar;
