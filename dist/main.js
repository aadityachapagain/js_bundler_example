(()=>{"use strict";var t={363:function(t,e,n){n.d(e,{Ue:function(){return u}}),!function(){var t=Error("Cannot find module 'async_hooks'");throw t.code="MODULE_NOT_FOUND",t}();class r extends Error{name;constructor(t){super(`${t} context was not provided. It is possible you have multiple versions of SST installed.`),this.name=t}}let o=0;function u(t){let e=Object(function(){var t=Error("Cannot find module 'async_hooks'");throw t.code="MODULE_NOT_FOUND",t}())(),n=[],u={name:t,with(t,r){let u=(++o).toString();return e.run({value:t,version:u},()=>(function(t,e){let n=t();return n&&"object"==typeof n&&"then"in n&&"function"==typeof n.then?n.then(t=>(e(n),t)):(e(n),n)})(r,()=>(function(){for(let t of n)t()})()))},use(){let o=i.getStore();o&&(o.deps.push(u),n.push(o.reset));let s=e.getStore();if(void 0===s)throw new r(t);return s.value},version(){let n=e.getStore();if(void 0===n)throw new r(t);return n.version}};return u}let i=Object(function(){var t=Error("Cannot find module 'async_hooks'");throw t.code="MODULE_NOT_FOUND",t}())()},829:function(t,e,n){n.d(e,{RW:function(){return u},zX:function(){return o}});let r=(0,n(363).Ue)("RequestContext");function o(t){let e=r.use();if(e.type!==t)throw Error(`Expected ${t} event`);return e.event}function u(t,e){return function(n,o){return r.with({type:t,event:n,context:o},()=>e(n,o))}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var u=e[r]={exports:{}};return t[r](u,u.exports,n),u.exports}n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};(()=>{var t=n(829);function e(t,e,n,r,o,u,i){try{var s=t[u](i),a=s.value}catch(t){n(t);return}s.done?e(a):Promise.resolve(a).then(r,o)}(0,t.RW)("api",function(){var n,r=(n=function(e,n){var r;return function(t,e){var n,r,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function s(u){return function(s){return function(u){if(n)throw TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=e.call(t,i)}catch(t){u=[6,t],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,s])}}}(this,function(e){return"OPTIONS"===(r=(0,t.zX)("api").requestContext.http.method)?[2,{statusCode:200}]:"GET"===r?[2,{statusCode:200,headers:{"Content-Type":"application/json"},body:JSON.stringify({message:"get request requested!"})}]:"POST"===r?[2,{statusCode:200,headers:{"Content-Type":"application/json"},body:JSON.stringify({message:"post request requested!"})}]:[2,{statusCode:404,headers:{"Content-Type":"application/json"},body:JSON.stringify({message:"Not Found"})}]})},function(){var t=this,r=arguments;return new Promise(function(o,u){var i=n.apply(t,r);function s(t){e(i,o,u,s,a,"next",t)}function a(t){e(i,o,u,s,a,"throw",t)}s(void 0)})});return function(t,e){return r.apply(this,arguments)}}())})()})();
//# sourceMappingURL=main.js.map