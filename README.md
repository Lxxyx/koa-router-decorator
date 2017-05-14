![build status](https://travis-ci.org/Lxxyx/koa-router-decorator.svg?branch=master)

# Intro
Use decorator for koa.

Support typescript with experimentalDecorators, but not test on javascript.

## Usage

First, in your `tsconfig.json`, set `experimentalDecorators` to `true`.

```js
import Route from 'koa-router-decorator'
import Koa from 'koa'

@Route.init()
class TestRoute {
  @Route.get('/')
  async index (ctx: Koa.Context) {
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

```
