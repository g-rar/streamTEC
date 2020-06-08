import { Thumbnails } from './ytApi';

export interface Product{
    id:string
    title:string
    description:string
    author:string
    price:number
    type: "music" | "video"
    image?:Thumbnails
}

export interface Video extends Product{
    duration: string
    quality: string
}

export interface MusicTrack extends Product{
    duration: string
    channelMode: "stereo"|"mono"
    album: string
}
