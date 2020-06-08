export interface Default {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Medium extends Thumbnail {
}

export interface High extends Thumbnail {
}

export interface Standard extends Thumbnail {
}

export interface Maxres extends Thumbnail {
}

export interface Thumbnails {
    default: Default;
    medium: Medium;
    high: High;
    standard?: Standard;
    maxres?: Maxres;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Snippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: Localized;
    defaultAudioLanguage: string;
}

export interface ContentRating {
}

export interface ContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: ContentRating;
    projection: string;
}

export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetails;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface VideoListResponse {
    kind: string;
    etag: string;
    items: Item[];
    pageInfo: PageInfo;
}
