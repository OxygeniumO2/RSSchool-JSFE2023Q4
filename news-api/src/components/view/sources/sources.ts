import './sources.css';
import { IApiResponseByCategory } from '../../../ts_features/interfaces';
import { DrawFunc } from '../../../ts_features/funcTypes';

class Sources {
    draw: DrawFunc<IApiResponseByCategory> = (data) => {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp && sourceItemTemp instanceof HTMLTemplateElement) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                sourceClone.querySelector('.source__item-name')!.textContent = item.name;
                sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            });

            const sources = document.querySelector('.sources');
            if (sources) sources.append(fragment);
        }
    };
}

export default Sources;
