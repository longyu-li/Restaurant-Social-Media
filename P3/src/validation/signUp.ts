import { object, string, mixed, ref, InferType } from "yup";
import { PHONE_REGEX, REQUIRED } from "./utils";

export const signUpSchema = object({
  first_name: string().required(REQUIRED),
  last_name: string().required(REQUIRED),
  email: string().required(REQUIRED).email("Enter a valid email address."),
  avatar: mixed().test("file", "An avatar is required.", files => files && files.length > 0),
  phone_num: string().required(REQUIRED)
    .matches(PHONE_REGEX, "A valid phone number (###-###-####) is required."),
  password1: string().required(REQUIRED)
    .min(8, "Password must be at least 8 characters long.")
    .test("num", "Password cannot be entirely numeric.", pwd => !/^\d+$/.test(pwd || '')),
  password2: string().required(REQUIRED).oneOf([ref("password1")], "The two password fields didn't match.")
}).required();

export interface SignUpRequest extends InferType<typeof signUpSchema> {
  [key: string]: any
}