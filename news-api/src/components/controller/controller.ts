import { IController } from '../../ts_features/interfacesController';
import AppLoader from './appLoader';

class AppController extends AppLoader implements IController {
    getSources(callback: () => void) {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback
        );
        console.log(callback, typeof callback, ' - callback getresp');
    }

    getNews(e: { target: HTMLElement; currentTarget: HTMLElement }, callback: () => void) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer && target) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
