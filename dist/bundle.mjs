import { createRequire as e } from "node:module";

var t = {
    d: (e, o) => {
        for (var n in o) t.o(o, n) && !t.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: o[n]
        });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
}, o = {};

t.d(o, {
    R: () => p
});

const n = e(import.meta.url)("async_hooks");

class s extends Error {
    name;
    constructor(e) {
        super(`${e} context was not provided. It is possible you have multiple versions of SST installed.`), 
        this.name = e;
    }
}

let r = 0;

function a(e) {
    const t = new n.AsyncLocalStorage, o = [];
    const a = {
        name: e,
        with(e, n) {
            const s = (++r).toString();
            return t.run({
                value: e,
                version: s
            }, (() => c(n, (() => function() {
                for (const e of o) e();
            }()))));
        },
        use() {
            const n = i.getStore();
            n && (n.deps.push(a), o.push(n.reset));
            const r = t.getStore();
            if (void 0 === r) throw new s(e);
            return r.value;
        },
        version() {
            const o = t.getStore();
            if (void 0 === o) throw new s(e);
            return o.version;
        }
    };
    return a;
}

const i = new n.AsyncLocalStorage;

function c(e, t) {
    const o = e();
    return o && "object" == typeof o && "then" in o && "function" == typeof o.then ? o.then((e => (t(o), 
    e))) : (t(o), o);
}

const u = a("RequestContext");

const p = (d = "api", y = async (e, t) => {
    const o = function(e) {
        const t = u.use();
        if (t.type !== e) throw new Error(`Expected ${e} event`);
        return t.event;
    }("api").requestContext.http.method;
    return "OPTIONS" === o ? {
        statusCode: 200
    } : "GET" === o ? {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "get request requested!"
        })
    } : "POST" === o ? {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "post request requested!"
        })
    } : {
        statusCode: 404,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Not Found"
        })
    };
}, function(e, t) {
    return u.with({
        type: d,
        event: e,
        context: t
    }, (() => y(e, t)));
});

var d, y, f = o.R;

export { f as handler };