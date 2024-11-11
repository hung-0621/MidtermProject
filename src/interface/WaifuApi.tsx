import { Dispatch, SetStateAction } from "react";

export interface Tag {
    description: string;
    is_nsfw: boolean;
    name: string;
    tag_id: number;
}

export interface Artist {
    artist_id: number;
    deviant_art: string;
    name: string;
    patreon: string;
    pixiv: string;
    twitter: string;
}

export interface Image {
    artist: Artist;
    byte_size: number;
    dominant_color: string;
    extension: string;
    favorites: number;
    height: number;
    image_id: number;
    is_nsfw: boolean;
    liked_at: string;
    preview_url: string;
    signature: string;
    source: string;
    tags: Tag[];
    uploaded_at: string;
    url: string;
    width: number;
}

export interface ImageData {
    images: Image[];
}

export default interface WaifuApiProps{
    is_nsfw:boolean
    secret:string
    input:string
    maxInputLen:number
    setIs_nsfw: Dispatch<SetStateAction<boolean>>
    setInput: Dispatch<SetStateAction<string>>
}