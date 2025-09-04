"use client";
import React from "react";
import { signUpFormFields } from "..";
import Label from "@/components/ui/label";
import { PasswordInput, TextInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpFormData, signUpSchema } from "../validation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "@/components/backend/auth";
import { ArrowRotateIcon } from "@/components/svg";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TSignUpFormData) => {
      return authSubmit("signup", data);
    },
    onSuccess: () => {
      toast.success(
        "Account created. Please verify your email using the OTP sent to you."
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
      {signUpFormFields.map(({ label, type, id }, index) => (
        <div key={id + index} className="space-y-2">
          <Label htmlFor={id}>{label} </Label>
          {type === "password" ? (
            <PasswordInput
              id={id}
              {...register(id, {
                onChange: async () => {
                  if (id === "password" && getValues("confirm_password")) {
                    await trigger("confirm_password");
                  }
                },
              })}
            />
          ) : (
            <TextInput
              type={type}
              id={id}
              autoFocus={label === "Username"}
              {...register(id)}
            />
          )}
          {errors[id] && (
            <p className="text-destructive text-sm">
              {errors[id]?.message?.toString()}
            </p>
          )}
        </div>
      ))}
      <div className="flex gap-x-1.5 flex-wrap text-sm tracking-tight text-foreground-muted">
        <p>By creating an account, you agree to our </p>
        <Link href={"/"} className="inline-flex font-medium text-foreground">
          terms of use
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Sign Up
          {isPending && <ArrowRotateIcon className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
