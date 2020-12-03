!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).promisePolyfill=e()}}(function(){return function(){return function e(t,n,o){function r(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var a=n[u]={exports:{}};t[u][0].call(a.exports,function(e){return r(t[u][1][e]||e)},a,a.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}}()({1:[function(e,t,n){var o,r,i=t.exports={};function u(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function f(e){if(o===setTimeout)return setTimeout(e,0);if((o===u||!o)&&setTimeout)return o=setTimeout,setTimeout(e,0);try{return o(e,0)}catch(t){try{return o.call(null,e,0)}catch(t){return o.call(this,e,0)}}}!function(){try{o="function"==typeof setTimeout?setTimeout:u}catch(e){o=u}try{r="function"==typeof clearTimeout?clearTimeout:c}catch(e){r=c}}();var l,a=[],s=!1,d=-1;function h(){s&&l&&(s=!1,l.length?a=l.concat(a):d=-1,a.length&&p())}function p(){if(!s){var e=f(h);s=!0;for(var t=a.length;t;){for(l=a,a=[];++d<t;)l&&l[d].run();d=-1,t=a.length}l=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function y(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new m(e,t)),1!==a.length||s||f(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=y,i.addListener=y,i.once=y,i.off=y,i.removeListener=y,i.removeAllListeners=y,i.emit=y,i.prependListener=y,i.prependOnceListener=y,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],2:[function(e,t,n){(function(t,o){var r=e("process/browser.js").nextTick,i=Function.prototype.apply,u=Array.prototype.slice,c={},f=0;function l(e,t){this._id=e,this._clearFn=t}n.setTimeout=function(){return new l(i.call(setTimeout,window,arguments),clearTimeout)},n.setInterval=function(){return new l(i.call(setInterval,window,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(e){e.close()},l.prototype.unref=l.prototype.ref=function(){},l.prototype.close=function(){this._clearFn.call(window,this._id)},n.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},n.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},n._unrefActive=n.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n.setImmediate="function"==typeof t?t:function(e){var t=f++,o=!(arguments.length<2)&&u.call(arguments,1);return c[t]=!0,r(function(){c[t]&&(o?e.apply(null,o):e.call(null),n.clearImmediate(t))}),t},n.clearImmediate="function"==typeof o?o:function(e){delete c[e]}}).call(this,e("timers").setImmediate,e("timers").clearImmediate)},{"process/browser.js":1,timers:2}],3:[function(e,t,n){(function(e){"use strict";var n=setTimeout;function o(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],a(e,this)}function i(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(e){return void c(t.promise,e)}u(t.promise,o)}else(1===e._state?u:c)(t.promise,e._value)})):e._deferreds.push(t)}function u(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void a((o=n,i=t,function(){o.apply(i,arguments)}),e)}e._state=1,e._value=t,f(e)}catch(t){c(e,t)}var o,i}function c(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)i(e,e._deferreds[t]);e._deferreds=null}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function a(e,t){var n=!1;try{e(function(e){n||(n=!0,u(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}r.prototype.catch=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(o);return i(this,new l(e,t,n)),n},r.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},r.all=function(e){return new r(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var r=o.length;function i(e,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var c=u.then;if("function"==typeof c)return void c.call(u,function(t){i(e,t)},n)}o[e]=u,0==--r&&t(o)}catch(e){n(e)}}for(var u=0;u<o.length;u++)i(u,o[u])})},r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,n){for(var o=0,r=e.length;o<r;o++)e[o].then(t,n)})},r._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){n(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=r}).call(this,e("timers").setImmediate)},{timers:2}]},{},[3])(3)});
