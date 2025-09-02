import ForgotPasswordForm from "@/components/auth/forms/forgot-password";
import { CustomLink } from "@/components/ui/button";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot Password
        </h1>
        <p className="mt-1 text-foreground-muted">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="mt-10 flex gap-x-1.5 flex-wrap text-sm tracking-tight text-foreground-muted">
        <p>Remembered your password?</p>
        <CustomLink
          variant={"link"}
          size={null}
          padding={null}
          href={"/auth/sign-in"}
        >
          Sign In
        </CustomLink>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
