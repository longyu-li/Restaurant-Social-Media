import { Restaurant } from "./restaurant";

export interface BlogPost {
    id: number,
    title: string,
    likes: number,
    content: string,
    date: string,
    restaurant: Restaurant
}

export interface FeedResponse {
    next: string | null,
    previouse: string | null,
    results: BlogPost[]
}