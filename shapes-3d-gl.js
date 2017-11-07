function BoxGL()
{
	// Model
	this.positions = [ 0.5, 0.5, 0.5, 	// V0
					  -0.5, 0.5, 0.5,
					  -0.5, -0.5, 0.5,
					   0.5, -0.5, 0.5,
					   0.5, -0.5, -0.5,
					   0.5, 0.5, -0.5,
					  -0.5, 0.5, -0.5,
					  -0.5, -0.5, -0.5]; // v7
	this.n = 8;
	
	this.vertexColor = [1., 0., 0., 1., 	// V0
						0., 1., 0., 1.,
						0., 0., 1., 1.,
						1., 0., 1., 1.,
						0., 1., 1., 1.,
						1., 1., 0., 1.,
						1., 1., 1., 1.,
						0.5, 0.5, 0.5, 1.];	// V7

	this.textureCoords = [1., 1., 		// V0: s, t
						  0., 1.,
						  0., 0.,
						  1., -1.,
						  1., 0.,
						  1., 1.,
						  0., 1.,
						  0., 0.];

	this.indices = [1, 2, 3, 1, 3, 0,	// fronta face
					4, 7, 6, 4, 6, 5,	// back face
				    0, 3, 4, 0, 4, 5,	// righta face
					1, 6, 2, 2, 6, 7,	// left face
					0, 6, 1, 6, 0, 5,	// top face
					2, 7, 4, 2, 4, 3];	// bottom face

	// Superclass constructor
	ObjectGL.call(this);
}

BoxGL.prototype = Object.create(ObjectGL.prototype);

function SphereGL(radius, drawingMode, imageFile)
{
	// Model
	if(radius === undefined) {
		radius = 0.5;
	}
	this.radius = radius;
	var SPHERE_DIV = 12;
	var i, ai, si, ci;
	var j, aj, sj, cj;
	var p1, p2;
	var vertices = [];
	var textureCoords = [];
	var vertexColor = [];

	for (j = 0; j <= SPHERE_DIV; j++) {
		aj = j * Math.PI / SPHERE_DIV;
		sj = radius * Math.sin(aj);
		cj = radius * Math.cos(aj);
		for (i = 0; i <= SPHERE_DIV; i++) {
			ai = i * 2 * Math.PI / SPHERE_DIV;
			si = Math.sin(ai);
			ci = Math.cos(ai);

			vertices.push(si * sj);  // X
			vertices.push(cj);       // Y
			vertices.push(ci * sj);  // Z

			textureCoords.push(i / SPHERE_DIV);
			textureCoords.push(j / SPHERE_DIV);

			vertexColor.push(Math.random());	// R
			vertexColor.push(Math.random());	// G
			vertexColor.push(Math.random());	// B
			vertexColor.push(1.);			// A
		}
	}

	var indices = [];
	for (j = 0; j < SPHERE_DIV; j++) {
		for (i = 0; i < SPHERE_DIV; i++) {
			p1 = j * (SPHERE_DIV+1) + i;
			p2 = p1 + (SPHERE_DIV+1);

			indices.push(p1);
			indices.push(p2);
			indices.push(p1 + 1);

			indices.push(p1 + 1);
			indices.push(p2);
			indices.push(p2 + 1);
		}
	}

	this.positions = vertices;
	this.n = this.positions.length / 3;
	this.color = [1., 1., 1., 1.];		// R, G, B, A	
	this.vertexColor = vertexColor;
	this.textureCoords = textureCoords;		
	this.indices = indices;

	// Superclass constructor
	ObjectGL.call(this);
}

SphereGL.prototype = Object.create(ObjectGL.prototype);

function FloorGL()
{
	// Model

	var dim = 50;
    var lines = 50;
    var vertices = [];
    var indices = [];
   
    //Floor.dim = d;
    //Floor.lines = 2*Floor.dim/e;
    var inc = 2*dim/lines;
    var v = [];
    var i = [];

    for(var l=0;l<=lines;l++){
        v[6*l] = -dim; 
        v[6*l+1] = 0;
        v[6*l+2] = -dim+(l*inc);
                        
        v[6*l+3] = dim;
        v[6*l+4] = 0;
        v[6*l+5] = -dim+(l*inc);
                        
        v[6*(lines+1)+6*l] = -dim+(l*inc); 
        v[6*(lines+1)+6*l+1] = 0;
        v[6*(lines+1)+6*l+2] = -dim;
                        
        v[6*(lines+1)+6*l+3] = -dim+(l*inc);
        v[6*(lines+1)+6*l+4] = 0;
        v[6*(lines+1)+6*l+5] = dim;
                        
        i[2*l] = 2*l;
        i[2*l+1] = 2*l+1;
        i[2*(lines+1)+2*l] = 2*(lines+1)+2*l;
        i[2*(lines+1)+2*l+1] = 2*(lines+1)+2*l+1;        
    }
    this.positions = v;
    this.indices = i;
    this.n = this.positions.length / 3;
	this.vertexColor = [];	
	this.textureCoords = [];

	// Superclass constructor
	ObjectGL.call(this);
}

FloorGL.prototype = Object.create(ObjectGL.prototype);


