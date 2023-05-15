# Deprecated
since https://github.com/FriendsOfSymfony/FOSJsRoutingBundle/pull/406 is merged

# Description

This is a Typescript port of [js router](https://github.com/FriendsOfSymfony/FOSJsRoutingBundle/blob/master/Resources/js/router.js) from [FOSJsRoutingBundle](https://github.com/FriendsOfSymfony/FOSJsRoutingBundle), 
that is used to expose Symfony app routing in your JavaScript code. 

Following the original package [readme](https://github.com/FriendsOfSymfony/FOSJsRoutingBundle#readme):
> That means you'll be able to generate URL with given parameters 
like you can do with the Router component provided in the Symfony2 core.
                                                                                                                                                                                                                                                                                           
The problem is that there is no npm package for that router, so the only way to obtain it 
is to install `FOSJsRoutingBundle` with composer, which can be painful in pure-frontend repos, for example.
So that is the missing one package.

Btw, there is other packages like this as well:
- https://www.npmjs.com/package/fos-routing 
- https://github.com/vladislavs/fosjsrouting-wrapper

lots of them

**PR`s are greatly welcomed.**

# Why should you use it

- Original code rewritten in typescript, so its typings are always inlined with the code
- All original test cases are here, and they are still green
- There is es5 UMD modules, source maps and `d.ts` declarations 


# Installation

With npm:
```
npm install symfony-ts-router --save
```

# Usage

## With script tags
 
routes should be dumped in `js` format (which is default), 
and you should use `symfony-ts-router/dist/shim.js`
 
 in twig:
 ```twig
 <script src="{{ asset('node_modules/symfony-ts-router/dist/shim.js') }}"></script>
 <script src="{{ path('fos_js_routing_js', { callback: 'fos.Router.setData' }) }}"></script>
 ```
 or plain html:
  ```html
  <script src="/node_modules/symfony-ts-router/dist/shim.js"></script>
  <script src="/js/fos_js_routes.js"></script>
  ```
  
## In javascript

You can create router instance yourself and consume `json` routes
 ```js
import {Router} from 'symfony-ts-router';
import routes from '../../web/js/fos_js_routes.json';

const router = new Router();

router.setRoutingData(routes);
router.generate('homepage');
```

You can use **singleton** version provided in the `shim` package:
 ```js
import {Routing} from 'symfony-ts-router/dist/shim';
import routes from '../../web/js/fos_js_routes.json';

Routing.setData(routes);
Routing.generate('homepage');
```

You can use `js` format routes (with default callback, which is: `fos.Router.setData`)
 ```js
import {Routing} from 'symfony-ts-router/dist/shim';
import '../../web/js/fos_js_routes.js';

Routing.generate('homepage');
```
