"use client";
import VerifyOtpForm from "@/components/auth/forms/verify-otp";
import { authSubmit } from "@/components/backend/auth";
import { useValidateUidToken } from "@/components/hooks";
import { AuthLoader } from "@/components/loader/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React, { use } from "react";
import { toast } from "sonner";

const VerifyOtpPage = ({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) => {
  const { token, uid } = use(params);

  const { loading } = useValidateUidToken("verifyOTP", uid, token);

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: () => {
      return authSubmit("resendOTP", undefined, { uid, token });
    },
    onSuccess: () => {
      toast.success("A new verification code has been sent to your email.");
    },
  });

  if (loading) return <AuthLoader />;

  return (
    <>
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight">
          Verify Your Account
        </h1>
        <p className="mt-1 text-foreground-muted">
          Please enter the 6-digit code sent to your email to complete the
          verification process.
        </p>
      </div>

      <VerifyOtpForm uid={uid} token={token} />

      {!isSuccess && (
        <div className="mt-10 flex gap-x-1.5 flex-wrap text-sm tracking-tight text-foreground-muted">
          <p>Your code has expired?</p>
          <Button
            variant={"link"}
            size={null}
            padding={null}
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
          >
            Resend Code
          </Button>
        </div>
      )}
    </>
  );
};

export default VerifyOtpPage;
