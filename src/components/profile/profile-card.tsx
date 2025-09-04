"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { profileCrud } from "../backend/user";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { removeTokens } from "../cookies";
import { CameraIcon } from "../svg";
import { Button } from "../ui/button";
import { useModalFor } from "../hooks";
import Modal from "../ui/modal";
import { ProfileImage } from ".";
import ProfilePictureUpdate from "./profile-picture";
import ResetPasswordForm from "../auth/forms/reset-password";
import { TUpdateUsernameFormData } from "../auth/validation";
import ProfileUsername from "./profile-username";

type TProfile = {
  email?: string;
  profile_picture?: string;
  username?: string;
};

export type TProfileCardFormData =
  | FormData
  | {
      password: string;
      confirm_password: string;
    }
  | TUpdateUsernameFormData;

const ProfileCard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { modalFor, closeModal, openModalFor } = useModalFor();

  let { data, error } = useQuery<TProfile>({
    queryKey: ["profile"],
    queryFn: () => profileCrud(),
    staleTime: 3 * 60 * 1000,
    retry: 1,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (formData: TProfileCardFormData) => {
      return profileCrud("patch", formData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      closeModal();
    },
  });

  if (error) {
    if ((error as AxiosError).status === 401) {
      removeTokens();
      router.push("/auth/sign-in");
    }
  }
  if (!data) return <p>Loading</p>;

  return (
    <>
      <section className="p-4 flex flex-col items-center  ">
        <div className="relative isolate ">
          <div className="size-36 rounded-full overflow-clip bg-accent ring-1 ring-border ring-offset-2 ring-offset-background">
            <ProfileImage src={data.profile_picture} />
          </div>
          <Button
            size={"theme"}
            padding={null}
            variant={"accent"}
            className="absolute z-10 bottom-4 -right-2"
            onClick={() => {
              openModalFor("ProfilePicture");
            }}
          >
            <CameraIcon />
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold font-mono tracking-tighter mt-4">
          {data.username}
        </h1>
        <p className="mt-1 text-foreground-muted font-medium">{data.email}</p>
        <div className="flex  max-md:flex-col max-md:items-start md:justify-center mt-6">
          <Button
            variant={"link"}
            onClick={() => {
              openModalFor("ProfilePassword");
            }}
          >
            Change Password
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              openModalFor("ProfileUsername");
            }}
          >
            Update username
          </Button>
        </div>
      </section>
      <Modal
        isCenter
        isOpen={modalFor === "ProfilePicture"}
        className="max-w-xl"
      >
        <ProfilePictureUpdate
          closeModal={closeModal}
          isPending={isPending}
          mutate={mutate}
          src={data.profile_picture}
        />
      </Modal>
      <Modal
        isCenter
        isOpen={modalFor === "ProfilePassword"}
        className="max-w-md"
      >
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create new password{" "}
          </h1>
          <p className="mt-1 text-foreground-muted text-pretty ">
            Your new password must be different from your previously used
            passwords.
          </p>
        </div>
        <ResetPasswordForm
          isPending={isPending}
          mutate={mutate}
          handleCancel={closeModal}
        />
      </Modal>

      <Modal
        isCenter
        isOpen={modalFor === "ProfileUsername"}
        className="max-w-md"
      >
        <ProfileUsername
          isPending={isPending}
          mutate={mutate}
          handleCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default ProfileCard;
