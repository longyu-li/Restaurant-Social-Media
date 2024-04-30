import {object, string, InferType, mixed} from "yup";
import {REQUIRED} from "./utils";

export const addImageSchema = object({
    title: string().required(REQUIRED),
    description: string().required(REQUIRED),
    image: mixed().test("logo", "An Image is required.", files => files && files.length > 0),
}).required();

export interface addImageRequest extends InferType<typeof addImageSchema> {
    [key: string]: any;
}