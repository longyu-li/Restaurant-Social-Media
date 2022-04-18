import {InferType, mixed, object, string} from "yup";
import {OPT_PHONE_REGEX} from "./utils";

export const editRestaurantSchema = object({
  name: string(),
  address: string(),
  logo: mixed(),
  phone_num: string()
    .matches(OPT_PHONE_REGEX, "A valid phone number (###-###-####) is required."),
  banner: mixed(),
  description: string()
}).required();

export interface EditRestaurantRequest extends InferType<typeof editRestaurantSchema> {
  [key: string]: any
}