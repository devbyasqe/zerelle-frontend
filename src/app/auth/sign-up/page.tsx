import SignUpForm from "@/components/auth/forms/sign-up";
import { CustomLink } from "@/components/ui/button";
import React from "react";

const SignUpPage = () => (
  <>
    <div className="">
      <h1 className="text-3xl font-semibold tracking-tight">Join Us</h1>
      <p className="mt-1 text-foreground-muted">
        We just need a few details to create your account.
      </p>
    </div>

    <SignUpForm />

    <div className="mt-10 flex gap-x-1.5 flex-wrap text-sm tracking-tight text-foreground-muted">
      <p>Already have an account?</p>
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

export default SignUpPage;
