"use client";

import React from "react";
import { changePasswordFields } from "..";
import Label from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, TChangePasswordFormData } from "../validation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "@/components/backend/auth";
import { toast } from "sonner";
import { ArrowRotate } from "@/components/svg";

const ResetPasswordForm = ({ uid, token }: { uid: string; token: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TChangePasswordFormData>({
    // resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

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

  return (
    <form
      noValidate
      className="space-y-6 mt-10"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {changePasswordFields.map(({ label, id }, index) => (
        <div key={id + index} className="space-y-2">
          <Label htmlFor={id}>{label} </Label>
          <PasswordInput
            id={id}
            autoFocus={label === "Password"}
            {...register(id, {
              onChange: async () => {
                if (id === "password" && getValues("confirm_password")) {
                  await trigger("confirm_password");
                }
              },
            })}
          />
          {errors[id] && (
            <p className="text-destructive text-sm">
              {errors[id]?.message?.toString()}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Reset Password
          {isPending && <ArrowRotate className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
