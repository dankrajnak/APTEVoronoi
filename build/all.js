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

var pointGenerator = new PoissonDisk(width, height, radius);
var points = pointGenerator.generatePoints();

//Fisher-Yates Shuffle algorithm. 
function shuffle(array) {
    var index = points.length,
        lastItem,
        randomItem;
    while (index) {
        randomItem = Math.random() * index-- | 0; // 0 ≤ randomItem < index
        lastItem = array[index];
        array[index] = array[randomItem];
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

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);
var polygons = voronoi.polygons(points);

//DRAW THE DIAGRAM
var canvas = d3.select('#fullscreen').append('canvas').attr('width', width).attr('height', height);
var context = canvas.node().getContext('2d');

d3.interval(function (elapsed) {
    //SPEED = 20000-(elapsed*20000/180000+1000)
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

d3.select('body').on('click', function () {
    var index = SPEEDS.findIndex(function (item) {
        return item == SPEED;
    }) + 1;
    if (index == SPEEDS.length) index = 0;
    SPEED = SPEEDS[index];
});

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 32) toggleFullScreen(document.querySelector('#fullscreen'));
});

function toggleFullScreen(element) {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else {
            element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (element.mozCancelFullScreen) {
            element.mozCancelFullScreen();
        } else {
            element.webkitCancelFullScreen();
        }
    }
    resize();
}

function resize() {
    //width = document.width;
    //height = document.height;
    height = 900;
    canvas.attr('width', width).attr('height', height);
    pointGenerator = new PoissonDisk(width, height, radius);
    points = pointGenerator.generatePoints();
    shuffle(points);
    initialPositions = [];
    //Deep copy.
    points.forEach(function (point) {
        return initialPositions.push(point.slice());
    });
    voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);
    polygons = voronoi.polygons(points);
}

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

    var numberOfWaves = 2;
    //numberOfWaves *= Math.sin(elapsed/4000)+2;
    var period = width / numberOfWaves;
    var amplitude = 50;

    return amplitude * Math.sin(2 * Math.PI / period * xpos - elapsed / SPEED);
}