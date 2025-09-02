"use client";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { TVerifyOTPFormData, verifyOTPSchema } from "../validation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "@/components/backend/auth";
import { setCookie } from "@/components/cookies";
import { ArrowRotate } from "@/components/svg";
import { toast } from "sonner";

const VerifyOtpForm = ({ uid, token }: { uid: string; token: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TVerifyOTPFormData) => {
      return authSubmit("verifyOTP", data, { uid, token });
    },
    onSuccess: (data) => {
      setCookie("access", data.access);
      setCookie("refresh", data.refresh, 7);
      toast.success("Account verification successful. Welcome aboard!");
      if (data.role === "superuser") {
        router.replace("/admin/dashboard");
      } else if (data.role === "staff") {
        router.replace("/staff/dashboard");
      } else {
        router.replace("/");
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
        <Label htmlFor="otp">Enter OTP</Label>
        <TextInput
          type="number"
          id="otp"
          autoFocus
          {...register("otp")}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.value.length > 6) {
              target.value = target.value.slice(0, 6);
            }
          }}
        />
        {errors.otp && (
          <p className="text-destructive text-sm">
            {errors.otp?.message?.toString()}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit" disabled={isPending} hover={"scale"}>
          Verify Code
          {isPending && <ArrowRotate className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
