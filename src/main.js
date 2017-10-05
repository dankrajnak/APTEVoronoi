const width = window.innerWidth;
const height = window.innerHeight;
const radius = 40;
const margins = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

d3.select('svg').attr('width', width / 3);



const voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

const pointGenerator = new PoissonDisk(width, height, radius);
let points = pointGenerator.generatePoints();

//Fisher-Yates Shuffle algorithm. 
function shuffle(array) {
    var number = points.length,
        lastItem, randomItem;
    while (number) {
        randomItem = Math.random() * number-- | 0; // 0 ≤ i < n
        lastItem = array[number];
        array[number] = array[randomItem];
        array[randomItem] = lastItem;
    }
    return array;
}
shuffle(points);
const initialPositions = [];
//Deep copy.
points.forEach((point) => initialPositions.push(point.slice()));

let polygons = voronoi.polygons(points);
console.log("HEY");
console.log(polygons);

//DRAW THE DIAGRAM
const canvas = d3.select('body').append('canvas').attr('width', width).attr('height', height);
const context = canvas.node().getContext('2d');

d3.interval((elapsed) => {
    //DRAW
    polygons.forEach((polygon, index) => {
        context.beginPath();
        context.moveTo(polygon[polygon.length - 1][0], polygon[polygon.length - 1][1])
        polygon.forEach((point) => context.lineTo(point[0], point[1]));

        const color = createColor(index / polygons.length, 255);
        const colorString = `rgba(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0}, ${color[3] | 0})`

        context.strokeStyle = colorString;
        context.fillStyle = colorString;
        context.stroke();
        context.fill();
        context.closePath();
    })

    //MOVE
    points.forEach((point, index) => point[1] = initialPositions[index][1] + makeItWavy(point[0], elapsed));
    //COMPUTE
    polygons = voronoi.polygons(points);
}, 40);

const SPEEDS = [20000, 1000, 100];
let SPEED = SPEEDS[0];

d3.select('#container').on('click', ()=>{
    console.log('CHANGE SPEED');
    console.log(SPEED);
    let index = SPEEDS.findIndex((item) => item == SPEED)+1;
    if(index == SPEEDS.length)
        index = 0;
    SPEED = SPEEDS[index];
    console.log(SPEED);
})

//Interpolates between colors
function createColor(value, transparency = 255) {
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
                    x: a.x + (b.midpoint / 100) * (b.x - a.x),
                    red: (a.red + b.red) / 2,
                    green: (a.green + b.green) / 2,
                    blue: (a.blue + b.blue) / 2,
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
    var period = width/numberOfWaves;
    var amplitude = 50;
        
    return amplitude* Math.sin((2*Math.PI/period)*xpos-elapsed/SPEED);
    

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
