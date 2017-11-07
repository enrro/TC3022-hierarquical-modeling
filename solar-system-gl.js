function AstroGL(radius)
{
	// Model
	if(radius === undefined){
		radius = 0.5;
	}
	this.radius =radius;
	this.tethaIni;
	this.tetha = 0.;
	this.deltaTetha = 10. * Math.PI / 180.;
	this.astro = new SphereGL(radius);
	this.satellite = [];

	ObjectGL.call(this);
}

AstroGL.prototype = Object.create(ObjectGL.prototype);

AstroGL.prototype.add = function(satellite) {
							this.satellite.push(satellite);
						};

AstroGL.prototype.render = function() {
							var stackMatrix = [];
							// Drawing the Astro
							stackMatrix.push(mat4.clone(this.astro.modelMatrix));
							mat4.multiply(this.astro.modelMatrix, this.modelMatrix, this.astro.modelMatrix);
							this.tethaIni = 360. / this.satellite.length;
							this.tetha = this.tetha + this.deltaTetha;
							this.astro.rotate(this.tetha, 0., 1., 0.);	
							this.astro.render();
							this.astro.modelMatrix = stackMatrix.pop();
							// Drawing satellites
							for(var i = 0; i < this.satellite.length; i++)
							{
								stackMatrix.push(mat4.clone(this.satellite[i].modelMatrix));
								this.satellite[i].rotate(this.tethaIni * i + this.tetha, 0., 1., 0.);
								this.satellite[i].translate(2. * this.radius, 0., 0.);
								mat4.multiply(this.satellite[i].modelMatrix, this.modelMatrix, this.satellite[i].modelMatrix);	
								this.satellite[i].render();
								this.satellite[i].modelMatrix = stackMatrix.pop();
							}
						};

AstroGL.prototype.setDrawingMode = function(mode) {
										this.astro.setDrawingMode(mode);
										for(var i = 0; i < this.satellite.length; i++)
										{
											this.satellite[i].setDrawingMode(mode);
										}
									};

function SolarSystemGL(sunRadius)
{
	// Model
	if(sunRadius === undefined){
		sunRadius = 0.5;
	}
	this.sunRadius =sunRadius;
	var moon = new AstroGL(0.11 * sunRadius);
	var fobos = new AstroGL(0.07 * sunRadius);
	var deimos = new AstroGL(0.07 * sunRadius);
	// The Earth
	var earth = new AstroGL(0.33 * sunRadius);
	earth.add(moon);
	// Mars
	var mars = new AstroGL(0.17 * sunRadius);
	mars.add(fobos);
	mars.add(deimos);
	// The Sun
	this.sun = new AstroGL(sunRadius);
	this.sun.add(earth);
	this.sun.add(mars);
	ObjectGL.call(this);
}

SolarSystemGL.prototype = Object.create(ObjectGL.prototype);

AstroGL.prototype.add = function(satellite) {
							this.satellite.push(satellite);
						};

SolarSystemGL.prototype.render = function() {
							this.sun.render();
						};

SolarSystemGL.prototype.setDrawingMode = function(mode) {
										this.sun.setDrawingMode(mode);
									};

SolarSystemGL.prototype.setColor = function(r, g, b, a) {
										if(a === undefined) {
											a = 1.;
										}
										this.sun.setColor(r, g, b, a);
									};

SolarSystemGL.prototype.setTexture = function(textureFile) {
										this.sun.setTexture(textureFile);
									};








