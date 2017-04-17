"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Route = {
    init(opts = {}) {
        return function (constructor) {
            const router = new Router(opts);
            const app = new constructor();
            for (let method in app.route) {
                for (let path in app.route[method]) {
                    const route = app.route[method][path];
                    if (route.middwares) {
                        router[method](path, route.middwares, app[route.funcName]);
                    }
                    else {
                        router[method](path, app[route.funcName]);
                    }
                }
            }
            // return a custom constructor
            return function () {
                // return router as new result
                return router;
            };
        };
    },
    all: methodHandler('all'),
    get: methodHandler('get'),
    post: methodHandler('post'),
    put: methodHandler('put'),
    delete: methodHandler('delete'),
    del: methodHandler('del'),
    head: methodHandler('head'),
    options: methodHandler('options'),
    patch: methodHandler('patch'),
    redirect: methodHandler('redirect')
};
function methodHandler(method, middwares) {
    return function (path) {
        return function (target, funcName, descriptor) {
            if (!target['route']) {
                target['route'] = {};
            }
            if (!target.route[method]) {
                target.route[method] = {};
            }
            target.route[method][path] = {
                path,
                funcName,
                middwares
            };
        };
    };
}
exports.default = Route;
