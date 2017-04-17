"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Koa = require("koa");
const supertest = require("supertest-as-promised");
const index_1 = require("../src/index");
ava_1.default('Route is an object', t => {
    t.true(index_1.default instanceof Object);
});
ava_1.default('Get should return 200', (t) => __awaiter(this, void 0, void 0, function* () {
    let TestRoute = class TestRoute {
        index(ctx) {
            ctx.body = 'Hello World';
        }
    };
    __decorate([
        index_1.default.get('/')
    ], TestRoute.prototype, "index", null);
    TestRoute = __decorate([
        index_1.default.init()
    ], TestRoute);
    const testRoute = new TestRoute();
    const app = new Koa();
    app.use(testRoute.routes());
    const res = yield supertest(app.listen())
        .get('/')
        .expect(200);
    t.true(res.text === 'Hello World');
}));
ava_1.default('Get async support', (t) => __awaiter(this, void 0, void 0, function* () {
    let TestRoute = class TestRoute {
        index(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield Promise.resolve(1);
                ctx.body = result;
            });
        }
    };
    __decorate([
        index_1.default.get('/')
    ], TestRoute.prototype, "index", null);
    TestRoute = __decorate([
        index_1.default.init()
    ], TestRoute);
    const testRoute = new TestRoute();
    const app = new Koa();
    app.use(testRoute.routes());
    const res = yield supertest(app.listen())
        .get('/')
        .expect(200);
    t.true(res.text === '1');
}));
ava_1.default('Prefix support', (t) => __awaiter(this, void 0, void 0, function* () {
    let TestRoute = class TestRoute {
        index(ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield Promise.resolve(1);
                ctx.body = result;
            });
        }
        testPage(ctx) {
            ctx.body = 'this is testpage';
        }
    };
    __decorate([
        index_1.default.get('/')
    ], TestRoute.prototype, "index", null);
    __decorate([
        index_1.default.get('/test')
    ], TestRoute.prototype, "testPage", null);
    TestRoute = __decorate([
        index_1.default.init({
            prefix: '/api'
        })
    ], TestRoute);
    const testRoute = new TestRoute();
    const app = new Koa();
    app.use(testRoute.routes());
    const api = yield supertest(app.listen())
        .get('/api')
        .expect(200);
    t.true(api.text === '1');
    const testpage = yield supertest(app.listen())
        .get('/api/test')
        .expect(200);
    t.true(testpage.text === 'this is testpage');
}));
