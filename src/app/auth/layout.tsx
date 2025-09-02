import CopyRights from "@/components/footer/copy-rights";
import AuthNavbar from "@/components/navbar/auth";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthNavbar />
      <main className="max-w-md mx-auto min-h-[calc(100svh-120px)] pt-14 pb-10 px-4">
        {children}
      </main>
      <CopyRights className="border-t" />
    </>
  );
};

export default AuthLayout;
