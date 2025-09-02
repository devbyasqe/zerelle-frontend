"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
