import App from './components/app/app';
import './global.css';
import { IApp } from './ts_features/interfacesApp';

const app: IApp = new App();
app.start();
