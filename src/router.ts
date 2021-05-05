export class Router
{
    private context: Context = {base_url: '', prefix: '', host: '', scheme: ''};
    private routes: RoutesMap;

    constructor(context: Partial<Context> = {}, routes: RoutesMap = {})
    {
        this.context = {...this.context, ...context};
        this.setRoutes(routes);
    }

    setRoutingData(data: RoutingData): void
    {
        this.setBaseUrl(data.base_url);
        this.setRoutes(data.routes);

        if ('prefix' in data) {
            this.setPrefix(data.prefix);
        }

        this.setHost(data.host);
        this.setScheme(data.scheme);
    }

    setRoutes(routes: RoutesMap): void
    {
        this.routes = Object.freeze(routes);
    }

    getRoutes(): RoutesMap
    {
        return this.routes;
    }

    setBaseUrl(baseUrl: string): void
    {
        this.context.base_url = baseUrl;
    }

    getBaseUrl(): string
    {
        return this.context.base_url;
    }

    setPrefix(prefix: string): void
    {
        this.context.prefix = prefix;
    }

    setScheme(scheme: string): void
    {
        this.context.scheme = scheme;
    }

    getScheme(): string
    {
        return this.context.scheme;
    }

    setHost(host: string): void
    {
        this.context.host = host;
    }

    getHost(): string
    {
        return this.context.host;
    }

    getRoute(name: string): Route
    {
        const prefixedName = this.context.prefix + name;

        if (prefixedName in this.routes) {
            return this.routes[prefixedName]

        } else if (name in this.routes) {
            return this.routes[name]
        }

        throw new Error(`The route "${name}" does not exist.`);
    }

    generate(name: string, params: RouteParams = {}, absolute = false): string
    {
        const route = this.getRoute(name);

        let unusedParams = {...params};
        let url = '';
        let isOptional = true;
        let host = '';

        route.tokens.forEach(rawToken => {

            const token = this.parseToken(rawToken);

            if (TokenType.Text === token.type) {
                url = token.pattern + url;
                isOptional = false;

                return;
            }

            if (TokenType.Variable === token.type) {
                let hasDefault = route.defaults && (token.name in route.defaults);
                if (false === isOptional
                    || !hasDefault
                    || ((token.name in params) && params[token.name] != route.defaults[token.name])
                ) {
                    let value;

                    if (token.name in params) {
                        value = params[token.name];
                        delete unusedParams[token.name];

                    } else if (hasDefault) {
                        value = route.defaults[token.name];

                    } else if (isOptional) {
                        return;

                    } else {
                        throw new Error(`The route "${name}" requires the parameter "${token.name}".`);
                    }

                    const isEmpty = true === value || false === value || '' === value;

                    if (!isEmpty || !isOptional) {
                        let encodedValue = encodeURIComponent(value).replace(/%2F/g, '/');

                        if ('null' === encodedValue && null === value) {
                            encodedValue = '';
                        }

                        url = token.prefix + encodedValue + url;
                    }

                    isOptional = false;

                } else if (hasDefault && (token.name in unusedParams)) {
                    delete unusedParams[token.name];
                }

                return;
            }
        });

        if (url === '') {
            url = '/';
        }

        if (Array.isArray(route.hosttokens)) {
            route.hosttokens.forEach(rawToken => {
                let value: string|number;

                const token = this.parseToken(rawToken);

                if (TokenType.Text === token.type) {
                    host = token.pattern + host;
                    return;
                }

                if (TokenType.Variable === token.type) {
                    if (token.name in params) {
                        value = params[token.name];
                        delete unusedParams[token.name];

                    } else if (route.defaults && (token.name in route.defaults)) {
                        value = route.defaults[token.name];
                    }

                    host = token.prefix + value + host;
                }
            });
        }

        url = this.getBaseUrl() + url;
        if (route.requirements && ("_scheme" in route.requirements) && this.getScheme() != route.requirements["_scheme"]) {
            url = route.requirements["_scheme"] + "://" + (host || this.getHost()) + url;

        } else if ("undefined" !== typeof route.schemes
            && "undefined" !== typeof route.schemes[0]
            && this.getScheme() !== route.schemes[0]
        ) {
            url = route.schemes[0] + "://" + (host || this.getHost()) + url;

        } else if (host && this.getHost() !== host) {
            url = this.getScheme() + "://" + host + url;

        } else if (absolute === true) {
            url = this.getScheme() + "://" + this.getHost() + url;
        }

        if (Object.keys(unusedParams).length > 0) {
            let queryParams = [];
            const add = (key, value) => {
                value = (typeof value === 'function') ? value() : value;
                value = (value === null) ? '' : value;

                queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            };

            for (let prefix in unusedParams) {
                this.buildQueryParams(prefix, unusedParams[prefix], add);
            }

            url = url + '?' + queryParams.join('&').replace(/%20/g, '+');
        }

        return url;
    }

    private buildQueryParams(prefix: string, params: any[]|object|string, add: QueryParamAddFunction): void
    {
        const rbracket = new RegExp(/\[\]$/);

        if (params instanceof Array) {
            params.forEach((val, i) => {
                if (rbracket.test(prefix)) {
                    add(prefix, val);
                } else {
                    this.buildQueryParams(`${prefix}[${typeof val === 'object' ? i : ''}]`, val, add);
                }
            });

        } else if (typeof params === 'object') {
            for (let name in params) {
                this.buildQueryParams(`${prefix}[${name}]`, params[name], add);
            }

        } else {
            add(prefix, params);
        }
    }

    private parseToken(token: Token): ParsedToken
    {
        let type, prefix, pattern, name;

        switch (token[0]) {
            case TokenType.Text:
                [type, pattern] = token;
                break;

            case TokenType.Variable:
                [type, prefix, pattern, name] = token;
                break;

            default:
                throw new Error(`The token type "${type}" is not supported.`);
        }

        return {type, prefix, pattern, name}
    }
}

export type RouteDefaults = {[index:string]: string|number}

export type RouteRequirements = {[index:string]: string|number}

export type RouteParams = {[index:string]: any}

export type RoutesMap = {[index: string]: Route}

export interface QueryParamAddFunction
{
    (prefix: string, params: any): void;
}

export interface Route
{
    tokens: Token[]
    defaults?: RouteDefaults
    requirements?: RouteRequirements
    hosttokens?: Token[]
    schemes?: string[]
    methods?: string[]
}

export interface RoutingData extends Context
{
    routes: RoutesMap
}

export interface Context
{
    base_url: string;
    prefix?: string
    host?: string
    scheme?: string
}

export enum TokenType
{
    Text = 'text',
    Variable = 'variable',
}

export type Token = (string|boolean)[]

export interface ParsedToken
{
    type: TokenType
    prefix: string
    pattern: string
    name: string
}
