"use client";
import ResetPasswordForm from "@/components/auth/forms/reset-password";
import { TChangePasswordFormData } from "@/components/auth/validation";
import { authSubmit } from "@/components/backend/auth";
import { useValidateUidToken } from "@/components/hooks";
import { AuthLoader } from "@/components/loader/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { toast } from "sonner";

const ResetPasswordPage = ({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) => {
  const router = useRouter();
  const { token, uid } = use(params);
  const { loading } = useValidateUidToken("resetPassword", uid, token);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TChangePasswordFormData) => {
      return authSubmit("resetPassword", data, { uid, token });
    },
    onSuccess: () => {
      toast.success(
        "Password updated successfully. You can now log in with your new password."
      );
      router.replace("/auth/sign-in");
    },
  });

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

      <ResetPasswordForm isPending={isPending} mutate={mutate} />
    </>
  );
};

export default ResetPasswordPage;
