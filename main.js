// global variables
var canvas;
var gl;
var viewMatrix;
var projMatrix;
var scene;
var pauseRender = false;
var eye = [0., 0., 2.];
var target = [0., 0., 0.];
var up = [0., 1., 0.];
var currentAngle = [0., 0.];	// Current rotation angle ([x-axis, y-axis] degrees)

const CERO = 1.e-5;	// 0.00001

// Model Types
const SCENE_2D = 0;	// 2D-Model
const SCENE_3D = 1;	// 3D-Model

// Drawing modes
const SOLID = 2;
const VERTEX_COLOR = 3;
const TEXTURE = 4;
const LIGTHING = 5;
const WIREFRAME = 6;
const POINTS = 7;

function Scene(type)
{
	if(type === undefined) {
		type = SCENE_3D;
	}
	this.type = type;
	this.listObj = [];
}

Scene.prototype.add = function(obj) {
							this.listObj.push(obj);
						};

Scene.prototype.render = function() {
							for(var i = 0; i < this.listObj.length; i++)
							{
								this.listObj[i].render();
							}
						};

function initScene()
{
	//var obj1 = new bigLivingRoomGL(4);
	var obj1 = new salon(4);
	obj1.setTexture("jupiter.jpg");
	obj1.setDrawingMode(TEXTURE);
	scene = new Scene();
	scene.add(obj1);
}

function initRender()
{
	if(scene.type == SCENE_3D)
	{
		gl.enable(gl.DEPTH_TEST);
	}
    // View Transformation
    viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix, eye, target, up);
    // Projection Transformation (perspective)
    projMatrix = mat4.create();		// Mproj = I
    mat4.perspective(projMatrix, 60. * Math.PI / 180., canvas.width / canvas.height, 0.1, 1000.);

    // Viewport Transformation
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0., 0., 0., 1.);
}

function update()
{
	mat4.lookAt(viewMatrix, eye, target, up);
	mat4.rotate(viewMatrix, viewMatrix, currentAngle[0], [1., 0., 0.]);
	mat4.rotate(viewMatrix, viewMatrix, currentAngle[1], [0., 1., 0.]);
}

function renderScene()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	if(scene.type == SCENE_3D)
	{
		gl.clear(gl.DEPTH_BUFFER_BIT);
	}
    scene.render();
    update();
}

function renderLoop()
{
	requestAnimationFrame(renderLoop);
	if(!pauseRender)
	{
		renderScene();
	}
}

function registeringEventHandlers()
{
	initEventHandlers();
}

function main()
{
	canvas = document.getElementById("canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	initScene();
	initRender();
	registeringEventHandlers();
	renderLoop();
}