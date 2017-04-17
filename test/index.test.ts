import test from 'ava'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as supertest from 'supertest-as-promised'
import Route from '../src/index'

test('Route is an object', t => {
  t.true(Route instanceof Object)
})

test('Get should return 200', async t => {
  @Route.init()
  class TestRoute {
    @Route.get('/')
    index(ctx: Koa.Context) {
      ctx.body = 'Hello World'
    }
  }
  const testRoute = new TestRoute()

  const app = new Koa()
  app.use((testRoute as any).routes())
  const res = await supertest(app.listen())
    .get('/')
    .expect(200)
  t.true(res.text === 'Hello World')
})

test('Get async support', async t => {
  @Route.init()
  class TestRoute {
    @Route.get('/')
    async index(ctx: Koa.Context) {
      const result = await Promise.resolve(1)
      ctx.body = result
    }
  }
  const testRoute = new TestRoute()

  const app = new Koa()
  app.use((testRoute as any).routes())

  const res = await supertest(app.listen())
    .get('/')
    .expect(200)

  t.true(res.text === '1')
})

test('Prefix support', async t => {
  @Route.init({
    prefix: '/api'
  })
  class TestRoute {
    @Route.get('/')
    async index(ctx: Koa.Context) {
      const result = await Promise.resolve(1)
      ctx.body = result
    }

    @Route.get('/test')
    testPage(ctx: Koa.Context) {
      ctx.body = 'this is testpage'
    }
  }
  const testRoute = new TestRoute()

  const app = new Koa()
  app.use((testRoute as any).routes())

  const api = await supertest(app.listen())
    .get('/api')
    .expect(200)

  t.true(api.text === '1')

  const testpage = await supertest(app.listen())
    .get('/api/test')
    .expect(200)

  t.true(testpage.text === 'this is testpage')
})
