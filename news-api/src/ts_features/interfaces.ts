// Interfaces from Api?????

// interface IApiResponseSources {
//     id: string;
//     name: string;
//     description: string;
//     url: string;
//     category: string;
//     language: string;
//     country: string;
// }
// export interface IApiResponse {
//     status: string;
//     sources: IApiResponseSources[];
// }

// Interfaces from Api END

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
