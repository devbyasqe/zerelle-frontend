"use client";
import React, { useRef, useState } from "react";
import { ProfileImage } from ".";
import { Button, IconWrapper } from "../ui/button";
import { PhotoIcon, SaveIcon, TrashIcon, XIcon } from "../svg";
import { toast } from "sonner";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { TProfileCardFormData } from "./profile-card";

type TProfilePictureUpdate = {
  src?: string;
  closeModal: () => void;
  mutate: UseMutateFunction<any, Error, TProfileCardFormData, unknown>;
  isPending: boolean;
};

const IMG_FILE_SIZE = 1 * 1024 * 1024;

const ProfilePictureUpdate = ({
  src,
  closeModal,
  mutate,
  isPending,
}: TProfilePictureUpdate) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [picture, setPicture] = useState<File | null>(null);

  const pictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > IMG_FILE_SIZE) {
      toast.error("Image must be less than 1MB");
      return;
    }

    setPicture(file);
  };

  const handleCancel = () => {
    setPicture(null);
    if (inputRef.current) inputRef.current.value = "";
    closeModal();
  };

  const handleSave = () => {
    if (!picture) return;
    const formData = new FormData();
    formData.append("profile_picture", picture);
    mutate(formData);
  };

  const handleRemove = () => {
    const formData = new FormData();
    formData.append("profile_picture", "");
    mutate(formData);
    setPicture(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-end">
        {src && (
          <Button
            hover={"scale"}
            padding={"icon-last"}
            variant={"destructive"}
            onClick={handleRemove}
            disabled={isPending}
          >
            Remove
            <IconWrapper>
              <TrashIcon />
            </IconWrapper>
          </Button>
        )}
        <Button
          hover={"scale"}
          padding={"icon-last"}
          disabled={isPending}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {picture ? "Change" : "New"}
          <IconWrapper>
            <PhotoIcon />
          </IconWrapper>
        </Button>
        <Button
          hover={"scale"}
          padding={"icon-last"}
          variant={"destructive"}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
          <IconWrapper>
            <XIcon />
          </IconWrapper>
        </Button>
        {picture && (
          <Button
            hover={"scale"}
            padding={"icon-last"}
            variant={"success"}
            disabled={isPending}
            onClick={handleSave}
          >
            Save
            <IconWrapper>
              <SaveIcon />
            </IconWrapper>
          </Button>
        )}
      </div>
      <div className="mt-10 max-h-80 aspect-square mx-auto rounded-full overflow-hidden">
        <ProfileImage src={picture ? URL.createObjectURL(picture) : src} />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/webp"
        className="hidden"
        onChange={pictureChange}
      />
    </>
  );
};

export default ProfilePictureUpdate;
