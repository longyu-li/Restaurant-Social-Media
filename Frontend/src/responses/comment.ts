import {User} from "./user";

export interface Comment {
    id: number,
    owner: User,
    content: string,
    date: Date,
}