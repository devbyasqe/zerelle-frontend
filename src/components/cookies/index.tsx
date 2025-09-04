import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, expires: number = 1) => {
  Cookies.set(name, value, {
    secure: true,
    path: "/",
    expires,
    sameSite: "strict",
  });
};

export const getCookie = (value: string) => {
  return Cookies.get(value);
};

export const removeCookie = (value: string) => {
  return Cookies.remove(value);
};

export const removeTokens = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
};
