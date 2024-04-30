import { object, string, InferType } from "yup";
import { REQUIRED } from "./utils";

export const signInSchema = object({
  email: string().required(REQUIRED).email("Enter a valid email address."),
  password: string().required(REQUIRED)
}).required();

export interface SignInRequest extends InferType<typeof signInSchema> {}
