import { ILoader, ILoaderOptions } from '../../ts_features/interfacesController';
import { IApiResponseSources } from '../../ts_features/interfaces';
import { LoaderErrorHander } from '../../ts_features/enums';

class Loader implements ILoader {
    baseLink: string;
    options: ILoaderOptions;

    constructor(baseLink: string, options: ILoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options: ILoaderOptions },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options as Record<string, never>);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === LoaderErrorHander.Unauthorized || res.status === LoaderErrorHander.Forbidden)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: ILoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: IApiResponseSources) => void,
        options: ILoaderOptions = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
