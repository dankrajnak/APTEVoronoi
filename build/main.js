'use strict';

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