import {SingletonRouter} from "./singleton-router";

export * from "../router";

export const Routing = SingletonRouter.getInstance();

export const fos = {
    Router: SingletonRouter
};