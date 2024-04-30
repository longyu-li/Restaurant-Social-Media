import {User} from "./user";

export interface Restaurant {
    id: number;
    user: User;
    name: string;
    address: string;
    logo: string;
    phone_num: string;
    banner: string;
    description: string;
    follows: number;
    likes: number;
}

export interface SearchResult {
    next: string | null,
    previous: string | null,
    results: Restaurant[]
}