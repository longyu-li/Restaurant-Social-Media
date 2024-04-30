import {object, string, InferType, mixed, number} from "yup";
import {REQUIRED} from "./utils";

export const addMenuItemSchema = object({
    image: mixed().test("file", "An image is required.", files => files && files.length > 0),
    price: number()
      .typeError("Price must be a number.")
      .required(REQUIRED)
      .min(0, "Price must be greater than or equal to 0.")
      .lessThan(1000000, "Price must be less than 1000000."),
    name: string().required(REQUIRED),
    description: string().required(REQUIRED),
}).required();

export interface addMenuItemRequest extends Omit<InferType<typeof addMenuItemSchema>, "price"> {
    [key: string]: any;
    price: string;
}
