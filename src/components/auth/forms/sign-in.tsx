"use client";

import { Button, CustomLink } from "@/components/ui/button";
import { PasswordInput, TextInput } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { signInSchema, TSignInFormData } from "../validation";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "@/components/backend/auth";
import { ArrowRotateIcon } from "@/components/svg";
import { setCookie } from "@/components/cookies";

const SignInForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TSignInFormData) => {
      return authSubmit("signin", data);
    },
    onSuccess: (data) => {
      setCookie("access", data.access);
      setCookie("refresh", data.refresh, 7);
      if (pathname.startsWith("/auth")) {
        if (data.role === "superuser") {
          router.replace("/admin/dashboard");
        } else if (data.role === "staff") {
          router.replace("/staff/dashboard");
        } else {
          router.replace("/");
        }
      } else {
        router.refresh();
      }
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password </Label>
          <CustomLink
            size={null}
            padding={null}
            variant={"link"}
            href={"/auth/forgot-password"}
          >
            Forgot Password?
          </CustomLink>
        </div>
        <PasswordInput id="password" {...register("password")} />
        {errors.password && (
          <p className="text-destructive text-sm">
            {errors.password?.message?.toString()}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Sign In
          {isPending && <ArrowRotateIcon className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
