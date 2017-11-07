function TriangleGL()
{
	// Model
	this.positions = [0., 0.66667, 0., 		// V0: x, y, z
					 -0.5, -0.33333, 0., 	// v1
					  0.5, -0.33333, 0.]; 	// V2	
	this.n = 3;
	this.vertexColor = [1., 0., 0., 1.,	// V0: R, G, B, A
				   		0., 1., 0., 1.,	// V1
				   		0., 0., 1., 1.];	// V2
	this.textureCoords = [0., 0., 			// V0: s, t
						  1., 0., 
						  0.5, 1.];
	this.indices = [0, 1, 2];				// face

	// Superclass constructor
	ObjectGL.call(this);
}

TriangleGL.prototype = Object.create(ObjectGL.prototype);

function RectangleGL(drawingMode, imageFile)
{
	// Model
	this.positions = [-0.5, 0.5, 0., 		// V0: x, y, z
					  -0.5, -0.5, 0., 		// v1
					   0.5, -0.5, 0.,
					   0.5, 0.5, 0.]; 		// V2	
	this.n = 4;
	this.vertexColor = [1., 0., 0., 1.,		// V0: R, G, B, A
				   		0., 1., 0., 1.,		// V1
				   		0., 0., 1., 1.,
				   		1., 0., 1., 1.];	// V2
	this.textureCoords = [0., 1., 			// V0: s, t
						  0., 0., 	
						  1., 0.,
						  1., 1.];
	this.indices = [0, 1, 2, 0, 2, 3];		// faces

	// Superclass constructor
	ObjectGL.call(this);
}

RectangleGL.prototype = Object.create(ObjectGL.prototype);



