import {Router} from "./router";

describe(Router.name, ()=> {

    describe("generates path", ()=> {

        it("without params", ()=> {
            const router = new Router({}, {
                literal: {
                    tokens: [['text', '/homepage']],
                }
            });

            expect(router.generate('literal')).toBe('/homepage');
        });

        it("with params", ()=> {
            const router = new Router({}, {
                blog_post: {
                    tokens: [['variable', '/', '[^/]+?', 'slug'], ['text', '/blog-post']],
                }
            });

            expect(router.generate('blog_post', {slug: 'foo'})).toBe('/blog-post/foo');
        });

        it("with base url", ()=> {
            const router = new Router({base_url: '/foo'}, {
                homepage: {
                    tokens: [['text', '/bar']],
                }
            });

            expect(router.generate('homepage')).toBe('/foo/bar', );
        });

        it("with scheme requirements", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    requirements: {"_scheme": "https"},
                }
            });

            expect(router.generate('homepage')).toBe('https://localhost/foo/bar');
        });

        it("with host", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    hosttokens: [['text', 'otherhost']]
                }
            });

            expect(router.generate('homepage')).toBe('http://otherhost/foo/bar');
        });

        it("with host when the same scheme requirement given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    requirements: {"_scheme": "http"},
                    hosttokens: [['text', 'otherhost']]
                }
            });

            expect(router.generate('homepage')).toBe('http://otherhost/foo/bar');
        });

        it("with host when the same scheme given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    hosttokens: [['text', 'otherhost']],
                    schemes: ['http'],
                }
            });

            expect(router.generate('homepage')).toBe('http://otherhost/foo/bar');
        });

        it("with host when another scheme requirement given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    requirements: {"_scheme": "https"},
                    hosttokens: [['text', 'otherhost']]
                }
            });

            expect(router.generate('homepage')).toBe('https://otherhost/foo/bar');
        });

        it("with host when another scheme given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    hosttokens: [['text', 'otherhost']],
                    schemes: ['https'],
                }
            });

            expect(router.generate('homepage')).toBe('https://otherhost/foo/bar');
        });

        it("with host placeholders", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    hosttokens: [
                        ['text', '.localhost'],
                        ['variable', '', '', 'subdomain']
                    ]
                }
            });

            expect(router.generate('homepage', {subdomain: 'api'})).toBe('http://api.localhost/foo/bar');
        });

        it("with host placeholders defaults", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    defaults: {subdomain: 'api'},
                    hosttokens: [
                        ['text', '.localhost'],
                        ['variable', '', '', 'subdomain']
                    ]
                }
            });

            expect(router.generate('homepage')).toBe('http://api.localhost/foo/bar');
        });

        it("with optional trailing param", ()=> {
            const router = new Router({}, {
                posts: {
                    tokens: [['variable', '.', '', '_format'], ['text', '/posts']],
                }
            });

            expect(router.generate('posts')).toBe('/posts');
            expect(router.generate('posts', {'_format': 'json'})).toBe('/posts.json');
        });

        it("with query string without defautls", ()=> {
            const router = new Router({}, {
                posts: {
                    tokens: [['variable', '/', '[1-9]+[0-9]*', 'page'], ['text', '/blog-posts']],
                    defaults: {'page' : 1},
                }
            });

            expect(router.generate('posts', {page: 1, extra: 1})).toBe('/blog-posts?extra=1');
        });

        it("with slashes in route attributes", ()=> {
            const router = new Router({}, {
                posts: {
                    tokens: [['variable', '/', '.+', 'id'], ['text', '/blog-post']],
                }
            });

            expect(router.generate('posts', {id: 'foo/bar'})).toBe('/blog-post/foo/bar');
        });

        it("with extra params", ()=> {
            const router = new Router(undefined, {
                foo: {
                    tokens: [['variable', '/', '', 'bar']],
                }
            });

            expect(router.generate('foo', {bar: 'baz', foo: 'bar'})).toBe('/baz?foo=bar');
        });

        it("with deep extra params", ()=> {
            const router = new Router(undefined, {
                foo: {
                    tokens: [['variable', '/', '', 'bar']],
                }
            });

            expect(router.generate('foo', {
                bar: 'baz', // valid param, not included in the query string
                foo: [1, [1, 2, 3, 'foo'], 3, 4, 'bar', [1, 2, 3, 'baz']],
                baz: {
                    foo : 'bar foo',
                    bar : 'baz'
                },
                bob: 'cat'
            })).toBe('/baz?foo%5B%5D=1&foo%5B1%5D%5B%5D=1&foo%5B1%5D%5B%5D=2&foo%5B1%5D%5B%5D=3&foo%5B1%5D%5B%5D=foo&foo%5B%5D=3&foo%5B%5D=4&foo%5B%5D=bar&foo%5B5%5D%5B%5D=1&foo%5B5%5D%5B%5D=2&foo%5B5%5D%5B%5D=3&foo%5B5%5D%5B%5D=baz&baz%5Bfoo%5D=bar+foo&baz%5Bbar%5D=baz&bob=cat');
        });

        it("with null value", ()=> {
            const router = new Router({}, {
                posts: {
                    tokens: [
                        ['variable', '/', '.+', 'id'],
                        ['variable', '/', '.+', 'page'],
                        ['text', '/blog-post']
                    ],
                }
            });

            expect(router.generate('posts', { page: null, id: 10 })).toBe('/blog-post//10');
        });
    });

    describe("generates absolute url", ()=> {

        it("without params", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                }
            });

            expect(router.generate('homepage', [], true)).toBe('http://localhost/foo/bar');
        });

        it("when scheme requirement given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    requirements: {"_scheme": "http"},
                }
            });

            expect(router.generate('homepage', [], true)).toBe('http://localhost/foo/bar');
        });

        it("when scheme given", ()=> {
            const router = new Router({base_url: '/foo', host: "localhost", scheme: "http"}, {
                homepage: {
                    tokens: [['text', '/bar']],
                    schemes: ['http'],
                }
            });

            expect(router.generate('homepage', [], true)).toBe('http://localhost/foo/bar');
        });
    });

    it("generates relative path when the same host given", ()=> {
        const router = new Router({base_url: '/foo', host: "api.localhost", scheme: "http"}, {
            homepage: {
                tokens: [['text', '/bar']],
                hosttokens: [
                    ['text', '.localhost'],
                    ['variable', '', '', 'subdomain']
                ]
            }
        });

        expect(router.generate('homepage', {subdomain: 'api'})).toBe('/foo/bar');
    });

    describe("throws on generate", ()=> {

        it("when required parameter was not given", ()=> {
            const router = new Router({}, {
                foo: {
                    tokens: [['text', '/moo'], ['variable', '/', '', 'bar']],
                }
            });

            expect(() => router.generate('foo')).toThrowError('The route "foo" requires the parameter "bar".');
        });

        it("when non existent route", ()=> {
            const router = new Router();

            expect(() => router.generate('foo')).toThrowError('The route "foo" does not exist.');
        });
    });

    it("returns base url", ()=> {
        const router = new Router({base_url: '/foo'}, {
            homepage: {
                tokens: [['text', '/bar']]
            }
        });

        expect(router.getBaseUrl()).toBe('/foo');
    });

    it("returns route by name", ()=> {
        const router = new Router({}, {
            blog_post: {
                tokens: [['variable', '/', '[^/]+?', 'slug'], ['text', '/blog-post']],
                requirements: {"_scheme": "http"},
            }
        });

        const expected = {
            'tokens' : [
                ['variable', '/', '[^/]+?', 'slug'],
                ['text', '/blog-post']
            ],
            'requirements': {"_scheme": "http"}
        };

        expect(router.getRoute('blog_post')).toEqual(<any>expected);
    });

    it("returns routes", ()=> {
        const router = new Router({}, <any>{
            blog_post: 'test',
            blog: 'test'
        });

        const expected = {
            blog_post: 'test',
            blog: 'test'
        };

        expect(router.getRoutes()).toEqual(<any>expected);
    });

    it("can implement i18n with route prefixes", ()=> {
        const router = new Router({base_url: '/foo', prefix: 'en__RG__'}, {
            en__RG__homepage: {
                tokens: [['text', '/bar']],
            },
            es__RG__homepage: {
                tokens: [['text', '/es/bar']],
            },
            _admin: {
                tokens: [['text', '/admin']],
            }
        });

        expect(router.generate('homepage')).toBe('/foo/bar');
        expect(router.generate('_admin')).toBe('/foo/admin');

        router.setPrefix('es__RG__');
        expect(router.generate('homepage')).toBe('/foo/es/bar');
    });
});