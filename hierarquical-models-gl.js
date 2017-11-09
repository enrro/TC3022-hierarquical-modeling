function CubeGL()
{
	// Model
	this.face = new RectangleGL();

	ObjectGL.call(this);
}

CubeGL.prototype = Object.create(ObjectGL.prototype);

CubeGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing front face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							this.face.translate(0., 0., 0.5);
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);	
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
							//Drawing back face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							this.face.translate(0., 0., -0.5);
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
							// Drawing right face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							this.face.translate(0.5, 0., 0.);
							this.face.rotate(90., 0., 1., 0.);
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
							// Drawing left face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);
							this.face.translate(-0.5, 0., 0.);
							this.face.rotate(-90., 0., 1., 0.);
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
							// Drawing top face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							this.face.translate(0., 0.5, 0.);
							this.face.rotate(-90., 1., 0., 0.);
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
							// Drawing bottom face
							stackMatrix.push(mat4.clone(this.face.modelMatrix));
							this.face.translate(0., -0.5, 0.);
							this.face.rotate(90., 1., 0., 0.);
							mat4.multiply(this.face.modelMatrix, this.modelMatrix, this.face.modelMatrix);
							this.face.render();
							this.face.modelMatrix = stackMatrix.pop();
						};

CubeGL.prototype.setDrawingMode = function(mode) {
										this.face.setDrawingMode(mode);
									};

CubeGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.face.setColor(r, g, b, a);
							};

CubeGL.prototype.setTexture = function(textureFile) {
								this.face.setTexture(textureFile);
							};

function TableGL()
{
	// Model
	this.box = new BoxGL();	// size: 1 x 1 x 1
	this.tickness = 0.1;

	ObjectGL.call(this);
}

TableGL.prototype = Object.create(ObjectGL.prototype);

TableGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing table top
							stackMatrix.push(mat4.clone(this.box.modelMatrix));
							this.box.translate(0., 0.5, 0.);
							this.box.scale(1., this.tickness, 1.);
							mat4.multiply(this.box.modelMatrix, this.modelMatrix, this.box.modelMatrix);
							this.box.render();
							this.box.modelMatrix = stackMatrix.pop();
							//Drawing Right Front leg
							stackMatrix.push(mat4.clone(this.box.modelMatrix));
							this.box.translate(0.5 - this.tickness, 0., 0.5 - this.tickness);
							this.box.scale(this.tickness, 1., this.tickness);
							mat4.multiply(this.box.modelMatrix, this.modelMatrix, this.box.modelMatrix);
							this.box.render();
							this.box.modelMatrix = stackMatrix.pop();
							//Drawing Right Back leg
							stackMatrix.push(mat4.clone(this.box.modelMatrix));
							this.box.translate(0.5 - this.tickness, 0., -0.5 + this.tickness);
							this.box.scale(this.tickness, 1., this.tickness);
							mat4.multiply(this.box.modelMatrix, this.modelMatrix, this.box.modelMatrix);
							this.box.render();
							this.box.modelMatrix = stackMatrix.pop();
							//Drawing Left Front leg
							stackMatrix.push(mat4.clone(this.box.modelMatrix));
							this.box.translate(-0.5 + this.tickness, 0., 0.5 - this.tickness);
							this.box.scale(this.tickness, 1., this.tickness);
							mat4.multiply(this.box.modelMatrix, this.modelMatrix, this.box.modelMatrix);
							this.box.render();
							this.box.modelMatrix = stackMatrix.pop();
							//Drawing Left Back leg
							stackMatrix.push(mat4.clone(this.box.modelMatrix));
							this.box.translate(-0.5 + this.tickness, 0., -0.5 + this.tickness);
							this.box.scale(this.tickness, 1., this.tickness);
							mat4.multiply(this.box.modelMatrix, this.modelMatrix, this.box.modelMatrix);
							this.box.render();
							this.box.modelMatrix = stackMatrix.pop();
						};

TableGL.prototype.setDrawingMode = function(mode) {
										this.box.setDrawingMode(mode);
									};

TableGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.box.setColor(r, g, b, a);
							};

TableGL.prototype.setTexture = function(textureFile) {
								this.box.setTexture(textureFile);
							};

function ChairGL()
{
	// Model
	this.table = new TableGL();	// size: 1 x 1 x 1
	this.back = new BoxGL();	// size: 1 x 1 x 1
	this.thikness = 0.1;

	ObjectGL.call(this);
}

ChairGL.prototype = Object.create(ObjectGL.prototype);

ChairGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing table
							stackMatrix.push(mat4.clone(this.table.modelMatrix));
							this.table.translate(0., -0.25, 0.);
							this.table.scale(0.5, 0.5, 0.5);
							mat4.multiply(this.table.modelMatrix, this.modelMatrix, this.table.modelMatrix);
							this.table.render();
							this.table.modelMatrix = stackMatrix.pop();
							//Drawing Back
							stackMatrix.push(mat4.clone(this.back.modelMatrix));
							this.back.translate(0., 0.25, -0.25 + this.thikness / 2.);
							this.back.scale(0.5, 0.5, this.thikness * 0.5);
							mat4.multiply(this.back.modelMatrix, this.modelMatrix, this.back.modelMatrix);
							this.back.render();
							this.back.modelMatrix = stackMatrix.pop();
						};

ChairGL.prototype.setDrawingMode = function(mode) {
										this.table.setDrawingMode(mode);
										this.back.setDrawingMode(mode);
									};

ChairGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.table.setColor(r, g, b, a);
								this.back.setColor(r, g, b, a);
							};

ChairGL.prototype.setTexture = function(textureFile) {
								this.table.setTexture(textureFile);
								this.back.setTexture(textureFile);
							};

//-----------------------------
function livingRoomGL()
{
	// Model
	this.table = new TableGL();	// size: 1 x 1 x 1
	this.chair = new ChairGL();
	this.thikness = 0.1;

	ObjectGL.call(this);
}

livingRoomGL.prototype = Object.create(ObjectGL.prototype);

livingRoomGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing table
							stackMatrix.push(mat4.clone(this.table.modelMatrix));
							this.table.translate(0., -0.25, 0.);
							this.table.scale(0.8, 0.8, 0.8);
							mat4.multiply(this.table.modelMatrix, this.modelMatrix, this.table.modelMatrix);
							this.table.render();
							this.table.modelMatrix = stackMatrix.pop();

							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(0., -0.25, -0.5);
							this.chair.scale(1., 1., 1.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();

							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(0., -0.25, 0.5);
							this.chair.scale(-1., 1., -1.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();

							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(-0.5, -0.25, 0.0);
							this.chair.rotate(90, 0., 1., 0.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();

							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(0.5, -0.25, 0.0);
							this.chair.rotate(-90, 0., 1., 0.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();


						};

livingRoomGL.prototype.setDrawingMode = function(mode) {
										this.table.setDrawingMode(mode);
										this.chair.setDrawingMode(mode);
									};

livingRoomGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.table.setColor(r, g, b, a);
								this.chair.setColor(r, g, b, a);
							};

livingRoomGL.prototype.setTexture = function(textureFile) {
								this.table.setTexture(textureFile);
								this.chair.setTexture(textureFile);
							};

function bigLivingRoomGL(n)
{
	// Model
	this.table = new TableGL();	// size: 1 x 1 x 1
	this.chair = new ChairGL();
	this.n = n;
	this.tableLength = (n-2)/2;
	this.chairLength = .5;
	this.chairOffset = .2;
	ObjectGL.call(this);
}

bigLivingRoomGL.prototype = Object.create(ObjectGL.prototype);

bigLivingRoomGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing table
							stackMatrix.push(mat4.clone(this.table.modelMatrix));
							this.table.translate(0., -0.25, 0.);
							this.table.scale(this.tableLength, 1., 1.);
							mat4.multiply(this.table.modelMatrix, this.modelMatrix, this.table.modelMatrix);
							this.table.render();
							this.table.modelMatrix = stackMatrix.pop();

							var firstToBeDrawn = -.34 * (this.tableLength-1);

							for(var i = 0; i < (this.tableLength); i++){
								stackMatrix.push(mat4.clone(this.chair.modelMatrix));
								this.chair.translate(firstToBeDrawn, -0.25, -0.5);
								//this.chair.scale(1., 1., 1.);
								mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
								this.chair.render();
								this.chair.modelMatrix = stackMatrix.pop();

								stackMatrix.push(mat4.clone(this.chair.modelMatrix));
								this.chair.translate(firstToBeDrawn, -0.25, 0.5);
								this.chair.scale(-1., 1., -1.);
								mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
								this.chair.render();
								this.chair.modelMatrix = stackMatrix.pop();
								
								firstToBeDrawn = firstToBeDrawn + this.chairLength + this.chairOffset;
							}
							
							
							// Headboard chairs.
							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(-.5 * this.tableLength, -0.25, 0.0);
							this.chair.rotate(90, 0., 1., 0.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();

							stackMatrix.push(mat4.clone(this.chair.modelMatrix));
							this.chair.translate(.5 * this.tableLength, -0.25, 0.0);
							this.chair.rotate(-90, 0., 1., 0.);
							mat4.multiply(this.chair.modelMatrix, this.modelMatrix, this.chair.modelMatrix);
							this.chair.render();
							this.chair.modelMatrix = stackMatrix.pop();
						};

bigLivingRoomGL.prototype.setDrawingMode = function(mode) {
										this.table.setDrawingMode(mode);
										this.chair.setDrawingMode(mode);
									};

bigLivingRoomGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.table.setColor(r, g, b, a);
								this.chair.setColor(r, g, b, a);
							};

bigLivingRoomGL.prototype.setTexture = function(textureFile) {
								this.table.setTexture(textureFile);
								this.chair.setTexture(textureFile);
							};

/* next = Math.pow(2, Math.ceil(Math.log(8)/Math.log(2)))
next = Math.pow(2, Math.floor(Math.log(8)/Math.log(2)))
							 */


function salon(n)
{
	// Model
	this.n=n;
	this.dimention = Math.pow(2, Math.ceil(Math.log(this.n)/Math.log(2)));
	this.tzOffSet = 2.;
	this.txOffSet = 5.;
	this.bigLivingRoomGL = new bigLivingRoomGL(8);	// size: 1 x 1 x 1
	ObjectGL.call(this);
}

salon.prototype = Object.create(ObjectGL.prototype);

salon.prototype.render = function(){
	var stackMatrix=[];
	tz=0.;
	tx=0.;

	for(var i = 0; i < this.n; i++){
		stackMatrix.push(mat4.clone(this.bigLivingRoomGL.modelMatrix));
		this.bigLivingRoomGL.translate(tx, -0.25, tz);
		this.bigLivingRoomGL.scale(1, 1., 1.);
		mat4.multiply(this.bigLivingRoomGL.modelMatrix, this.modelMatrix, this.bigLivingRoomGL.modelMatrix);
		this.bigLivingRoomGL.render();
		this.bigLivingRoomGL.modelMatrix = stackMatrix.pop();
		next = Math.pow(2, Math.ceil(Math.log(i)/Math.log(2)));
		if(i<next){
			tz=0;
			tx = tx + this.txOffSet;
		} else if(i==next){
			tz = tz + this.tzOffSet;
		}
	}		

}

salon.prototype.setDrawingMode = function(mode) {
										this.bigLivingRoomGL.setDrawingMode(mode);
									};

salon.prototype.setColor = function(r, g, b, a) {
	if(a === undefined) {
		a = 1.;
	}
	this.bigLivingRoomGL.setColor(r, g, b, a);
};

salon.prototype.setTexture = function(textureFile) {
	this.bigLivingRoomGL.setTexture(textureFile);
};
