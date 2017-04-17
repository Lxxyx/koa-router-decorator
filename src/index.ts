import * as Router from 'koa-router'

const Route = {
  init(opts: Router.IRouterOptions = {}): ClassDecorator {
    return function (constructor: any) {
      const router = new Router(opts)
      const app = new constructor()
      for (let method in app.route) {
        for (let path in app.route[method]) {
          const route = app.route[method][path]
          if (route.middwares) {
            router[method](path, route.middwares, app[route.funcName])
          } else {
            router[method](path, app[route.funcName])
          }
        }
      }
      // return a custom constructor
      return function () {
        // return router as new result
        return router
      }
    }
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
}

function methodHandler(method: string, middwares?: Router.IMiddleware[]) {
  return function (path: string) {
    return function (target: any, funcName: string, descriptor: PropertyDescriptor) {
      if (!target['route']) {
        target['route'] = {}
      }
      if (!target.route[method]) {
        target.route[method] = {}
      }
      target.route[method][path] = {
        path,
        funcName,
        middwares
      }
    }
  }
}

export default Route
