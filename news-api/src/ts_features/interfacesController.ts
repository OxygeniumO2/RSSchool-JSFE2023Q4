import { IApiResponseSources } from './interfaces';

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

export interface IController extends ILoader {
    getSources(callBack: () => void): void;
    getNews(e: { target: HTMLElement; currentTarget: HTMLElement }, callBack: () => void): void;
}
