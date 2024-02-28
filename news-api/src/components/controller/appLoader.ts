import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl: string | undefined = process.env.API_URL;
        const apiKey: string | undefined = process.env.API_KEY;

        if (apiUrl && apiKey) {
            super(apiUrl, { apiKey });
        }
    }
}

export default AppLoader;
