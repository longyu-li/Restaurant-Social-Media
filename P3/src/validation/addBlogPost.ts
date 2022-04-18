import {object, string, InferType} from "yup";
import {REQUIRED} from "./utils";

export const addBlogPostSchema = object({
    title: string().required(REQUIRED),
    content: string().required(REQUIRED),
}).required();

export interface addBlogPostRequest extends InferType<typeof addBlogPostSchema> {
    [key: string]: any;
}