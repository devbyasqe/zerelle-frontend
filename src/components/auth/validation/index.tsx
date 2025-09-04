import { z } from "zod";

export const USERNAME_REGEX = /^[A-Za-z ]{3,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const OTP_REGEX = /^\d{6}$/;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .regex(USERNAME_REGEX, "Username can only contain letters and spaces"),
    email: z.string().regex(EMAIL_REGEX, "Please enter a valid email"),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password needs uppercase, lowercase, number, and special character"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export type TSignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, "Please enter a valid email"),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password needs uppercase, lowercase, number, and special character"
    ),
});

export type TSignInFormData = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, "Please enter a valid email"),
});

export type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password needs uppercase, lowercase, number, and special character"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export type TChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const verifyOTPSchema = z.object({
  otp: z.string().regex(OTP_REGEX, "Please enter a valid OTP Code"),
});

export type TVerifyOTPFormData = z.infer<typeof verifyOTPSchema>;

export const updateUsernameSchema = z.object({
  username: z
    .string()
    .regex(USERNAME_REGEX, "Username can only contain letters and spaces"),
});

export type TUpdateUsernameFormData = z.infer<typeof updateUsernameSchema>;
