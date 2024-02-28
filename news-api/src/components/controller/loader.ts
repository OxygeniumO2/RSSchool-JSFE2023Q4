import { ILoader, ILoaderOptions, IGetRespParams } from '../../ts_features/interfacesController';
import { IApiResponseSources } from '../../ts_features/interfaces';
import { LoaderErrorStatusCodes } from '../../ts_features/enums';
import { consoleErrorNoGET } from '../../ts_features/funcTypes';

class Loader implements ILoader {
    baseLink: string;
    options: ILoaderOptions;

    constructor(baseLink: string, options: ILoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: IGetRespParams, callback = consoleErrorNoGET) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (res.ok) {
            return res;
        }

        if (res.status === LoaderErrorStatusCodes.Unauthorized || res.status === LoaderErrorStatusCodes.Forbidden) {
            console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
        }

        throw Error(res.statusText);
    }

    makeUrl(options: ILoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IApiResponseSources) => void, options: ILoaderOptions) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
