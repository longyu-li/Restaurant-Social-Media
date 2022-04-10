import {object, string, mixed, InferType} from "yup";
import {REQUIRED} from "./utils";

export const editProfileSchema = object({
  first_name: string(),
  last_name: string(),
  avatar: mixed(),
  phone_num: string(),
  password1: string(),
  password2: string(),
  password: string().required(REQUIRED)
}).required();

export interface EditProfileRequest extends InferType<typeof editProfileSchema> {}
