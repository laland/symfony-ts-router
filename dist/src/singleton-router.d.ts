import { Router, RoutingData } from "./router";
export declare class SingletonRouter {
    private static readonly instance;
    static getInstance(): Router;
    static setData(data: RoutingData): void;
}
