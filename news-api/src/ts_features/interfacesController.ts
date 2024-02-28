import { IApiResponseSources, IDrawNewsData, IDrawSourceData } from './interfaces';

export interface ILoaderOptions {
    [key: string]: string;
}

export interface ILoader {
    baseLink: string;
    options: ILoaderOptions;
    getResp({ endpoint, options }: { endpoint: string; options: ILoaderOptions; callBack: () => void }): void;
    errorHandler(res: Response): Response;
    makeUrl(options: ILoaderOptions, endpoint: string): string;
    load(
        method: string,
        endpoint: string,
        callback: (data: IApiResponseSources) => void,
        options: ILoaderOptions
    ): void;
}

export interface IGetRespParams {
    endpoint: string;
    options: ILoaderOptions;
}

export interface IAppController extends ILoader {
    getSources(callBack?: (data: IDrawSourceData) => void): void;
    getNews(
        e: { target: HTMLElement; currentTarget: HTMLElement } | Event,
        callBack?: (data: IDrawNewsData) => void
    ): void;
}
