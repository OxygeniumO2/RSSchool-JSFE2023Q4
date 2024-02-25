export interface IApiResponse {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

export interface IApiResponseByCategory {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface INewsAndSources {
    draw(data: IApiResponse[] | IApiResponseByCategory[]): void;
}

export interface IDrawNewsData {
    articles: IApiResponse[];
    status: string;
    totalResults: number;
}

interface IApiResponseSources {
    status: string;
    sources: IApiResponseSourcesArr[];
}

interface IApiResponseSourcesArr {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IDrawSourceData {
    sources: IApiResponseSources;
}
export interface IAppView {
    news: INewsAndSources;
    sources: INewsAndSources;
    drawNews(data: IDrawNewsData): void;
    drawSources(data: IDrawSourceData): void;
}
