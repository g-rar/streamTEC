import { VideoListResponse } from '../models/ytApi';
import { MusicTrack, Video } from '../models/product';

export class ProductBuilder {

    constructor() {}

    buildAsTrack(response:VideoListResponse, chanelMode:"stereo"|"mono", album:string, price:number):MusicTrack{
        let videoData = response.items[0]
        let duration = this.formatDurationStr(videoData.contentDetails.duration)
        return {
            id: videoData.id,
            title: videoData.snippet.title,
            author: videoData.snippet.channelTitle,
            duration: duration,
            price:price,
            channelMode: chanelMode,
            album: album,
            description: videoData.snippet.description,
            type: "music",
            image: videoData.snippet.thumbnails
        }
    }

    buildAsVideo(response:VideoListResponse, price:number):Video{
        let videoData = response.items[0]
        let duration = this.formatDurationStr(videoData.contentDetails.duration)
        return {
            id: videoData.id,
            title: videoData.snippet.title,
            author: videoData.snippet.channelTitle,
            duration: duration,
            price:price,
            description: videoData.snippet.description,
            type: "video",
            image: videoData.snippet.thumbnails,
            quality: videoData.contentDetails.definition
        }
    }

    private formatDurationStr(unformated:string){
        let result = unformated.slice(2)
        result = result.replace('H',':').replace('M',':').replace('S','')
        return result
    }
}