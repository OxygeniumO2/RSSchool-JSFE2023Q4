import {
    IAppView,
    IDrawNewsData,
    IDrawSourceData,
    INewsAndSources,
    IApiResponseByCategory,
} from '../../ts_features/interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements IAppView {
    news: INewsAndSources;
    sources: INewsAndSources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDrawNewsData) {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: IDrawSourceData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values as IApiResponseByCategory[]);
    }
}

export default AppView;
