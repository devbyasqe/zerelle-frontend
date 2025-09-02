type TSignUpFormFields = {
  id: "username" | "email" | "password" | "confirm_password";
  label: String;
  type: "text" | "email" | "password";
};

export const signUpFormFields: TSignUpFormFields[] = [
  { label: "Username", type: "text", id: "username" },
  {
    label: "Email ID",
    type: "email",
    id: "email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    id: "confirm_password",
  },
];

type TChangePasswordFields = {
  id: "password" | "confirm_password";
  label: String;
};

export const changePasswordFields: TChangePasswordFields[] = [
  {
    label: "Password",
    id: "password",
  },
  {
    label: "Confirm Password",
    id: "confirm_password",
  },
];
