export declare class Router {
    private context;
    private routes;
    constructor(context?: Partial<Context>, routes?: RoutesMap);
    setRoutingData(data: RoutingData): void;
    setRoutes(routes: RoutesMap): void;
    getRoutes(): RoutesMap;
    setBaseUrl(baseUrl: string): void;
    getBaseUrl(): string;
    setPrefix(prefix: string): void;
    setScheme(scheme: string): void;
    getScheme(): string;
    setHost(host: string): void;
    getHost(): string;
    getRoute(name: string): Route;
    generate(name: string, params?: RouteParams, absolute?: boolean): string;
    private buildQueryParams;
    private parseToken;
}
export declare type RouteDefaults = {
    [index: string]: string | number;
};
export declare type RouteRequirements = {
    [index: string]: string | number;
};
export declare type RouteParams = {
    [index: string]: any;
};
export declare type RoutesMap = {
    [index: string]: Route;
};
export interface QueryParamAddFunction {
    (prefix: string, params: any): void;
}
export interface Route {
    tokens: Token[];
    defaults?: RouteDefaults;
    requirements?: RouteRequirements;
    hosttokens?: Token[];
    schemes?: string[];
    methods?: string[];
}
export interface RoutingData extends Context {
    routes: RoutesMap;
}
export interface Context {
    base_url: string;
    prefix?: string;
    host?: string;
    scheme?: string;
}
export declare enum TokenType {
    Text = "text",
    Variable = "variable"
}
export declare type Token = string[];
export interface ParsedToken {
    type: TokenType;
    prefix: string;
    pattern: string;
    name: string;
}
