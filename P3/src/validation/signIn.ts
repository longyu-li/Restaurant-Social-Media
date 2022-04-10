import { object, string, InferType } from "yup";
import { REQUIRED } from "./utils";

export const signInSchema = object({
  email: string().required(REQUIRED).email(),
  password: string().required(REQUIRED)
}).required();

export interface SignInRequest extends InferType<typeof signInSchema> {}
