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
            const searchInput = document.querySelector('.search__input') as HTMLInputElement;
            searchInput?.addEventListener('input', () => {
                const sourceItem = document.querySelectorAll('.source__item');
                const sourcesItemNames = document.querySelectorAll('.source__item-name');
                const inputText = searchInput.value.trim().toLowerCase();
                sourceItem.forEach((item, index) => {
                    const itemName = sourcesItemNames[index].textContent?.trim().toLowerCase();
                    if (itemName && !itemName.includes(inputText)) {
                        item.classList.add('_hidden');
                    } else {
                        item.classList.remove('_hidden');
                    }
                });
            });
        }
        this.controller.getSources((data: IDrawSourceData) => this.view.drawSources(data));
    }
}

export default App;
