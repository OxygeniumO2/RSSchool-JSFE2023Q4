import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp } from '../../ts_features/interfacesApp';
import { IAppController } from '../../ts_features/interfacesController';
import { IAppView, IDrawNewsData, IDrawSourceData } from '../../ts_features/interfaces';

class App implements IApp {
    controller: IAppController;
    view: IAppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: IDrawNewsData) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: IDrawSourceData) => this.view.drawSources(data));
    }
}

export default App;
