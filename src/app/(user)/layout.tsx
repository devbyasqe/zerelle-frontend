import CopyRights from "@/components/footer/copy-rights";
import UserNavbar from "@/components/navbar/user";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <UserNavbar />
      <main className="pt-14 pb-4">{children} </main>
      <CopyRights className="border-t" />
    </>
  );
};

export default UserLayout;
