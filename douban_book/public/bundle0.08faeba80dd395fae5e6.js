webpackJsonp([0],{1615:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),l=n.n(r),s=n(68),u=n(289),c=n.n(u),d=n(1619),f=n.n(d),p=n(283),h=n(150),m=(n.n(h),n(1627)),g=n(1632),v=n(1634),y=n(149),b=n(1635),w=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),x=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handlerClick=function(){},n.state={activeTabIndex:0},n.handleChange=function(e,t){n.setState({activeTabIndex:t})},n.handleSwipeChangeIndex=function(){n.setState({activeTabIndex:arguments.length<=0?void 0:arguments[0]})},n}return o(t,e),w(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dispatch(Object(y.a)("Home")),c()({method:"GET",url:"./mock/new/xg.json"}).then(function(t){return e.setState({tab1Data1:t.data})}),c()({method:"GET",url:"./mock/new/fxg.json"}).then(function(t){return e.setState({tab1Data2:t.data})})}},{key:"render",value:function(){var e=this,t=[{text:"Latest"},{text:"Trending"},{text:"recommend"},{text:"Category"},{text:"Tags"},{text:"Explore"}],n=this.state,i=n.activeTabIndex,a=n.tab1Data1,o=n.tab1Data2,r=this.props.classes;return l.a.createElement("div",{className:"home"},l.a.createElement(b.a,null),l.a.createElement(p.Tabs,{fullWidth:!0,scrollButtons:"auto",scrollable:!0,value:i,className:r.homeTabsStyle,onChange:this.handleChange},t.map(function(e,t){return l.a.createElement(p.Tab,{label:e.text,key:t,className:r.homeTabStyle+" "+(i===t?r.homeTabStyleActive:"")})})),l.a.createElement(f.a,{index:i,onChangeIndex:function(t,n,i){return e.handleSwipeChangeIndex(t,n,i)},ignoreNativeScroll:!0,animateHeight:!0},l.a.createElement(m.a,{tab1Data1:a,tab1Data2:o}),l.a.createElement(g.a,{className:r.swipeAbleViews},"Item 2"),l.a.createElement(g.a,{className:r.swipeAbleViews},"Item 3"),l.a.createElement(g.a,{className:r.swipeAbleViews},"Item 4"),l.a.createElement(g.a,{className:r.swipeAbleViews},"Item 5"),l.a.createElement(g.a,{className:r.swipeAbleViews},"Item 6")))}}]),t}(r.Component),S=Object(s.connect)()(x);t.default=Object(h.withStyles)(v.a)(S)},1618:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={RESISTANCE_COEF:.6,UNCERTAINTY_THRESHOLD:3}},1619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1620),a=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=a.default},1620:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,i){return(0,I.default)(e,t,n,i),{remove:function(){(0,H.default)(e,t,n,i)}}}function o(){if(!X){var e=document.createElement("style");e.innerHTML="\n      .react-swipeable-view-container {\n        display: -webkit-box;\n        display: -ms-flexbox;\n      }\n      .react-swipeable-view-container > div {\n        -ms-flex-negative: 0;\n      }\n    ",document.body&&document.body.appendChild(e),X=!0}}function r(e,t){return e+" "+t.duration+" "+t.easeFunction+" "+t.delay}function l(e,t){var n=R.rotationMatrix[t];return{pageX:n.x[0]*e.pageX+n.x[1]*e.pageY,pageY:n.y[0]*e.pageX+n.y[1]*e.pageY}}function s(e){return e.touches=[{pageX:e.pageX,pageY:e.pageY}],e}function u(e,t){for(var n=[];e&&e!==t&&!e.hasAttribute("data-swipeable");){var i=window.getComputedStyle(e);"absolute"===i.getPropertyValue("position")||"hidden"===i.getPropertyValue("overflow-x")?n=[]:(e.clientWidth>0&&e.scrollWidth>e.clientWidth||e.clientHeight>0&&e.scrollHeight>e.clientHeight)&&n.push({element:e,scrollWidth:e.scrollWidth,scrollHeight:e.scrollHeight,clientWidth:e.clientWidth,clientHeight:e.clientHeight,scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}),e=e.parentNode}return n}function c(e){var t=e.domTreeShapes,n=e.pageX,i=e.startX,a=e.axis;return t.some(function(e){var t=n>=i;"x"!==a&&"y"!==a||(t=!t);var o=e[R.scrollPosition[a]],r=o>0,l=o+e[R.clientLength[a]]<e[R.scrollLength[a]];return!!(t&&l||!t&&r)&&(F=e.element,!0)})}Object.defineProperty(t,"__esModule",{value:!0});var d=n(5),f=i(d),p=n(6),h=i(p),m=n(11),g=i(m),v=n(12),y=i(v),b=n(13),w=i(b),x=n(14),S=i(x),E=n(15),T=i(E);t.getDomTreeShapes=u,t.findNativeHandler=c;var _=n(1),N=i(_),M=n(0),L=i(M),C=n(10),P=(i(C),n(1621)),O=i(P),k=n(286),I=i(k),j=n(287),H=i(j),D=n(1622),X=!1,W={container:{direction:"ltr",display:"flex",willChange:"transform"},slide:{width:"100%",WebkitFlexShrink:0,flexShrink:0,overflow:"auto"}},R={root:{x:{overflowX:"hidden"},"x-reverse":{overflowX:"hidden"},y:{overflowY:"hidden"},"y-reverse":{overflowY:"hidden"}},flexDirection:{x:"row","x-reverse":"row-reverse",y:"column","y-reverse":"column-reverse"},transform:{x:function(e){return"translate("+-e+"%, 0)"},"x-reverse":function(e){return"translate("+e+"%, 0)"},y:function(e){return"translate(0, "+-e+"%)"},"y-reverse":function(e){return"translate(0, "+e+"%)"}},length:{x:"width","x-reverse":"width",y:"height","y-reverse":"height"},rotationMatrix:{x:{x:[1,0],y:[0,1]},"x-reverse":{x:[-1,0],y:[0,1]},y:{x:[0,1],y:[1,0]},"y-reverse":{x:[0,-1],y:[1,0]}},scrollPosition:{x:"scrollLeft","x-reverse":"scrollLeft",y:"scrollTop","y-reverse":"scrollTop"},scrollLength:{x:"scrollWidth","x-reverse":"scrollWidth",y:"scrollHeight","y-reverse":"scrollHeight"},clientLength:{x:"clientWidth","x-reverse":"clientWidth",y:"clientHeight","y-reverse":"clientHeight"}},F=null,A=function(e){function t(){var e,n,i,a;(0,y.default)(this,t);for(var o=arguments.length,r=Array(o),d=0;d<o;d++)r[d]=arguments[d];return n=i=(0,S.default)(this,(e=t.__proto__||(0,g.default)(t)).call.apply(e,[this].concat(r))),i.state={indexLatest:null,isDragging:!1,isFirstRender:!0,heightLatest:0,displaySameSlide:!0},i.rootNode=null,i.containerNode=null,i.ignoreNextScrollEvents=!1,i.viewLength=0,i.startX=0,i.lastX=0,i.vx=0,i.startY=0,i.isSwiping=void 0,i.started=!1,i.startIndex=0,i.transitionListener=null,i.touchMoveListener=null,i.activeSlide=null,i.indexCurrent=null,i.handleSwipeStart=function(e){var t=i.props.axis;if(null!==i.rootNode){var n=l(e.touches[0],t);i.viewLength=i.rootNode.getBoundingClientRect()[R.length[t]],i.startX=n.pageX,i.lastX=n.pageX,i.vx=0,i.startY=n.pageY,i.isSwiping=void 0,i.started=!0;var a=window.getComputedStyle(i.containerNode),o=a.getPropertyValue("-webkit-transform")||a.getPropertyValue("transform");if(o&&"none"!==o){var r=o.split("(")[1].split(")")[0].split(","),s=window.getComputedStyle(i.rootNode),u=l({pageX:parseInt(r[4],10),pageY:parseInt(r[5],10)},t);i.startIndex=-u.pageX/(i.viewLength-parseInt(s.paddingLeft,10)-parseInt(s.paddingRight,10))}}},i.handleSwipeMove=function(e){if(!i.started)return void i.handleTouchStart(e);if(null!==i.rootNode&&(null===F||F===i.rootNode)){var t=i.props,n=t.axis,a=t.children,o=t.ignoreNativeScroll,r=t.onSwitching,s=t.resistance,d=l(e.touches[0],n);if(void 0===i.isSwiping){var f=Math.abs(i.startX-d.pageX),p=Math.abs(i.startY-d.pageY),h=f>p&&f>D.constant.UNCERTAINTY_THRESHOLD;if(!s&&("y"===n||"y-reverse"===n)&&(0===i.indexCurrent&&i.startX<d.pageX||i.indexCurrent===_.Children.count(i.props.children)-1&&i.startX>d.pageX))return void(i.isSwiping=!1);if(f>p&&e.preventDefault(),!0===h||p>D.constant.UNCERTAINTY_THRESHOLD)return i.isSwiping=h,void(i.startX=d.pageX)}if(!0===i.isSwiping){e.preventDefault(),i.vx=.5*i.vx+.5*(d.pageX-i.lastX),i.lastX=d.pageX;var m=(0,D.computeIndex)({children:a,resistance:s,pageX:d.pageX,startIndex:i.startIndex,startX:i.startX,viewLength:i.viewLength}),g=m.index,v=m.startX;if(null===F&&!o){if(c({domTreeShapes:u(e.target,i.rootNode),startX:i.startX,pageX:d.pageX,axis:n}))return}v?i.startX=v:null===F&&(F=i.rootNode),i.setIndexCurrent(g);var y=function(){r&&r(g,"move")};!i.state.displaySameSlide&&i.state.isDragging||i.setState({displaySameSlide:!1,isDragging:!0},y),y()}}},i.handleSwipeEnd=function(){if(F=null,i.started&&(i.started=!1,!0===i.isSwiping)){var e=i.state.indexLatest,t=i.indexCurrent,n=e-t,a=void 0;a=Math.abs(i.vx)>i.props.threshold?i.vx>0?Math.floor(t):Math.ceil(t):Math.abs(n)>i.props.hysteresis?n>0?Math.floor(t):Math.ceil(t):e;var o=_.Children.count(i.props.children)-1;a<0?a=0:a>o&&(a=o),i.setIndexCurrent(a),i.setState({indexLatest:a,isDragging:!1},function(){i.props.onSwitching&&i.props.onSwitching(a,"end"),i.props.onChangeIndex&&a!==e&&i.props.onChangeIndex(a,e,{reason:"swipe"}),t===e&&i.handleTransitionEnd()})}},i.handleTouchStart=function(e){i.props.onTouchStart&&i.props.onTouchStart(e),i.handleSwipeStart(e)},i.handleTouchEnd=function(e){i.props.onTouchEnd&&i.props.onTouchEnd(e),i.handleSwipeEnd(e)},i.handleMouseDown=function(e){i.props.onMouseDown&&i.props.onMouseDown(e),e.persist(),i.handleSwipeStart(s(e))},i.handleMouseUp=function(e){i.props.onMouseUp&&i.props.onMouseUp(e),i.handleSwipeEnd(s(e))},i.handleMouseLeave=function(e){i.props.onMouseLeave&&i.props.onMouseLeave(e),i.started&&i.handleSwipeEnd(s(e))},i.handleMouseMove=function(e){i.props.onMouseMove&&i.props.onMouseMove(e),i.started&&i.handleSwipeMove(s(e))},i.handleScroll=function(e){if(i.props.onScroll&&i.props.onScroll(e),e.target===i.rootNode){if(i.ignoreNextScrollEvents)return void(i.ignoreNextScrollEvents=!1);var t=i.state.indexLatest,n=Math.ceil(e.target.scrollLeft/e.target.clientWidth)+t;i.ignoreNextScrollEvents=!0,e.target.scrollLeft=0,i.props.onChangeIndex&&n!==t&&i.props.onChangeIndex(n,t,{reason:"focus"})}},i.updateHeight=function(){if(null!==i.activeSlide){var e=i.activeSlide.children[0];void 0!==e&&void 0!==e.offsetHeight&&i.state.heightLatest!==e.offsetHeight&&i.setState({heightLatest:e.offsetHeight})}},a=n,(0,S.default)(i,a)}return(0,T.default)(t,e),(0,w.default)(t,[{key:"getChildContext",value:function(){var e=this;return{swipeableViews:{slideUpdateHeight:function(){e.updateHeight()}}}}},{key:"componentWillMount",value:function(){this.setIndexCurrent(this.props.index),this.setState({indexLatest:this.props.index})}},{key:"componentDidMount",value:function(){var e=this;this.transitionListener=a(this.containerNode,O.default.end,function(t){t.target===e.containerNode&&e.handleTransitionEnd()}),this.touchMoveListener=a(this.rootNode,"touchmove",function(t){e.props.disabled||e.handleSwipeMove(t)},{passive:!1}),this.setState({isFirstRender:!1}),o(),this.props.action&&this.props.action({updateHeight:this.updateHeight})}},{key:"componentWillReceiveProps",value:function(e){var t=e.index;"number"==typeof t&&t!==this.props.index&&(this.setIndexCurrent(t),this.setState({displaySameSlide:(0,D.getDisplaySameSlide)(this.props,e),indexLatest:t}))}},{key:"componentWillUnmount",value:function(){this.transitionListener.remove(),this.touchMoveListener.remove()}},{key:"setIndexCurrent",value:function(e){if(this.props.animateTransitions||this.indexCurrent===e||this.handleTransitionEnd(),this.indexCurrent=e,this.containerNode){var t=this.props.axis,n=R.transform[t](100*e);this.containerNode.style.WebkitTransform=n,this.containerNode.style.transform=n}}},{key:"handleTransitionEnd",value:function(){this.props.onTransitionEnd&&(this.state.displaySameSlide||this.state.isDragging||this.props.onTransitionEnd())}},{key:"render",value:function(){var e=this,t=this.props,n=(t.action,t.animateHeight),i=t.animateTransitions,a=t.axis,o=t.children,l=t.containerStyle,s=t.disabled,u=t.disableLazyLoading,c=t.enableMouseEvents,d=(t.hysteresis,t.ignoreNativeScroll,t.index,t.onChangeIndex,t.onSwitching,t.onTransitionEnd,t.resistance,t.slideStyle),p=t.slideClassName,m=t.springConfig,g=t.style,v=(t.threshold,(0,h.default)(t,["action","animateHeight","animateTransitions","axis","children","containerStyle","disabled","disableLazyLoading","enableMouseEvents","hysteresis","ignoreNativeScroll","index","onChangeIndex","onSwitching","onTransitionEnd","resistance","slideStyle","slideClassName","springConfig","style","threshold"])),y=this.state,b=y.displaySameSlide,w=y.heightLatest,x=y.isDragging,S=y.isFirstRender,E=y.indexLatest,T=s?{}:{onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd},M=!s&&c?{onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onMouseLeave:this.handleMouseLeave,onMouseMove:this.handleMouseMove}:{},L=(0,f.default)({},W.slide,d),C=void 0,P=void 0;if(x||!i||b)C="all 0s ease 0s",P="all 0s ease 0s";else if(C=r("transform",m),P=r("-webkit-transform",m),0!==w){var O=", "+r("height",m);C+=O,P+=O}var k={height:null,WebkitFlexDirection:R.flexDirection[a],flexDirection:R.flexDirection[a],WebkitTransition:P,transition:C};if(u||!S){var I=R.transform[a](100*this.indexCurrent);k.WebkitTransform=I,k.transform=I}return n&&(k.height=w),N.default.createElement("div",(0,f.default)({ref:function(t){e.rootNode=t},style:(0,f.default)({},R.root[a],g)},v,T,M,{onScroll:this.handleScroll}),N.default.createElement("div",{ref:function(t){e.containerNode=t},style:(0,f.default)({},k,W.container,l),className:"react-swipeable-view-container"},_.Children.map(o,function(t,i){if(!u&&S&&i!==E)return null;var a=void 0,o=!0;return i===E&&(o=!1,n&&(a=function(t){e.activeSlide=t,e.updateHeight()},L.overflowY="hidden")),N.default.createElement("div",{ref:a,style:L,className:p,"aria-hidden":o,"data-swipeable":"true"},t)})))}}]),t}(_.Component);A.displayName="ReactSwipableView",A.propTypes={},A.defaultProps={animateHeight:!1,animateTransitions:!0,axis:"x",disabled:!1,disableLazyLoading:!1,enableMouseEvents:!1,hysteresis:.6,ignoreNativeScroll:!1,index:0,threshold:5,springConfig:{duration:"0.35s",easeFunction:"cubic-bezier(0.15, 0.3, 0.25, 1)",delay:"0s"},resistance:!1},A.childContextTypes={swipeableViews:L.default.shape({slideUpdateHeight:L.default.func})},t.default=A},1621:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.animationEnd=t.animationDelay=t.animationTiming=t.animationDuration=t.animationName=t.transitionEnd=t.transitionDuration=t.transitionDelay=t.transitionTiming=t.transitionProperty=t.transform=void 0;var i=n(41),a=function(e){return e&&e.__esModule?e:{default:e}}(i),o="transform",r=void 0,l=void 0,s=void 0,u=void 0,c=void 0,d=void 0,f=void 0,p=void 0,h=void 0,m=void 0,g=void 0;if(a.default){var v=function(){for(var e=document.createElement("div").style,t={O:function(e){return"o"+e.toLowerCase()},Moz:function(e){return e.toLowerCase()},Webkit:function(e){return"webkit"+e},ms:function(e){return"MS"+e}},n=Object.keys(t),i=void 0,a=void 0,o="",r=0;r<n.length;r++){var l=n[r];if(l+"TransitionProperty"in e){o="-"+l.toLowerCase(),i=t[l]("TransitionEnd"),a=t[l]("AnimationEnd");break}}return!i&&"transitionProperty"in e&&(i="transitionend"),!a&&"animationName"in e&&(a="animationend"),e=null,{animationEnd:a,transitionEnd:i,prefix:o}}();r=v.prefix,t.transitionEnd=l=v.transitionEnd,t.animationEnd=s=v.animationEnd,t.transform=o=r+"-"+o,t.transitionProperty=u=r+"-transition-property",t.transitionDuration=c=r+"-transition-duration",t.transitionDelay=f=r+"-transition-delay",t.transitionTiming=d=r+"-transition-timing-function",t.animationName=p=r+"-animation-name",t.animationDuration=h=r+"-animation-duration",t.animationTiming=m=r+"-animation-delay",t.animationDelay=g=r+"-animation-timing-function"}t.transform=o,t.transitionProperty=u,t.transitionTiming=d,t.transitionDelay=f,t.transitionDuration=c,t.transitionEnd=l,t.animationName=p,t.animationDuration=h,t.animationTiming=m,t.animationDelay=g,t.animationEnd=s,t.default={transform:o,end:l,property:u,timing:d,delay:f,duration:c}},1622:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1623);Object.defineProperty(t,"checkIndexBounds",{enumerable:!0,get:function(){return i(a).default}});var o=n(1624);Object.defineProperty(t,"computeIndex",{enumerable:!0,get:function(){return i(o).default}});var r=n(1618);Object.defineProperty(t,"constant",{enumerable:!0,get:function(){return i(r).default}});var l=n(1625);Object.defineProperty(t,"getDisplaySameSlide",{enumerable:!0,get:function(){return i(l).default}});var s=n(1626);Object.defineProperty(t,"mod",{enumerable:!0,get:function(){return i(s).default}})},1623:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=n(10),o=(function(e){e&&e.__esModule}(a),function(e){var t=(e.index,e.children);i.Children.count(t)});t.default=o},1624:function(e,t,n){"use strict";function i(e){var t=e.children,n=e.startIndex,i=e.startX,o=e.pageX,l=e.viewLength,s=e.resistance,u=a.Children.count(t)-1,c=n+(i-o)/l,d=void 0;return s?c<0?c=Math.exp(c*r.default.RESISTANCE_COEF)-1:c>u&&(c=u+1-Math.exp((u-c)*r.default.RESISTANCE_COEF)):c<0?(c=0,d=(c-n)*l+o):c>u&&(c=u,d=(c-n)*l+o),{index:c,startX:d}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var a=n(1),o=n(1618),r=function(e){return e&&e.__esModule?e:{default:e}}(o)},1625:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t){var n=!1;if(e.children.length&&t.children.length){var i=e.children[e.index],a=i?i.key:"empty";if(null!==a){var o=t.children[t.index];a===(o?o.key:"empty")&&(n=!0)}}return n};t.default=i},1626:function(e,t,n){"use strict";function i(e,t){var n=e%t;return n<0?n+t:n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},1627:function(e,t,n){"use strict";var i=n(1),a=n.n(i),o=n(1628),r=(n.n(o),n(288)),l=n.n(r),s=n(94),u=n.n(s),c=n(153),d=n.n(c),f=n(283),p=n(152),h=function(e){var t=e.classes,n=e.tab1Data1,i=e.tab1Data2,r=[];return n&&r.push(n),i&&r.push(i),a.a.createElement("div",null,r.map(function(e,n){return a.a.createElement(o.GridList,{key:n,className:t.gridList},a.a.createElement(o.GridListTile,{key:"Subheader",cols:3,style:{width:"100%",height:"auto"}},a.a.createElement(l.a,{component:"div"},0===n?"虚构":"非虚构")),e.data.map(function(e,n){return a.a.createElement(o.GridListTile,{key:n},a.a.createElement(p.b,{to:"detail",params:{id:103},className:t.homeBookItem},a.a.createElement("div",null,a.a.createElement("img",{className:t.homeBookItemImg,src:e.cover,alt:e.name}),a.a.createElement(o.GridListTileBar,{title:a.a.createElement("span",null,e.name),subtitle:a.a.createElement("span",null,e.subTitle),actionIcon:a.a.createElement(u.a,null,a.a.createElement(d.a,{color:"rgba(255, 255, 255, 0.54)"}))}))))}))}))},m=function(e){return{container:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",background:e.palette.background.paper},gridList:{width:"100%"},homeBookItem:{width:"100%",height:"100%"},homeBookItemImg:{width:"100%"}}};t.a=Object(f.withStyles)(m)(h)},1628:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1629);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a).default}}),Object.defineProperty(t,"GridList",{enumerable:!0,get:function(){return i(a).default}});var o=n(1630);Object.defineProperty(t,"GridListTile",{enumerable:!0,get:function(){return i(o).default}});var r=n(1631);Object.defineProperty(t,"GridListTileBar",{enumerable:!0,get:function(){return i(r).default}})},1629:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.cols,n=e.spacing,i=e.cellHeight,a=e.children,o=e.classes,r=e.className,s=e.component,c=e.style,f=(0,u.default)(e,["cols","spacing","cellHeight","children","classes","className","component","style"]);return d.default.createElement(s,(0,l.default)({className:(0,p.default)(o.root,r),style:(0,l.default)({margin:-n/2},c)},f),d.default.Children.map(a,function(e){var a=e.props.cols||1,o=e.props.rows||1;return d.default.cloneElement(e,{style:(0,l.default)({width:100/t*a+"%",height:"auto"===i?"auto":i*o+n,padding:n/2},e.props.style)})}))}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var o=n(9),r=(i(o),n(5)),l=i(r),s=n(6),u=i(s),c=n(1),d=i(c),f=n(8),p=i(f),h=n(7),m=i(h),g=n(1).babelPluginFlowReactPropTypes_proptype_Node||n(0).any,v=n(1).babelPluginFlowReactPropTypes_proptype_ElementType||n(0).any,y=t.styles={root:{display:"flex",flexWrap:"wrap",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"}};n(0).oneOfType([n(0).number,n(0).oneOf(["auto"])]),n(0).oneOfType([n(0).number,n(0).oneOf(["auto"])]),"function"==typeof g?g.isRequired&&g.isRequired:n(0).shape(g).isRequired,n(0).object,n(0).string,n(0).number,"function"==typeof v||n(0).shape(v),n(0).number,n(0).object;a.propTypes={},a.defaultProps={cols:2,spacing:4,cellHeight:180,component:"ul"},t.default=(0,m.default)(y,{name:"MuiGridList"})(a)},1630:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var a=n(5),o=i(a),r=n(6),l=i(r),s=n(11),u=i(s),c=n(12),d=i(c),f=n(13),p=i(f),h=n(14),m=i(h),g=n(15),v=i(g),y=n(1),b=i(y),w=n(8),x=i(w),S=n(34),E=i(S),T=n(42),_=i(T),N=n(7),M=i(N),L=n(1).babelPluginFlowReactPropTypes_proptype_Node||n(0).any,C=n(1).babelPluginFlowReactPropTypes_proptype_ElementType||n(0).any,P=t.styles={root:{boxSizing:"border-box",flexShrink:0},tile:{position:"relative",display:"block",height:"100%",overflow:"hidden"},imgFullHeight:{height:"100%",transform:"translateX(-50%)",position:"relative",left:"50%"},imgFullWidth:{width:"100%",position:"relative",transform:"translateY(-50%)",top:"50%"}},O=("function"==typeof L||n(0).shape(L),n(0).object,n(0).string,n(0).number,"function"==typeof C||n(0).shape(C),n(0).number,function(e){function t(){var e,n,i,a;(0,d.default)(this,t);for(var o=arguments.length,r=Array(o),l=0;l<o;l++)r[l]=arguments[l];return n=i=(0,m.default)(this,(e=t.__proto__||(0,u.default)(t)).call.apply(e,[this].concat(r))),i.imgElement=null,i.handleResize=(0,_.default)(function(){i.fit()},166),i.fit=function(){var e=i.imgElement;e&&e.complete&&(e.width/e.height>e.parentNode.offsetWidth/e.parentNode.offsetHeight?(e.classList.remove(i.props.classes.imgFullWidth),e.classList.add(i.props.classes.imgFullHeight)):(e.classList.remove(i.props.classes.imgFullHeight),e.classList.add(i.props.classes.imgFullWidth)),e.removeEventListener("load",i.fit))},a=n,(0,m.default)(i,a)}return(0,v.default)(t,e),(0,p.default)(t,[{key:"componentDidMount",value:function(){this.ensureImageCover()}},{key:"componentDidUpdate",value:function(){this.ensureImageCover()}},{key:"componentWillUnmount",value:function(){this.handleResize.cancel()}},{key:"ensureImageCover",value:function(){this.imgElement&&(this.imgElement.complete?this.fit():this.imgElement.addEventListener("load",this.fit))}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,i=t.classes,a=t.className,r=(t.cols,t.component),s=(t.rows,(0,l.default)(t,["children","classes","className","cols","component","rows"]));return b.default.createElement(r,(0,o.default)({className:(0,x.default)(i.root,a)},s),b.default.createElement(E.default,{target:"window",onResize:this.handleResize}),b.default.createElement("div",{className:i.tile},b.default.Children.map(n,function(t){return"img"===t.type?b.default.cloneElement(t,{key:"img",ref:function(t){e.imgElement=t}}):t})))}}]),t}(b.default.Component));O.defaultProps={cols:1,rows:1,component:"li"},t.default=(0,M.default)(P,{name:"MuiGridListTile"})(O)},1631:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){var t,n,i=e.actionIcon,a=e.actionPosition,o=e.classes,l=e.className,u=e.subtitle,d=e.title,p=e.titlePosition,m=(0,c.default)(e,["actionIcon","actionPosition","classes","className","subtitle","title","titlePosition"]),g=i&&a,v=(0,h.default)(o.root,(t={},(0,s.default)(t,o.rootBottom,"bottom"===p),(0,s.default)(t,o.rootTop,"top"===p),(0,s.default)(t,o.rootWithSubtitle,u),t),l),y=(0,h.default)(o.titleWrap,(n={},(0,s.default)(n,o.titleWrapActionLeft,"left"===g),(0,s.default)(n,o.titleWrapActionRight,"right"===g),n));return f.default.createElement("div",(0,r.default)({className:v},m),f.default.createElement("div",{className:y},f.default.createElement("div",{className:o.title},d),u?f.default.createElement("div",{className:o.subtitle},u):null),i?f.default.createElement("div",{className:(0,h.default)((0,s.default)({},o.actionIconPositionLeft,"left"===g))},i):null)}Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var o=n(5),r=i(o),l=n(9),s=i(l),u=n(6),c=i(u),d=n(1),f=i(d),p=n(8),h=i(p),m=n(7),g=i(m),v=n(1).babelPluginFlowReactPropTypes_proptype_Node||n(0).any,y=t.styles=function(e){return{root:{position:"absolute",left:0,right:0,height:48,background:"rgba(0, 0, 0, 0.4)",display:"flex",alignItems:"center",fontFamily:e.typography.fontFamily},rootBottom:{bottom:0},rootTop:{top:0},rootWithSubtitle:{height:68},titleWrap:{flexGrow:1,marginLeft:e.mixins.gutters({}).paddingLeft,marginRight:e.mixins.gutters({}).paddingRight,color:"white",overflow:"hidden"},titleWrapActionLeft:{marginLeft:0},titleWrapActionRight:{marginRight:0},title:{fontSize:16,lineHeight:"24px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},subtitle:{fontSize:12,lineHeight:1,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},actionIconPositionLeft:{order:-1},childImg:{height:"100%",transform:"translateX(-50%)",position:"relative",left:"50%"}}};n(0).oneOf(["top","bottom"]),n(0).oneOf(["left","right"]),"function"==typeof v||n(0).shape(v),n(0).oneOf(["left","right"]),n(0).object,n(0).string,"function"==typeof v||n(0).shape(v),"function"==typeof v?v.isRequired&&v.isRequired:n(0).shape(v).isRequired,n(0).oneOf(["top","bottom"]);a.propTypes={},a.defaultProps={actionPosition:"right",titlePosition:"bottom"},t.default=(0,g.default)(y,{name:"MuiGridListTileBar"})(a)},1632:function(e,t,n){"use strict";var i=n(1),a=n.n(i),o=n(1633),r=function(e){return a.a.createElement("div",{className:e.className},a.a.createElement("p",null,e.children),a.a.createElement(o.a,null))};t.a=r},1633:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var r=n(1),l=n.n(r),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function(e){function t(e){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),s(t,[{key:"componentDidMounted",value:function(){}},{key:"render",value:function(){return l.a.createElement("div",null,"here is GlobalPagingView")}}]),t}(r.Component);t.a=u},1634:function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(290),o=(n.n(a),function(e){var t;return{homeTabsStyle:{backgroundColor:a.green[500],minHeight:"30px"},homeTabStyle:{color:"#cfc",height:"30px",minWidth:"12.4%",fontSize:"12px"},homeTabStyleActive:{color:"#fff"},swipeAbleViews:(t={minHeight:window.innerHeight-86},i(t,e.breakpoints.up("xs")+" and (orientation: landscape)",{minHeight:window.innerHeight-78}),i(t,e.breakpoints.up("sm"),{minHeight:window.innerHeight-94}),t),tab1ListItem:{width:"100%",height:265}}});t.a=o},1635:function(e,t,n){"use strict";var i=n(1),a=n.n(i),o=n(68),r=n(284),l=n.n(r),s=n(151),u=n.n(s),c=n(36),d=n.n(c),f=n(94),p=n.n(f),h=n(291),m=n.n(h),g=n(292),v=n.n(g),y=n(293),b=n.n(y),w=n(149),x=n(285),S=n(150),E=(n.n(S),function(e){var t=e.dispatch,n=e.classes,i=e.title,o=e.authenticated;return a.a.createElement(l.a,{position:"static",style:{backgroundColor:"#4caf50"},className:n.commonHeaderStyle},a.a.createElement(u.a,null,a.a.createElement(p.a,{className:n.menuButton,color:"contrast","aria-label":"Menu",onClick:function(){return t(Object(w.b)())}},a.a.createElement(m.a,null)),a.a.createElement(d.a,{type:"title",color:"inherit",className:n.flex},i),o?a.a.createElement(p.a,{className:n.menuButton,color:"contrast","aria-label":"person"},a.a.createElement(v.a,null)):a.a.createElement(b.a,null)))}),T=function(e,t){return e},_=Object(o.connect)(T)(E);t.a=Object(S.withStyles)(x.a)(_)}});