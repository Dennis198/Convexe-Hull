(this["webpackJsonpconvexe-hull"]=this["webpackJsonpconvexe-hull"]||[]).push([[0],{24:function(t,e,n){},25:function(t,e,n){},26:function(t,e,n){},31:function(t,e,n){"use strict";n.r(e);var i=n(1),s=n(0),a=n.n(s),h=n(6),l=n.n(h),r=(n(24),n(25),n(2)),o=n(3),u=n(17),c=n(16);n(26);function d(){var t=document.getElementById("2d-plane"),e=t.getContext("2d");e.beginPath(),e.fillStyle="#ADD8E6",e.fillRect(0,0,t.width,t.height),e.stroke()}function p(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"black",s=document.getElementById("2d-plane"),a=s.getContext("2d");a.fillStyle=i,a.beginPath(),a.arc(t,e,n,0,2*Math.PI),a.fill()}function f(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"black",i=document.getElementById("2d-plane"),s=i.getContext("2d");s.strokeStyle=n,s.lineWidth=1,s.beginPath(),s.moveTo(t.x,t.y),s.lineTo(e.x,e.y),s.stroke()}function v(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"black",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=document.getElementById("2d-plane"),s=i.getContext("2d");s.strokeStyle=e,s.lineWidth=1,s.beginPath(),s.moveTo(t[0].x,t[0].y);for(var a=1;a<t.length;a++)s.lineTo(t[a].x,t[a].y),s.stroke();n&&s.lineTo(t[0].x,t[0].y),s.stroke()}var g=function(){function t(e,n){Object(r.a)(this,t),this.x=e,this.y=n}return Object(o.a)(t,[{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"black";p(this.x,this.y,t,e)}}]),t}();function x(t,e){return t.x*e.y-t.y*e.x}function y(t,e){return{x:t.x-e.x,y:t.y-e.y}}function k(t,e,n){return t.x*e.y*1+1*t.y*n.x+1*e.x*n.y-n.x*e.y*1-1*n.y*t.x-1*e.x*t.y<0}function m(t,e){return e.sort((function(e,n){return function(t,e,n){var i={x:t.x-1,y:t.y},s=b(t,i,e),a=b(t,i,n);0===s&&console.log("Hier");if(s<a)return-1;if(s>a)return 1;var h=I(t,e),l=I(t,n);if(h<l)return 1;if(h>l)return-1;return 0}(t,e,n)}))}function b(t,e,n){var i={x:e.x-t.x,y:e.y-t.y},s={x:n.x-t.x,y:n.y-t.y};if(0===i.x&&0===i.y)return 0;if(0===s.x&&0===s.y)return 0;if(0===j(i,s))return 90;var a=180*Math.acos(j(i,s)/(w(i)*w(s)))/Math.PI;return 180<=a&&a<=180?180:a}function j(t,e){return t.x*e.x+t.y*e.y}function w(t){return I({x:0,y:0},t)}function I(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}var C=function(){function t(e){Object(r.a)(this,t),this.points=e.sort((function(t,e){return t.x-e.x})),this.sucess=!1,this.hull=[],this.leftMost=this.points[0],this.index=2,this.nextIndex=-1,this.nextVertex=this.points[1],this.currentVertex=this.leftMost,this.hull.push(this.leftMost)}return Object(o.a)(t,[{key:"instantCompute",value:function(){for(this.sucess=!1;!this.sucess;)this.calculateNextStep();this.drawFinish()}},{key:"start",value:function(){var t=this,e=setInterval((function(){t.drawCurrentState(),t.calculateNextStep(e)}),100)}},{key:"calculateNextStep",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.points[this.index],n=y(this.nextVertex,this.currentVertex),i=y(e,this.currentVertex);x(n,i)<0&&(this.nextVertex=e,this.nextIndex=this.index),this.index++,this.index===this.points.length&&(this.nextVertex===this.leftMost?(this.drawFinish(),this.stop(t)):(this.hull.push(this.nextVertex),this.currentVertex=this.nextVertex,this.index=0,this.nextVertex=this.leftMost))}},{key:"drawCurrentState",value:function(){d(),v(this.hull,"red"),f(this.currentVertex,this.nextVertex,"green"),f(this.currentVertex,this.points[this.index]);for(var t=0;t<this.points.length;t++)this.points[t].draw();for(var e=0;e<this.hull.length;e++)this.hull[e].draw(5,"red")}},{key:"drawFinish",value:function(){d(),v(this.hull,"red",!0);for(var t=0;t<this.points.length;t++)this.points[t].draw();for(var e=0;e<this.hull.length;e++)this.hull[e].draw(5,"red")}},{key:"stop",value:function(t){clearInterval(t),this.sucess=!0}}]),t}(),O=function(){function t(e){Object(r.a)(this,t),this.points=e,this.success=!1,this.hull=[],this.hullLines=[],this.checked=[{startIdx:-1,endIdx:-1}]}return Object(o.a)(t,[{key:"instantCompute",value:function(){for(var t=this,e=function(e){for(var n=function(n){if(e===n)return"continue";if(t.checked.find((function(t){return t.startIdx===n&&t.endIdx===e})))return"continue";for(var i=!0,s=0;s<t.points.length;s++)if(e!==s&&n!==s&&k(t.points[e],t.points[n],t.points[s])){i=!1;break}!0===i&&(t.checked.push({startIdx:e,endIdx:n}),t.hull.push(t.points[e]),t.hullLines.push({start:t.points[e],end:t.points[n]}))},i=0;i<t.points.length;i++)n(i)},n=0;n<this.points.length;n++){e(n)}this.drawFinish(),this.stop()}},{key:"start",value:function(){var t,e=this,n=0,i=0,s=0,a=!1,h=!1,l=this.points.length,r=setInterval((function(){(d(),n===i)?i++:e.checked.find((function(t){return t.startIdx===i&&t.endIdx===n}))?h||i++:(h||(t=!0),a=!0,h=!0,f(e.points[n],e.points[i]),n!==s&&i!==s?(f(e.points[n],e.points[s],"green"),k(e.points[n],e.points[i],e.points[s])&&(t=!1),s++):s++,s===l&&(h=!1,s=0),!0===t&&0===s?(e.checked.push({startIdx:n,endIdx:i}),e.hull.push(e.points[n]),e.hullLines.push({start:e.points[n],end:e.points[i]}),h||i++):h||i++);i===l&&(a=!1,i=0),a||0!==i||(n++,i=0),n===l&&e.stop(r);for(var o=0;o<e.hullLines.length;o++)f(e.hullLines[o].start,e.hullLines[o].end,"red");for(var u=0;u<e.points.length;u++)e.points[u].draw();for(var c=0;c<e.hull.length;c++)e.hull[c].draw(5,"red")}),100);this.drawFinish()}},{key:"drawFinish",value:function(){d();for(var t=0;t<this.hullLines.length;t++)f(this.hullLines[t].start,this.hullLines[t].end,"red");for(var e=0;e<this.points.length;e++)this.points[e].draw();for(var n=0;n<this.hull.length;n++)this.hull[n].draw(5,"red")}},{key:"stop",value:function(t){clearInterval(t),this.sucess=!0}}]),t}(),S=function(){function t(e){Object(r.a)(this,t),this.points=e.sort((function(t,e){return t.y-e.y})),this.success=!1,this.hull=[],this.hull.push(this.points[0])}return Object(o.a)(t,[{key:"instantCompute",value:function(){this.points=m(this.points[0],this.points),this.hull.push(this.points[1]);for(var t=2,e=this.points.length;t<e;){k(this.hull[this.hull.length-1],this.hull[this.hull.length-2],this.points[t])&&2!=this.hull.length?this.hull.pop():(this.hull.push(this.points[t]),t++)}this.drawCurrentState(!0)}},{key:"start",value:function(){var t=this;this.points=m(this.points[0],this.points),this.hull.push(this.points[1]);var e=2,n=this.points.length,i=setInterval((function(){var s=t.hull[t.hull.length-1],a=t.hull[t.hull.length-2];t.drawCurrentState(),k(s,a,t.points[e])&&2!=t.hull.length?t.hull.pop():(t.hull.push(t.points[e]),e++),e>=n&&(t.stop(i),t.drawCurrentState(!0))}),300)}},{key:"drawCurrentState",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];d(),v(this.hull,"red",!!t);for(var e=0;e<this.points.length;e++)this.points[e].draw();for(var n=0;n<this.hull.length;n++)this.hull[n].draw(5,"red")}},{key:"stop",value:function(t){clearInterval(t),this.sucess=!0}}]),t}(),M=function(){function t(){Object(r.a)(this,t),this.points=[],this.algorithm=null,this.success=!1}return Object(o.a)(t,[{key:"addPoint",value:function(t,e){this.points.push(new g(t,e)),this.draw()}},{key:"naive",value:function(t){this.points.length<3||(this.algorithm=new O(this.points),t?this.algorithm.instantCompute():this.algorithm.start())}},{key:"giftWrapping",value:function(t){this.points.length<3||(this.algorithm=new C(this.points),t?this.algorithm.instantCompute():this.algorithm.start())}},{key:"grahamScan",value:function(t){this.points.length<3||(this.algorithm=new S(this.points),t?this.algorithm.instantCompute():this.algorithm.start())}},{key:"isAlgorithmFinished",value:function(){return null==this.algorithm?null:this.algorithm.sucess}},{key:"reset",value:function(){d()}},{key:"draw",value:function(){this.reset();for(var t=0;t<this.points.length;t++)this.points[t].draw()}}]),t}(),R=n(45),F=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(r.a)(this,n),(i=e.call(this,t)).intervallID=0,i.state={plane:new M,isRunning:!1,isFinished:!1,algoMode:-1},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.state.plane.reset()}},{key:"fastCompute",value:function(){switch(this.setState({isFinished:!0}),this.state.algoMode){case 0:this.state.plane.naive(!0);break;case 1:this.state.plane.giftWrapping(!0);break;case 2:this.state.plane.grahamScan(!0);break;default:return void this.setState({isRunning:!1})}}},{key:"animation",value:function(){var t=this;switch(this.setState({isRunning:!0}),this.state.algoMode){case 0:this.state.plane.naive(!1),this.intervallID=setInterval((function(){t.state.plane.isAlgorithmFinished()&&t.stop(t.intervallID)}),50);break;case 1:this.state.plane.giftWrapping(!1),this.intervallID=setInterval((function(){t.state.plane.isAlgorithmFinished()&&t.stop(t.intervallID)}),50);break;case 2:this.state.plane.grahamScan(!1),this.intervallID=setInterval((function(){t.state.plane.isAlgorithmFinished()&&t.stop(t.intervallID)}),50);break;default:return void this.setState({isRunning:!1})}}},{key:"resetHull",value:function(){this.state.plane.draw(),this.setState({isFinished:!1})}},{key:"reset",value:function(){var t=this;this.setState({isRunning:!1,isFinished:!1,plane:new M}),setTimeout((function(){t.state.plane.draw()}),10)}},{key:"stop",value:function(t){clearInterval(t),this.setState({isRunning:!1,isFinished:!0})}},{key:"stopAll",value:function(){for(var t=window.setInterval("",9999),e=1;e<t;e++)window.clearInterval(e);this.setState({isRunning:!1}),this.state.isFinished||this.state.plane.draw()}},{key:"addRandomPoints",value:function(){for(var t=0;t<5;t++){var e=800*Math.random(),n=400*Math.random();this.state.plane.addPoint(e,n)}}},{key:"addPoint",value:function(t){var e=document.getElementById("2d-plane"),n=this.getMousePos(e,t);if(this.state.plane.addPoint(n.x,n.y),this.state.isFinished)switch(this.state.algoMode){case 0:this.state.plane.naive(!0);break;case 1:this.state.plane.giftWrapping(!0);break;case 2:this.state.plane.grahamScan(!0)}}},{key:"getMousePos",value:function(t,e){var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}},{key:"switchAlgoMode",value:function(t){this.setState({algoMode:parseInt(t.target.value)}),this.resetHull()}},{key:"render",value:function(){var t=this;return Object(i.jsxs)("div",{className:"convexehull",children:[Object(i.jsx)("h1",{children:"Convexe Hull"}),Object(i.jsxs)("select",{className:"select-css",onChange:function(e,n){return t.switchAlgoMode(e,n)},children:[Object(i.jsx)("option",{value:"-1",children:"Select Algorithm"}),Object(i.jsx)("option",{value:0,children:"Naive"}),Object(i.jsx)("option",{value:1,children:"Gift Wrapping"}),Object(i.jsx)("option",{value:2,children:"Graham Scan"})]}),Object(i.jsx)(R.a,{disabled:this.state.isRunning,variant:"outlined",color:"primary",onClick:function(){return t.fastCompute()},children:"Fast Compute"}),Object(i.jsx)(R.a,{disabled:this.state.isRunning,variant:"outlined",color:"primary",onClick:function(){return t.animation()},children:"Animation"}),Object(i.jsx)(R.a,{disabled:!this.state.isRunning,variant:"outlined",color:"secondary",onClick:function(){return t.stopAll()},children:"Stop"}),Object(i.jsx)(R.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.addRandomPoints()},children:"Random Points"}),Object(i.jsx)(R.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.resetHull()},children:"Reset Hull"}),Object(i.jsx)(R.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.reset()},children:"Reset"}),Object(i.jsx)("h4",{children:this.state.isRunning?"Compute...":"Ready"}),Object(i.jsx)("div",{className:"convexehull__canvas",children:Object(i.jsx)("canvas",{className:"convexehull_canvas__2dplane",id:"2d-plane",width:800,height:400,onClick:this.state.isRunning?function(){return null}:function(e){return t.addPoint(e)}})})]})}}]),n}(a.a.Component);var P=function(){return Object(i.jsx)("div",{className:"app",children:Object(i.jsx)(F,{})})},V=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,a=e.getLCP,h=e.getTTFB;n(t),i(t),s(t),a(t),h(t)}))};l.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(P,{})}),document.getElementById("root")),V()}},[[31,1,2]]]);
//# sourceMappingURL=main.54a6d824.chunk.js.map