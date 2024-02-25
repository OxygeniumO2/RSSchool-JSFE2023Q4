import { IAppController } from './interfacesController';
import { IAppView } from './interfaces';

export interface IApp {
    controller: IAppController;
    view: IAppView;
    start(): void;
}
