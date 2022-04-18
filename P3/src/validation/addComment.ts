import {object, string, InferType} from "yup";
import {REQUIRED} from "./utils";

export const addCommentSchema = object({
    content: string().required(REQUIRED),
}).required();

export interface addCommentRequest extends InferType<typeof addCommentSchema> {
    [key: string]: any;
}