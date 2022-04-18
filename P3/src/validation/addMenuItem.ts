import {object, string, InferType, mixed, number} from "yup";
import {PRICE_REGEX, REQUIRED} from "./utils";

export const addMenuItemSchema = object({
    image: mixed().test("file", "An image is required.", files => files && files.length > 0),
    price: number().required(REQUIRED),
    // price: number().required(REQUIRED).test( "A valid price is required.", value => value ? !!value.toString().match(PRICE_REGEX) : false),
    name: string().required(REQUIRED),
    description: string().required(REQUIRED)
}).required();

export interface addMenuItemRequest extends InferType<typeof addMenuItemSchema> {
    [key: string]: any
}
