"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  TUpdateUsernameFormData,
  updateUsernameSchema,
} from "../auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { TProfileCardFormData } from "./profile-card";
import Label from "../ui/label";
import { TextInput } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRotateIcon } from "../svg";

type TProfileUsername = {
  mutate: UseMutateFunction<any, Error, TProfileCardFormData, unknown>;
  isPending: boolean;
  handleCancel: () => void;
};

const ProfileUsername = ({
  isPending,
  mutate,
  handleCancel,
}: TProfileUsername) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUsernameFormData>({
    resolver: zodResolver(updateUsernameSchema),
    mode: "onChange",
  });
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Update your username
        </h1>
        <p className="mt-1 text-foreground-muted text-pretty">
          Choose a unique username that represents you. This will be visible to
          other users across the platform.
        </p>
      </div>

      <form
        noValidate
        className="space-y-6 mt-10"
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <TextInput
            type="username"
            id="username"
            autoFocus
            {...register("username")}
          />
          {errors.username && (
            <p className="text-destructive text-sm">
              {errors.username?.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <Button
            hover={"scale"}
            variant={"destructive"}
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} hover={"scale"}>
            Update Username
            {isPending && <ArrowRotateIcon className="animate-spin" />}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileUsername;
