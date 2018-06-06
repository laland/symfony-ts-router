!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){void 0===e&&(e={}),void 0===t&&(t={}),this.context={base_url:"",prefix:"",host:"",scheme:""},this.context=r({},this.context,e),this.setRoutes(t)}return e.prototype.setRoutingData=function(e){this.setBaseUrl(e.base_url),this.setRoutes(e.routes),"prefix"in e&&this.setPrefix(e.prefix),this.setHost(e.host),this.setScheme(e.scheme)},e.prototype.setRoutes=function(e){this.routes=Object.freeze(e)},e.prototype.getRoutes=function(){return this.routes},e.prototype.setBaseUrl=function(e){this.context.base_url=e},e.prototype.getBaseUrl=function(){return this.context.base_url},e.prototype.setPrefix=function(e){this.context.prefix=e},e.prototype.setScheme=function(e){this.context.scheme=e},e.prototype.getScheme=function(){return this.context.scheme},e.prototype.setHost=function(e){this.context.host=e},e.prototype.getHost=function(){return this.context.host},e.prototype.getRoute=function(e){var t=this.context.prefix+e;if(t in this.routes)return this.routes[t];if(e in this.routes)return this.routes[e];throw new Error('The route "'+e+'" does not exist.')},e.prototype.generate=function(e,t,n){var i=this;void 0===t&&(t={}),void 0===n&&(n=!1);var s=this.getRoute(e),u=r({},t),a="",c=!0,f="";if(s.tokens.forEach(function(n){var r=i.parseToken(n);if(o.Text===r.type)return a=r.pattern+a,void(c=!1);if(o.Variable!==r.type);else{var f=s.defaults&&r.name in s.defaults;if(!1===c||!f||r.name in t&&t[r.name]!=s.defaults[r.name]){var p=void 0;if(r.name in t)p=t[r.name],delete u[r.name];else{if(!f){if(c)return;throw new Error('The route "'+e+'" requires the parameter "'+r.name+'".')}p=s.defaults[r.name]}if(!(!0===p||!1===p||""===p)||!c){var l=encodeURIComponent(p).replace(/%2F/g,"/");"null"===l&&null===p&&(l=""),a=r.prefix+l+a}c=!1}else f&&r.name in u&&delete u[r.name]}}),""===a&&(a="/"),Array.isArray(s.hosttokens)&&s.hosttokens.forEach(function(e){var n,r=i.parseToken(e);o.Text!==r.type?o.Variable===r.type&&(r.name in t?(n=t[r.name],delete u[r.name]):s.defaults&&r.name in s.defaults&&(n=s.defaults[r.name]),f=r.prefix+n+f):f=r.pattern+f}),a=this.getBaseUrl()+a,s.requirements&&"_scheme"in s.requirements&&this.getScheme()!=s.requirements._scheme?a=s.requirements._scheme+"://"+(f||this.getHost())+a:void 0!==s.schemes&&void 0!==s.schemes[0]&&this.getScheme()!==s.schemes[0]?a=s.schemes[0]+"://"+(f||this.getHost())+a:f&&this.getHost()!==f?a=this.getScheme()+"://"+f+a:!0===n&&(a=this.getScheme()+"://"+this.getHost()+a),Object.keys(u).length>0){var p=[],l=function(e,t){t=null===(t="function"==typeof t?t():t)?"":t,p.push(encodeURIComponent(e)+"="+encodeURIComponent(t))};for(var h in u)this.buildQueryParams(h,u[h],l);a=a+"?"+p.join("&").replace(/%20/g,"+")}return a},e.prototype.buildQueryParams=function(e,t,n){var r=this,o=new RegExp(/\[\]$/);if(t instanceof Array)t.forEach(function(t,i){o.test(e)?n(e,t):r.buildQueryParams(e+"["+("object"==typeof t?i:"")+"]",t,n)});else if("object"==typeof t)for(var i in t)this.buildQueryParams(e+"["+i+"]",t[i],n);else n(e,t)},e.prototype.parseToken=function(e){var t,n,r,i;switch(e[0]){case o.Text:t=e[0],r=e[1];break;case o.Variable:t=e[0],n=e[1],r=e[2],i=e[3];break;default:throw new Error('The token type "'+t+'" is not supported.')}return{type:t,prefix:n,pattern:r,name:i}},e}();t.Router=i,function(e){e.Text="text",e.Variable="variable"}(o=t.TokenType||(t.TokenType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(){function e(){}return e.getInstance=function(){return this.instance},e.setData=function(t){e.getInstance().setRoutingData(t)},e.instance=new r.Router,e}();t.SingletonRouter=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);!function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(0)),t.Routing=r.SingletonRouter.getInstance(),t.fos={Router:r.SingletonRouter}}])});
//# sourceMappingURL=index.js.map