import SignInForm from "@/components/auth/forms/sign-in";
import { CustomLink } from "@/components/ui/button";
import React from "react";

const SignInPage = () => (
  <>
    <div className="">
      <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
      <p className="mt-1 text-foreground-muted">Good to have you back.</p>
    </div>

    <SignInForm />

    <div className="mt-10 flex gap-x-1.5 flex-wrap text-sm tracking-tight text-foreground-muted">
      <p>Don&apos;t have an account?</p>
      <CustomLink
        variant={"link"}
        size={null}
        padding={null}
        href={"/auth/sign-up"}
      >
        Create an account
      </CustomLink>
    </div>
  </>
);

export default SignInPage;
