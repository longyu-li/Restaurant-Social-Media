export interface Restaurant {
    id: number;
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