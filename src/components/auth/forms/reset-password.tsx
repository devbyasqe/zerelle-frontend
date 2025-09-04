"use client";

import React from "react";
import { changePasswordFields } from "..";
import Label from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, TChangePasswordFormData } from "../validation";
import { UseMutateFunction } from "@tanstack/react-query";
import { ArrowRotateIcon } from "@/components/svg";
import { TProfileCardFormData } from "@/components/profile/profile-card";

type TResetPasswordForm = {
  handleCancel?: () => void;
  isPending: boolean;
  mutate:
    | UseMutateFunction<
        any,
        Error,
        {
          password: string;
          confirm_password: string;
        },
        unknown
      >
    | UseMutateFunction<any, Error, TProfileCardFormData, unknown>;
};

const ResetPasswordForm = ({ isPending, mutate,handleCancel }: TResetPasswordForm) => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
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

      <div className="flex justify-center gap-3 mt-4">
        {handleCancel && (
          <Button
            hover={"scale"}
            variant={"destructive"}
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Reset Password
          {isPending && <ArrowRotateIcon className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
