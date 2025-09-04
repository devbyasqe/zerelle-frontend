"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { authSubmit } from "../backend/auth";

export const useValidateUidToken = (
  endpoint: "verifyOTP" | "resetPassword",
  uid: string,
  token: string
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        await authSubmit(endpoint, undefined, { uid, token });
        setLoading(false);
      } catch {
        router.replace("/auth/sign-in");
      }
    };

    verify();
  }, []);

  return { loading };
};

export const useModalFor = () => {
  const [modalFor, setModalFor] = useState<string | null>(null);

  const openModalFor = useCallback((value: string) => {
    setModalFor(value);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = "auto";
    setModalFor(null);
  }, []);

  return { modalFor, openModalFor, closeModal };
};
