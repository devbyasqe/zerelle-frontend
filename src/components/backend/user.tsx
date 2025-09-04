import { TProfileCardFormData } from "../profile/profile-card";
import axiosInstance from "./api";

type TMethods = "get" | "patch" | "delete";

export const profileCrud = async (
  method: TMethods = "get",
  formData?: TProfileCardFormData
) => {
  try {
    let response;

    if (method === "patch") {
      if (!formData) {
        throw new Error("Form data is required for PATCH request.");
      }
      response = await axiosInstance.patch("profile/", formData);
    } else if (method === "delete") {
      response = await axiosInstance.delete("profile/");
    } else if (method === "get") {
      response = await axiosInstance.get("profile/");
    } else {
      console.log(method);
      throw new Error(`Unsupported method: ${method}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
