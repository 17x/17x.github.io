webpackJsonp([1],{216:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function u(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?l(e):t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return E});var f,p,s,b=n(0),y=n.n(b),m=n(12),h=n(13),d=(n.n(h),n(30)),v=n(218),O=n(2),w=n.n(O),g=n(63),j=function(e){return{ShowNavHead:e.ShowNavHead,Authentication:e.Authentication}},E=(f=Object(m.b)(j),p=Object(h.propTypes)({Authentication:w.a.object.isRequired,dispatch:w.a.func.isRequired}),f(s=p(s=Object(g.a)(s=function(e){function t(e){var n;return o(this,t),n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),Object.defineProperty(l(n),"state",{configurable:!0,enumerable:!0,writable:!0,value:{btnClicked:!1}}),Object.defineProperty(l(n),"handleSubmitLogin",{configurable:!0,enumerable:!0,writable:!0,value:function(e){return e.preventDefault(),n.setState({btnClicked:!0}),n.props.dispatch(Object(v.a)({authData:{nickName:"yeliangchen"}})),!1}}),n}return c(t,e),i(t,[{key:"render",value:function(){var e=this.props.location.state||{from:{pathname:"/"}},t=e.from,n=this.props.Authentication.isAuthenticated,r=this.state.btnClicked;return n?y.a.createElement(d.a,{to:t}):y.a.createElement("div",{className:"login"},"Login page",y.a.createElement("br",null),y.a.createElement("form",{onSubmit:this.handleSubmitLogin},y.a.createElement("input",{type:"text",name:"userName"}),y.a.createElement("input",{type:"text",name:"pwd"}),y.a.createElement("input",{type:"submit",disabled:r,value:r?"waiting":"log in"})))}}]),t}(b.Component))||s)||s)||s)},218:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e){return{type:"SET_AUTHENTICATED_LOGGED_IN",authData:e.authData}}}});