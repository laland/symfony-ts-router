import {SingletonRouter} from "./singleton-router";

export * from "../router";

window['Routing'] = SingletonRouter.getInstance();

window['fos'] = {
    Router: SingletonRouter
};