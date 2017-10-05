/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csscolumns-customelements-flexbox-history-picture-pointerevents-postmessage-sizes-srcset-webgl-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),w.push((o?"":"no-")+a.join("-"))}}function i(e){var t=S.className,n=Modernizr._config.classPrefix||"";if(x&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),x?S.className.baseVal=t:S.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)P(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):x?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=a(x?"svg":"body"),e.fake=!0),e}function u(e,n,r,o){var i,s,u,f,d="modernizr",c=a("div"),p=l();if(parseInt(r,10))for(;r--;)u=a("div"),u.id=o?o[r]:d+(r+1),c.appendChild(u);return i=a("style"),i.type="text/css",i.id="s"+d,(p.fake?p:c).appendChild(i),p.appendChild(c),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),s=n(c,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=f,S.offsetHeight):c.parentNode.removeChild(c),!!s}function f(e,t){return!!~(""+e).indexOf(t)}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function p(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+d(t[o])+":"+r+")");return i=i.join(" or "),u("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return n}function m(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function h(e,t,o,i){function s(){u&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=p(e,o);if(!r(l,"undefined"))return l}for(var u,d,c,h,v,A=["modernizr","tspan","samp"];!N.style&&A.length;)u=!0,N.modElem=a(A.shift()),N.style=N.modElem.style;for(c=e.length,d=0;c>d;d++)if(h=e[d],v=N.style[h],f(h,"-")&&(h=m(h)),N.style[h]!==n){if(i||r(o,"undefined"))return s(),"pfx"==t?h:!0;try{N.style[h]=o}catch(g){}if(N.style[h]!=v)return s(),"pfx"==t?h:!0}return s(),!1}function v(e,t){return function(){return e.apply(t,arguments)}}function A(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?v(o,n||t):o);return!1}function g(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+O.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?h(a,t,o,i):(a=(e+" "+T.join(s+" ")+s).split(" "),A(a,t,n))}function y(e,t,r){return g(e,n,n,t,r)}var C=[],b={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=b,Modernizr=new Modernizr;var w=[],S=t.documentElement,x="svg"===S.nodeName.toLowerCase(),_="Moz O ms Webkit",T=b._config.usePrefixes?_.toLowerCase().split(" "):[];b._domPrefixes=T;var E=b._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];b._prefixes=E;var P;!function(){var e={}.hasOwnProperty;P=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),b._l={},b.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},b._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){b.addTest=s});var k=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();b.hasEvent=k;var z=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return u("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();b.mq=z;var B=function(e,t){var n=!1,r=a("div"),o=r.style;if(e in o){var i=T.length;for(o[e]=t,n=o[e];i--&&!n;)o[e]="-"+T[i]+"-"+t,n=o[e]}return""===n&&(n=!1),n};b.prefixedCSSValue=B;var O=b._config.usePrefixes?_.split(" "):[];b._cssomPrefixes=O;var L={elem:a("modernizr")};Modernizr._q.push(function(){delete L.elem});var N={style:L.elem.style};Modernizr._q.unshift(function(){delete N.style}),b.testAllProps=g,b.testAllProps=y;b.testProp=function(e,t,r){return h([e],n,t,r)},b.testStyles=u;Modernizr.addTest("customelements","customElements"in e),Modernizr.addTest("history",function(){var t=navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")||"file:"===location.protocol?e.history&&"pushState"in e.history:!1}),Modernizr.addTest("pointerevents",function(){var e=!1,t=T.length;for(e=Modernizr.hasEvent("pointerdown");t--&&!e;)k(T[t]+"pointerdown")&&(e=!0);return e}),Modernizr.addTest("postmessage","postMessage"in e),Modernizr.addTest("webgl",function(){var t=a("canvas"),n="probablySupportsContext"in t?"probablySupportsContext":"supportsContext";return n in t?t[n]("webgl")||t[n]("experimental-webgl"):"WebGLRenderingContext"in e});var R=!1;try{R="WebSocket"in e&&2===e.WebSocket.CLOSING}catch(j){}Modernizr.addTest("websockets",R),Modernizr.addTest("cssanimations",y("animationName","a",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,t=y("columnCount");try{e=!!t,e&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=y("column"+n[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||y(n[r])),Modernizr.addTest("csscolumns."+e,t)}(),Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("picture","HTMLPictureElement"in e),Modernizr.addAsyncTest(function(){var e,t,n,r=a("img"),o="sizes"in r;!o&&"srcset"in r?(t="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",n=function(){s("sizes",2==r.width)},r.onload=n,r.onerror=n,r.setAttribute("sizes","9px"),r.srcset=e+" 1w,"+t+" 8w",r.src=e):s("sizes",o)}),Modernizr.addTest("srcset","srcset"in a("img")),Modernizr.addTest("webworkers","Worker"in e),o(),i(w),delete b.addTest,delete b.addAsyncTest;for(var M=0;M<Modernizr._q.length;M++)Modernizr._q[M]();e.Modernizr=Modernizr}(window,document);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//author: Daniel Krajnak
var PoissonDisk = function () {
    function PoissonDisk(width, height, radius) {
        _classCallCheck(this, PoissonDisk);

        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    _createClass(PoissonDisk, [{
        key: 'generatePoints',
        value: function generatePoints() {
            var points = [],
                activeSamples = [],
                numberToCheck = 30;
            // Add first point
            activeSamples.push([Math.random() * this.width, Math.random() * this.height]);

            while (activeSamples.length > 0) {
                //Get random active sample
                var activeSamplesIndex = Math.floor(Math.random() * activeSamples.length);
                var sample = activeSamples[activeSamplesIndex];

                //Generate new point within the annulus (r to 2r from sample)
                var newPoint = this._newPointInAnnulus(sample);
                var validPoint = false;
                for (var i = 0; i < numberToCheck; i++) {
                    //Point is valid if it is at least a radius away from all other points (active or not)
                    if (this._pointIsValid(newPoint, activeSamples.concat(points))) {
                        validPoint = true;
                        break;
                    }
                    newPoint = this._newPointInAnnulus(sample);
                }
                if (validPoint) {
                    activeSamples.push(newPoint);
                } else {
                    //No valid points found, remove this from active samples.
                    activeSamples.splice(activeSamplesIndex, 1);
                    points.push(sample);
                }
            }
            return points;
        }
    }, {
        key: '_newPointInAnnulus',
        value: function _newPointInAnnulus(point) {
            var x = point[0],
                y = point[1];
            var dist = Math.random() * this.radius + this.radius;
            var angle = Math.random() * Math.PI * 2;
            var dx = dist * Math.cos(angle);
            var dy = dist * Math.sin(angle);
            return [x + dx, y + dy];
        }
    }, {
        key: '_pointIsValid',
        value: function _pointIsValid(point, samples) {
            var _this = this;

            if (point[0] < -this.radius || point[0] > this.width + this.radius) {
                return false;
            }

            if (point[1] < -this.radius || point[1] > this.height + this.radius) {
                return false;
            }
            var valid = true;

            samples.forEach(function (sample) {
                if (Math.sqrt(Math.pow(point[0] - sample[0], 2) + Math.pow(point[1] - sample[1], 2)) < _this.radius) {
                    valid = false;
                    return; //exit forEach
                }
            });
            return valid;
        }
    }]);

    return PoissonDisk;
}();

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 40;
var margins = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

d3.select('svg').attr('width', width / 3);

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

var pointGenerator = new PoissonDisk(width, height, radius);
var points = pointGenerator.generatePoints();

//Fisher-Yates Shuffle algorithm. 
function shuffle(array) {
    var number = points.length,
        lastItem,
        randomItem;
    while (number) {
        randomItem = Math.random() * number-- | 0; // 0 ≤ i < n
        lastItem = array[number];
        array[number] = array[randomItem];
        array[randomItem] = lastItem;
    }
    return array;
}
shuffle(points);
var initialPositions = [];
//Deep copy.
points.forEach(function (point) {
    return initialPositions.push(point.slice());
});

var polygons = voronoi.polygons(points);
console.log("HEY");
console.log(polygons);

//DRAW THE DIAGRAM
var canvas = d3.select('body').append('canvas').attr('width', width).attr('height', height);
var context = canvas.node().getContext('2d');

d3.interval(function (elapsed) {
    //DRAW
    polygons.forEach(function (polygon, index) {
        context.beginPath();
        context.moveTo(polygon[polygon.length - 1][0], polygon[polygon.length - 1][1]);
        polygon.forEach(function (point) {
            return context.lineTo(point[0], point[1]);
        });

        var color = createColor(index / polygons.length, 255);
        var colorString = 'rgba(' + (color[0] | 0) + ', ' + (color[1] | 0) + ', ' + (color[2] | 0) + ', ' + (color[3] | 0) + ')';

        context.strokeStyle = colorString;
        context.fillStyle = colorString;
        context.stroke();
        context.fill();
        context.closePath();
    });

    //MOVE
    points.forEach(function (point, index) {
        return point[1] = initialPositions[index][1] + makeItWavy(point[0], elapsed);
    });
    //COMPUTE
    polygons = voronoi.polygons(points);
}, 40);

var SPEEDS = [20000, 1000, 100];
var SPEED = SPEEDS[0];

d3.select('#container').on('click', function () {
    console.log('CHANGE SPEED');
    console.log(SPEED);
    var index = SPEEDS.findIndex(function (item) {
        return item == SPEED;
    }) + 1;
    if (index == SPEEDS.length) index = 0;
    SPEED = SPEEDS[index];
    console.log(SPEED);
});

//Interpolates between colors
function createColor(value) {
    var transparency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;

    value = value * 100; //Just to make things more legible.
    var r;
    var g;
    var b;
    /* Alternative color profile:
    var black = {
    	red: 40,
    	green: 40,
    	blue: 40,
    	midpoint:0,
    	x: 0};
     var APTEred = {
    	red: 157, 
    	green: 29, 
    	blue: 33,
    	midpoint: 10,
    	x: 10};
      var APTEblue = {
    	red: 167, 
    	green: 191,
    	blue: 209,
    	midpoint:60,
    	x: 80};
     var white = {
    	red: 250, 
    	blue: 250, 
    	green: 250, 
    	midpoint: 90,
    	x: 98};
    */

    var APTEred = {
        red: 157,
        green: 29,
        blue: 33,
        midpoint: 0,
        x: 0
    };

    var white = {
        red: 250,
        blue: 250,
        green: 250,
        midpoint: 80,
        x: 60
    };

    var APTEblue = {
        red: 167,
        green: 191,
        blue: 209,
        midpoint: 10,
        x: 80
    };

    var colors = [];

    colors.push(APTEred);
    colors.push(white);
    colors.push(APTEblue);

    if (value <= colors[0].x) {
        r = colors[0].red;
        g = colors[0].green;
        b = colors[0].blue;
    } else if (value >= colors[colors.length - 1].x) {
        r = colors[colors.length - 1].red;
        g = colors[colors.length - 1].green;
        b = colors[colors.length - 1].blue;
    } else {
        for (var i = 1; i < colors.length; i++) {
            if (value >= colors[i - 1].x && value < colors[i].x) {
                var a = colors[i - 1];
                var b = colors[i];

                var midpoint = {
                    x: a.x + b.midpoint / 100 * (b.x - a.x),
                    red: (a.red + b.red) / 2,
                    green: (a.green + b.green) / 2,
                    blue: (a.blue + b.blue) / 2
                };

                if (value < midpoint.x) {
                    r = (midpoint.red - a.red) / (midpoint.x - a.x) * (value - midpoint.x) + midpoint.red;
                    g = (midpoint.green - a.green) / (midpoint.x - a.x) * (value - midpoint.x) + midpoint.green;
                    b = (midpoint.blue - a.blue) / (midpoint.x - a.x) * (value - midpoint.x) + midpoint.blue;
                } else {
                    r = (b.red - midpoint.red) / (b.x - midpoint.x) * (value - b.x) + b.red;
                    g = (b.green - midpoint.green) / (b.x - midpoint.x) * (value - b.x) + b.green;
                    b = (b.blue - midpoint.blue) / (b.x - midpoint.x) * (value - b.x) + b.blue;
                }
            }
        }
    }

    return [r, g, b, transparency];
}

function makeItWavy(xpos, elapsed) {

    //THIS DOES NOT WORK.  WE NEED A FUNCTION WHICH MAINTAINS UNIFORM DISTRIBUTION.
    var numberOfWaves = 3;
    //numberOfWaves *= Math.sin(elapsed/4000)+2;
    var period = width / numberOfWaves;
    var amplitude = 50;

    return amplitude * Math.sin(2 * Math.PI / period * xpos - elapsed / SPEED);

    //	return Math.sin((x*numberWaves*Math.PI/(width/(frameModulo/period))+elapsed/2000))*6;
}

//
//function setup (){
//	v = new Voronoi();
//	points = [];
//	w = window.innerWidth+80;
//	h = window.innerHeight+80;
//	createCanvas(w, h);
//	counter = 0;
//
//	frameModulo = 0
//	moduloIncrease = true
//
//	tempPoint = [];
//	for(var i=0; i<w/3; i++){
//		tempPoint[i] = h/2;
//	}
//
//	initialPoints = [];
//	for(var i =0; i<250; i++){
//		points.unshift(new Point(Math.random()*w, Math.random()*h));
//		initialPoints.unshift(points[0]);
//	}
//
//	/* Image processing 
//	image(img, 20, 20 );
//	var d = pixelDensity();
//	var amountOfPixels = 4*d*img.width*img.height;
//	loadPixels();
//	for(var i=0; i<amountOfPixels; i+=4){
//		var thisColor = color(pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
//		var bright = brightness(thisColor);
//		pixels[i] = bright;
//		pixels[i+1] = bright;
//		pixels[i+2] = bright;
//	}
//
//	updatePixels();*/
//
//
//}
//
//function draw(){
//
//
//	background(255);
//	updateModulos(150);
//
//
//	counter++;
//	v.Compute(points, w, h);
//
//
//	var edges = v.GetEdges();
//	var cells = createCellsFromEdges(edges, points);
//
//	
//	
//	noStroke();
//	cells.forEach(function(c){
//		fill(createColor(c.center.id, 255));
//		beginShape();
//		for(var i=0; i<c.vertices.length; i++){
//			vertex(c.vertices[i].x, c.vertices[i].y);
//		}
//		endShape(CLOSE);
//		beginShape();
//		fill(createColor(c.center.id, 120));
//		for(var i =0; i<c.vertices.length; i++){
//			var initial = c.vertices[i].x;
//			vertex(initial + makeItWavy(c.vertices[i].x)*2, c.vertices[i].y);
//		}
//		endShape(CLOSE)
//	});
//
//	stroke(0);
//	edges.forEach(function(e){
//		//line(e.start.x, e.start.y, e.end.x, e.end.y);
//	});
//
//
//	for(var i = 0; i<points.length; i++){
//		points[i].y = initialPoints[i].y + makeItWavy(points[i].x);
//	}
//
//
//
//	
//	var helpersOn = false;
//	if(helpersOn){
//		for(var i=0; i<(w-1)/3; i++){
//			tempPoint[i] += makeItWavy(i);
//			line(i*3, tempPoint[i], (i+1)*3, tempPoint[i+1]);
//			stroke(255, 0, 0);
//			line(i*3, h/2+makeItWavy(i*3)*5, (i+1)*3,h/2+makeItWavy((i+1)*3)*5);
//			stroke(0,0,255);
//			line(0, h/2, w, h/2);
//			stroke(0);
//		}
//	}
//}
//
//function createColor(id, transparency){
//	var value = 100*id/points.length;
//	var r;
//	var g;
//	var b;
//	/*
//	var black = {
//		red: 40,
//		green: 40,
//		blue: 40,
//		midpoint:0,
//		x: 0};
//
//	var APTEred = {
//		red: 157, 
//		green: 29, 
//		blue: 33,
//		midpoint: 10,
//		x: 10};
//	
//	var APTEblue = {
//		red: 167, 
//		green: 191,
//		blue: 209,
//		midpoint:60,
//		x: 80};
//
//	var white = {
//		red: 250, 
//		blue: 250, 
//		green: 250, 
//		midpoint: 90,
//		x: 98};
//	*/
//
//	var APTEred = {
//		red: 157, 
//		green: 29, 
//		blue: 33,
//		midpoint: 0,
//		x: 0};
//	
//	var white = {
//		red: 250, 
//		blue: 250, 
//		green: 250, 
//		midpoint: 80,
//		x: 60};
//	
//	var APTEblue = {
//		red: 167, 
//		green: 191,
//		blue: 209,
//		midpoint: 10,
//		x: 80};
//	
//	var colors = [];
//
//	colors.push(APTEred);
//	colors.push(white);
//	colors.push(APTEblue);
//
//	if(value < colors[0].x){
//		r = colors[0].red;
//		g = colors[0].green;
//		b = colors[0].blue;
//	}
//	else if(value > colors[colors.length-1].x){
//		r = colors[colors.length-1].red;
//		g = colors[colors.length-1].green;
//		b = colors[colors.length-1].blue;
//	}
//	else{
//		for(var i = 1; i <colors.length; i++){
//			if(value > colors[i-1].x && value < colors[i].x){
//				var a = colors[i-1];
//				var b = colors[i];
//
//				var midpoint = {
//					x: a.x+(b.midpoint/100)*(b.x-a.x),
//					red: (a.red+b.red)/2,
//					green: (a.green+b.green)/2,
//					blue: (a.blue+b.blue)/2,
//				};
//
//				if(value < midpoint.x){
//					r = (midpoint.red-a.red)/(midpoint.x - a.x)*(value - midpoint.x)+midpoint.red;
//					g = (midpoint.green-a.green)/(midpoint.x - a.x)*(value - midpoint.x)+midpoint.green;
//					b = (midpoint.blue-a.blue)/(midpoint.x - a.x)*(value - midpoint.x)+midpoint.blue;
//				}
//				else{
//					r = (b.red-midpoint.red)/(b.x - midpoint.x)*(value - b.x)+b.red;
//					g = (b.green-midpoint.green)/(b.x - midpoint.x)*(value - b.x)+b.green;
//					b = (b.blue-midpoint.blue)/(b.x - midpoint.x)*(value - b.x)+b.blue;
//				}
//			}
//		}
//	}
//	
//	return [r, g, b, transparency];
//	
//}
//
//function makeItWavy(x){
//	var numberWaves = 3;
//	var period = 50;
//	
//	return Math.sin((x*numberWaves*Math.PI/(w/(frameModulo/period))+frameCount/20))*6;
//}
//
//function updateModulos(topValue){
//	if(moduloIncrease)
//		frameModulo++;
//	else
//		frameModulo--;
//	if(frameModulo > topValue)
//		moduloIncrease = false;
//	else if(frameModulo <= 0)
//		moduloIncrease = true;
//}
//
//function createCellsFromEdges(edges, points){
//	var edgeLeft = edges.slice(0);
//	var edgeRight = edges.slice(0);
//
//	edgeLeft.sort(function(a,b){
//		return a.left.id - b.left.id;
//	});
//
//	edgeRight.sort(function(a,b){
//		return a.right.id - b.right.id;
//	});
//
//	var maxID = Math.max(edgeLeft[edgeLeft.length-1].left.id, edgeRight[edgeRight.length-1].right.id);
//
//	var cells = [];	
//	var currentId = edgeLeft[0].left.id;
//	var rightIndex = 0;
//	var leftIndex = 0;
//	
//
//	for(var i =0; i<=maxID; i++){
//		var cell = new Cell();
//		while(rightIndex < edgeRight.length && edgeRight[rightIndex].right.id === i)
//			cell.edges.push(edgeRight[rightIndex++]);
//		
//		while(leftIndex < edgeLeft.length && edgeLeft[leftIndex].left.id === i)
//			cell.edges.push(edgeLeft[leftIndex++]);
//		
//
//		if(cell.edges.length > 0){
//			cell.center = cell.edges[cell.edges.length-1].left;
//			cell.vertices = clockwiseVertices(cell.edges);
//			cells.push(cell);
//		}
//	}
//
//	return cells;
//}
//
//function clockwiseVertices(edges){
//	var vertices = [];
//	
//	var es = edges.slice(0);
//	/*edges.forEach(function(e){
//		if(vertices.indexOf(e.start) === -1)
//			vertices.push(e.start);
//		if(vertices.indexOf(e.end) === -1)
//			vertices.push(e.end);
//	});*/
//
//
//	addBoundingEdges(es);
//	vertices.push(es[0].start);
//	vertices.push(es[0].end);
//	es.shift();
//	var length = es.length;
//
//
//	for(var j = 0; j<length; j++){ //safer than while(es.length > 0)
//		for(var i = 0; i<es.length; i++){
//			if(es[i].start.x === vertices[0].x){
//				vertices.unshift(es[i].end);
//				es.splice(i, 1);
//				break;
//			}
//			else if (es[i].end.x === vertices[0].x){
//				vertices.unshift(es[i].start);
//				es.splice(i, 1);
//				break;
//			}
//			
//
//			}
//		}
//
//
//	var sortedVertices = [];
//
//	return vertices;
//}
//
//function addBoundingEdges(edges){
//		var i = 0;
//		var continueLooping = false;
//		var extremeEdges = [];
//		var a;
//		var b;
//		var aIntersect;
//		var bIntersect;
//
//		for(var i = 0; i<edges.length; i++){
//			if(edges[i].start.x <= 0 || edges[i].start.x >= w || edges[i].start.y <= 0 || edges[i].start.y >= h){
//				extremeEdges.push(edges[i]);
//				if(a == null) a = edges[i].start;
//				else{
//				 b = edges[i].start;
//				 break;
//				}
//			}
//			if(edges[i].end.x <= 0 || edges[i].end.x >= w || edges[i].end.y <= 0 || edges[i].end.y >= h){
//				extremeEdges.push(edges[i]);
//				if(a == null) a = edges[i].end;
//				else{
//					b = edges[i].end;
//					break;
//				}
//			}
//		}
//
//		if(extremeEdges.length  < 2)
//			return;
//
//
//
//		//Find which walls each edge intersects 
//		if(a.y > 0 && a.y < h){
//			if(a.x <= 0)
//				aIntersect = 0;
//			else aIntersect = 2;
//		}
//		else{
//			if(a.y <= 0)
//				aIntersect = 1;
//			else aIntersect = 3;
//		}
//
//		if(b.y > 0 && b.y < h){
//			if(b.x <= 0)
//				bIntersect = 0;
//			else bIntersect = 2;
//		}
//		else{
//			if(b.y <= 0)
//				bIntersect = 1;
//			else bIntersect = 3;
//		}
//
//		if(aIntersect===bIntersect){
//			var boundEdge = new VEdge();
//			boundEdge.start = a;
//			boundEdge.end = b;
//			edges.push(boundEdge);
//		}
//
//	addBoundingEdges.COUNTER++;
//}
//
//addBoundingEdges.COUNTER = 0;
//
//function keyPressed(){
//	if (keyCode === 70){
//		var fs = fullscreen();
//    	fullscreen(!fs)
//	}
//	
//	w = width+80;
//	h = height+80;
//	resizeCanvas(w, h);
//
//	v = new Voronoi();
//	points.splice(0,points.length);
//
//
//	tempPoint = [];
//	for(var i=0; i<w/3; i++){
//		tempPoint[i] = h/2;
//	}
//
//	initialPoints.splice(0, points.length);
//
//	Point.ids = 0;
//	for(var i =0; i<400; i++){
//		points.unshift(new Point(Math.random()*w, Math.random()*h));
//		initialPoints.unshift(points[0]);
//	}
//
//	return false;
//}
//
//
//function Cell(){
//	this.edges = [];
//	this.vertices = [];
//	this.center = null;
//}
//
//