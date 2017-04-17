# koa-router-decorator
use decorator width koa-router

## usage
```js
import Route from 'koa-router-decorator'

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

```
