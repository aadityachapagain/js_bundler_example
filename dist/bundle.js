(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({
"./node_modules/.pnpm/sst@2.43.3_@aws-sdk+client-sso-oidc@3.606.0/node_modules/sst/context/context2.js": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.d(__webpack_exports__, {
  create: function() { return create; }
});
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'async_hooks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

class ContextNotFoundError extends Error {
    name;
    constructor(name) {
        super(`${name} context was not provided. It is possible you have multiple versions of SST installed.`);
        this.name = name;
    }
}
let count = 0;
function create(name) {
    const storage = new Object(function webpackMissingModule() { var e = new Error("Cannot find module 'async_hooks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    const children = [];
    // notify all memos to reset
    function reset() {
        for (const child of children) {
            child();
        }
    }
    const ctx = {
        name,
        with(value, cb) {
            const version = (++count).toString();
            return storage.run({ value, version }, () => {
                return runWithCleanup(cb, () => reset());
            });
        },
        use() {
            const memo = ContextMemo.getStore();
            // use is being called within a memo, so track dependency
            if (memo) {
                memo.deps.push(ctx);
                children.push(memo.reset);
            }
            const result = storage.getStore();
            if (result === undefined)
                throw new ContextNotFoundError(name);
            return result.value;
        },
        version() {
            const result = storage.getStore();
            if (result === undefined)
                throw new ContextNotFoundError(name);
            return result.version;
        },
    };
    return ctx;
}
const ContextMemo = new Object(function webpackMissingModule() { var e = new Error("Cannot find module 'async_hooks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
function memo(cb) {
    const deps = [];
    const cache = new Map();
    const children = [];
    let tracked = false;
    function key() {
        return deps.map((dep) => dep.version()).join(",");
    }
    function reset() {
        cache.delete(key());
        for (const child of children) {
            child();
        }
    }
    function save(value) {
        cache.set(key(), value);
    }
    return () => {
        const child = ContextMemo.getStore();
        if (child) {
            child.deps.push({ version: () => key() });
            children.push(child.reset);
        }
        // Memo never run so build up dependency list
        if (!tracked) {
            return ContextMemo.run({ deps, reset }, () => {
                return runWithCleanup(cb, (result) => {
                    tracked = true;
                    save(result);
                });
            });
        }
        const cached = cache.get(key());
        if (cached) {
            return cached;
        }
        const result = cb();
        save(result);
        return result;
    };
}
function runWithCleanup(cb, cleanup) {
    const result = cb();
    if (result &&
        typeof result === "object" &&
        "then" in result &&
        typeof result.then === "function") {
        return result.then((value) => {
            // cleanup
            cleanup(result);
            return value;
        });
    }
    cleanup(result);
    return result;
}
const Context = {
    create,
    memo,
};


}),
"./node_modules/.pnpm/sst@2.43.3_@aws-sdk+client-sso-oidc@3.606.0/node_modules/sst/context/handler.js": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.d(__webpack_exports__, {
  Handler: function() { return Handler; },
  useEvent: function() { return useEvent; }
});
/* harmony import */var _context2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context2.js */ "./node_modules/.pnpm/sst@2.43.3_@aws-sdk+client-sso-oidc@3.606.0/node_modules/sst/context/context2.js");

const RequestContext = (0,_context2_js__WEBPACK_IMPORTED_MODULE_0__.create)("RequestContext");
function useContextType() {
    const ctx = RequestContext.use();
    return ctx.type;
}
function useEvent(type) {
    const ctx = RequestContext.use();
    if (ctx.type !== type)
        throw new Error(`Expected ${type} event`);
    return ctx.event;
}
function useLambdaContext() {
    const ctx = RequestContext.use();
    return ctx.context;
}
function Handler(type, cb) {
    return function handler(event, context) {
        return RequestContext.with({ type, event: event, context }, () => cb(event, context));
    };
}


}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */var sst_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sst/context */ "./node_modules/.pnpm/sst@2.43.3_@aws-sdk+client-sso-oidc@3.606.0/node_modules/sst/context/handler.js");

const handler = (0,sst_context__WEBPACK_IMPORTED_MODULE_0__.Handler)("api", async (evt, ctx) => {
    const method = (0,sst_context__WEBPACK_IMPORTED_MODULE_0__.useEvent)('api')['requestContext']['http']['method'];
    if (method === "OPTIONS") {
        return {
            statusCode: 200
        };
    }
    else if (method === "GET") {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "get request requested!"
            })
        };
    }
    else if (method === "POST") {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "post request requested!"
            })
        };
    }
    else {
        return {
            statusCode: 404,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Not Found"
            })
        };
    }
});

})();

})()
;
//# sourceMappingURL=bundle.js.map