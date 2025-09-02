"use client";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, TForgotPasswordFormData } from "../validation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "@/components/backend/auth";
import { toast } from "sonner";
import { ArrowRotate } from "@/components/svg";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TForgotPasswordFormData) => {
      return authSubmit("forgotPassword", data);
    },
    onSuccess: () => {
      toast.success(
        "Password reset instructions have been sent to your email."
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
      <div className="space-y-2">
        <Label htmlFor="email">Email ID </Label>
        <TextInput type="email" id="email" autoFocus {...register("email")} />
        {errors.email && (
          <p className="text-destructive text-sm">
            {errors.email?.message?.toString()}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Send Reset Link
          {isPending && <ArrowRotate className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
