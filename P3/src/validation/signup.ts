import { object, string, mixed, ref, InferType } from "yup";
import { REQUIRED } from "./constants";

export const signUpSchema = object({
  first_name: string().required(REQUIRED),
  last_name: string().required(REQUIRED),
  email: string().required(REQUIRED).email("Enter a valid email address."),
  avatar: mixed().required(REQUIRED),
  phone_num: string().required(REQUIRED)
    .matches(/^\d{3}-\d{3}-\d{4}$/, "A valid phone number (###-###-####) is required."),
  password1: string().required(REQUIRED)
    .min(8, "Password must be at least 8 characters long.")
    .test("num", "Password cannot be entirely numeric.", pwd => !/^\d+$/.test(pwd || '')),
  password2: string().required(REQUIRED).oneOf([ref("password1")], "The two password fields didn't match.")
}).required();

export type SignUpRequest = InferType<typeof signUpSchema>;