import {object, string, mixed, InferType, ref} from "yup";
import {PHONE_REGEX, REQUIRED} from "./utils";

const OPT_PHONE_REGEX = new RegExp(`^(${PHONE_REGEX.source.slice(1, -1)})?$`);

export const editProfileSchema = object({
  first_name: string(),
  last_name: string(),
  avatar: mixed(),
  phone_num: string()
    .matches(OPT_PHONE_REGEX, "A valid phone number (###-###-####) is required."),
  password1: string()
    .test("min", "Password must be at least 8 characters long.", pwd => !pwd || pwd.length >= 8)
    .test("num", "Password cannot be entirely numeric.", pwd => !/^\d+$/.test(pwd || '')),
  password2: string().oneOf([ref("password1")], "The two password fields didn't match."),
  password: string().required(REQUIRED)
}).required();

export interface EditProfileRequest extends InferType<typeof editProfileSchema> {
  [key: string]: any
}
