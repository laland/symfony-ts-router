import {Router, RoutingData} from "./router";

export class SingletonRouter
{
    private static readonly instance = new Router();

    static getInstance(): Router
    {
        return this.instance;
    }

    static setData(data: RoutingData): void
    {
        SingletonRouter.getInstance().setRoutingData(data);
    }
}