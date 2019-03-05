let angle = 0;
let offset = 0.05;
let rotAngle = 0;

let radius = 150;			// Radius used to calculate position of tiles
let subDivisions = 5;	// Divide each edge of the icosohedron into this many segments
let tileWidth = 1.0;	// Add padding (1.0 = no padding; 0.1 = mostly padding)

let hexasphere;
let randArray = [];

function setup() {
	createCanvas(windowHeight, windowHeight, WEBGL);
	hexasphere = new Hexasphere(radius, subDivisions, tileWidth);
	randArray = shuffle([...Array(hexasphere.tiles.length).keys()]);
	smooth();
	textureMode(NORMAL); //necessary due to bug in p5.js v0.7.3
}

function draw() {
	rotateY(rotAngle);
	orbitControl();
	background(0);
	for(var i=0; i<hexasphere.tiles.length; i++){
		let h = map(sin(angle), -1, 1, 1, 1.5);
		let c = map(sin(angle), -1, 1, 255, 10);
		fill(c);
		beginShape();
		let hexagon = hexasphere.tiles[randArray[i]].boundary;
		for (j=0; j<hexagon.length; j++) {
			let hp = hexagon[j];
			let vhp = createVector(float(hp.x), float(hp.y), float(hp.z)).mult(h);
			vertex(vhp.x, vhp.y, vhp.z);
		}
		endShape(CLOSE);
		angle += offset;
	}
	rotAngle += 0.01;
}