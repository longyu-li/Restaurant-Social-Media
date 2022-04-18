import {object, string, InferType, mixed} from "yup";
import {PRICE_REGEX, REQUIRED} from "./utils";

export const addMenuItemSchema = object({
    image: mixed().test("file", "An image is required.", files => files && files.length > 0),
    price: mixed().required(REQUIRED).test('validPrice', "A valid price is required.", value => !isNaN(value) && PRICE_REGEX.test(value)),
    name: string().required(REQUIRED),
    description: string().required(REQUIRED)
}).required();

export interface addMenuItemRequest extends InferType<typeof addMenuItemSchema> {
    [key: string]: any
}
