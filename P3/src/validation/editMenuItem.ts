import {object, string, InferType, mixed, number} from "yup";

export const editMenuItemSchema = object({
    image: mixed().test("file", "An image is required.", files => files && files.length > 0),
    price: number()
        .typeError("Price must be a number.")
        .min(0, "Price must be greater than or equal to 0.")
        .lessThan(1000000, "Price must be less than 1000000."),
    name: string(),
    description: string(),
}).required();

export interface editMenuItemRequest extends Omit<InferType<typeof editMenuItemSchema>, "price"> {
    [key: string]: any;
    price: string;
}