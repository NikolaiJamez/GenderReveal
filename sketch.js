const OFFSET = 200;
const girl = true;
const SPAWNCHANCE = 0.02;
let GRAVITY;
const BIGSIZE = 5;
const BIGMINFUSE = 50;
const BIGMAXFUSE = 100;
const SMALLSIZE = 1;
const SMALLMINFUSE = 40;
const SMALLMAXFUSE = 100;
const MINSMALL = 10;
const MAXSMALL = 100;

let images;
let count;
let size;
let font;
let fireworks;
let otherCanvas;

function preload() {
	font = loadFont('assets/font/girl.otf');
	images = [];
	for (let i = 0; i < 154; i++) {
		let path = "assets/img/" + i + ".png";
		images[i] = loadImage(path);
	}
}

function mousePressed() {
	if (count < 153) {
		let toAdd = 1;
		if (count < 110) {
			toAdd += 4;
		}
		count += toAdd;
	}
}

function setup() {
	createCanvas(443, 600);
	count = 0;
	size = 0;
	textAlign(CENTER, CENTER);
	frameRate(23);
	strokeWeight(3);
	fireworks = [];
	GRAVITY = createVector(0, 0.01);
	otherCanvas = createGraphics(800, 600);
}

function reveal() {
	textSize(size);
	textFont(font);
	if (girl) {
		stroke(240,128,128);
		fill(240,128,128);
		stroke(0);
		fill(0);
		text("(It's a Mystery)", 0, 0, width, height);
	}
	else {
		stroke(135,206,250);
		fill(135,206,250);
		text("(It's a Boy)", 0, 0, width, height);
	}
}

function lightShow() {
	if (random() < SPAWNCHANCE) {
		fireworks.push(new Firework());
	}
	for (let f = fireworks.length - 1; f >= 0; f--) {
		fireworks[f].applyForce(GRAVITY);
		fireworks[f].update();
		fireworks[f].show();
		if (fireworks[f].done) {
			if (fireworks[f].canExplode) {
				fireworks[f].explode();
			}
			fireworks.splice(f, 1);
		}
	}
}

function update() {
	count++;
	size += 3;
}

function draw() {
	if (count < 153) {
		background(255, 255, 255);
	} else {
		background(255, 255, 255, 20);
	}
	if (count >= 153) {
		push();
		lightShow();
		pop();
	}
	image(images[count], 0, 0);
	if (count > 119) {
		reveal();
		if (count < 153) {
			update();
		}
	}
}