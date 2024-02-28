import './sources.css';
import { IApiResponseByCategory, INewsAndSources } from '../../../ts_features/interfaces';
import { DrawFunc } from '../../../ts_features/funcTypes';

class Sources implements INewsAndSources {
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
            sources && sources.append(fragment);
        } else {
            throw new Error('sourceItemTemp is null');
        }
    };
}

export default Sources;
