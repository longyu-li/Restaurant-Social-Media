import {object, string, mixed, InferType} from "yup";
import {PHONE_REGEX, REQUIRED} from "./utils";

export const createRestaurantSchema = object({
  name: string().required(REQUIRED),
  address: string().required(REQUIRED),
  logo: mixed().test("logo", "A logo is required", files => files && files.length > 0),
  phone_num: string().required(REQUIRED)
    .matches(PHONE_REGEX, "A valid phone number (###-###-####) is required."),
  banner: mixed().test("banner", "A banner is required", files => files && files.length > 0),
  description: string().required(REQUIRED),
}).required();

export interface CreateRestaurantRequest extends InferType<typeof createRestaurantSchema> {
  [key: string]: any
}