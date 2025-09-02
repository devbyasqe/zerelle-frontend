import { AxiosError } from "axios";
import {
  TChangePasswordFormData,
  TForgotPasswordFormData,
  TSignInFormData,
  TSignUpFormData,
  TVerifyOTPFormData,
} from "../auth/validation";
import axiosInstance from "./api";
import { toast } from "sonner";

const AUTH_ENDPOINTS = {
  signin: "/auth/sign-in/",
  signup: "/auth/sign-up/",
  forgotPassword: "/auth/forgot-password/",
  resendOTP: "/auth/resend-otp/",
  verifyOTP: "/auth/verify-otp/",
  resetPassword: "/auth/reset-password/",
} as const;

const handleApiError = (error: AxiosError) => {
  let message = "Unexpected network error";

  if (error.response?.data && typeof error.response.data === "object") {
    message = Object.values(error.response.data as Record<string, string[]>)
      .flat()
      .join(", ");
  }
  toast.error(message);
  throw error;
};

export const authSubmit = async (
  endpoint: keyof typeof AUTH_ENDPOINTS,
  formData?:
    | TSignUpFormData
    | TSignInFormData
    | TForgotPasswordFormData
    | TChangePasswordFormData
    | TVerifyOTPFormData,
  params?: { uid?: string; token?: string }
) => {
  try {
    let url = AUTH_ENDPOINTS[endpoint];

    if (params?.uid && params?.token) {
      url += `${params.uid}/${params.token}/`;
    }

    const response = formData
      ? await axiosInstance.post(url, formData)
      : await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};
