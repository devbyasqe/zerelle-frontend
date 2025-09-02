"use client";
import ResetPasswordForm from "@/components/auth/forms/reset-password";
import { useValidateUidToken } from "@/components/hooks/auth";
import { AuthLoader } from "@/components/loader/auth";
import React, { use } from "react";

const ResetPasswordPage = ({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) => {
  const { token, uid } = use(params);
  const { loading } = useValidateUidToken("resetPassword", uid, token);
  if (loading) return <AuthLoader />;
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create new password{" "}
        </h1>
        <p className="mt-1 text-foreground-muted text-pretty">
          Your new password must be different from your previously used
          passwords.
        </p>
      </div>

      <ResetPasswordForm uid={uid} token={token} />
    </>
  );
};

export default ResetPasswordPage;
