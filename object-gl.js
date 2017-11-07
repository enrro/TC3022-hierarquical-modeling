function initTexture(texture, image)
{
	if(!texture)
	{
		console.log("Failed to create the texture object");
		return false;
	}
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);	// Flip the image's Y-axis
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	pauseRender = false;
}

function ObjectGL() {
	this.drawingMode = WIREFRAME;
	this.textureFile = "./default.jpg";
	this.pointSize = 3.;
	this.color = [1., 1., 1., 1.];			// RGBA
	this.modelMatrix = mat4.create();
	this.modelViewMatrix = mat4.create();
	this.setShader();
}

ObjectGL.prototype.setShader = function() {
								switch(this.drawingMode)
								{
									case SOLID:
									case WIREFRAME:
										// Setting vertices
										this.vertices = this.positions;
										// Setting shader program & locating shader's input variables
										this.shader = createShaderProgram(gl, "colorShader-vs", "colorShader-fs");
										gl.useProgram(this.shader);
										this.shader.uColor = gl.getUniformLocation(this.shader, "uColor");
										this.shader.uModelViewMatrix = gl.getUniformLocation(this.shader, "uModelViewMatrix");
										this.shader.uProjMatrix = gl.getUniformLocation(this.shader, "uProjMatrix");
										break;
									case VERTEX_COLOR:
										// Setting vertices
										this.vertices = [];
										var n = this.positions.length / 3;
										var j = 0, k = 0;
										for(var i = 0; i < n; i++)
										{
											this.vertices.push(this.positions[j]); 
											this.vertices.push(this.positions[j+1]); 
											this.vertices.push(this.positions[j+2]);
											this.vertices.push(this.vertexColor[k]);
											this.vertices.push(this.vertexColor[k+1]);
											this.vertices.push(this.vertexColor[k+2]); 
											this.vertices.push(this.vertexColor[k+3]); 
											j = j + 3;
											k = k + 4;
										}
										// Setting shader program & locating shader's input variables
										this.shader = createShaderProgram(gl, "vertexColorShader-vs", "vertexColorShader-fs");
										gl.useProgram(this.shader);
										this.shader.aPosition = gl.getAttribLocation(this.shader, "aPosition");
										this.shader.aColor = gl.getAttribLocation(this.shader, "aColor");
										this.shader.uModelViewMatrix = gl.getUniformLocation(this.shader, "uModelViewMatrix");
										this.shader.uProjMatrix = gl.getUniformLocation(this.shader, "uProjMatrix");
										break;
									case TEXTURE:
										// Setting vertices
										this.vertices = [];
										var n = this.positions.length / 3;
										var j = 0, k = 0;
										for(var i = 0; i < n; i++)
										{
											this.vertices.push(this.positions[j]); 
											this.vertices.push(this.positions[j+1]); 
											this.vertices.push(this.positions[j+2]);
											this.vertices.push(this.textureCoords[k]);
											this.vertices.push(this.textureCoords[k+1]);
											j = j + 3;
											k = k + 2;
										}
										// Setting shader program & locating shader's input variables
										this.shader = createShaderProgram(gl, "textureShader-vs", "textureShader-fs");
										gl.useProgram(this.shader);
										this.shader.aPosition = gl.getAttribLocation(this.shader, "aPosition");
										this.shader.aTextureCoords = gl.getAttribLocation(this.shader, "aTextureCoords");
										this.shader.uSampler = gl.getUniformLocation(this.shader, "uSampler");
										this.shader.uModelViewMatrix = gl.getUniformLocation(this.shader, "uModelViewMatrix");
										this.shader.uProjMatrix = gl.getUniformLocation(this.shader, "uProjMatrix");
										
										// Init texture
										var texture = gl.createTexture();
										this.texture = texture;
										var image = new Image();
										if(!image)
										{
											console.log("Filed to create the image object");
											return false;
										}
										// Register the event handler to be called on loading an image
										image.onload = function() {initTexture(texture, image);};

										// Tell the browser to load an image (asyncronousley)
										image.src = this.textureFile;
										pauseRender = true;
										break;
									case LIGTHING:
										// Setting vertices

										// Setting shader program & locating shader's input variables

										break;
									case POINTS:
										// Setting vertices
										this.vertices = this.positions;
										// Setting shader program & locating shader's input variables
										this.shader = createShaderProgram(gl, "colorShader-vs", "colorShader-fs");
										gl.useProgram(this.shader);
										this.shader.uPointSize = gl.getUniformLocation(this.shader, "uPointSize");
										this.shader.uColor = gl.getUniformLocation(this.shader, "uColor");
										this.shader.uModelViewMatrix = gl.getUniformLocation(this.shader, "uModelViewMatrix");
										this.shader.uProjMatrix = gl.getUniformLocation(this.shader, "uProjMatrix");
									 	break;
								}
								this.setBuffers();
							};

ObjectGL.prototype.setBuffers = function() {
									// Vertex Buffer Object
									this.vbo = gl.createBuffer();
									gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
									gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
									gl.bindBuffer(gl.ARRAY_BUFFER, null);
									// Index Buffer Object
									this.ibo = gl.createBuffer();
									gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
									gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
									gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
								};

ObjectGL.prototype.bindBuffersToShader = function() {
												switch(this.drawingMode)
												{
													case SOLID:
													case WIREFRAME:
														gl.useProgram(this.shader);
														gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
														gl.vertexAttribPointer(this.shader.aPosition, 3, gl.FLOAT, false, 0, 0);
														gl.enableVertexAttribArray(this.shader.aPosition);
														gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
														break;
													case VERTEX_COLOR:
														gl.useProgram(this.shader);
														gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
														gl.vertexAttribPointer(this.shader.aPosition, 3, gl.FLOAT, false, 28, 0);
														gl.enableVertexAttribArray(this.shader.aPosition);
														gl.vertexAttribPointer(this.shader.aColor, 4, gl.FLOAT, false, 28, 12);
														gl.enableVertexAttribArray(this.shader.aColor);
														gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
														break;
													case TEXTURE:
														gl.activeTexture(gl.TEXTURE0);
														gl.bindTexture(gl.TEXTURE_2D, this.texture);
														gl.useProgram(this.shader);
														gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
														gl.vertexAttribPointer(this.shader.aPosition, 3, gl.FLOAT, false, 20, 0);
														gl.enableVertexAttribArray(this.shader.aPosition);
														gl.vertexAttribPointer(this.shader.aTextureCoords, 2, gl.FLOAT, false, 20, 12);
														gl.enableVertexAttribArray(this.shader.aTextureCoords);
														gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
														break;
													case LIGTHING:

														break;
													case POINTS:
														gl.useProgram(this.shader);
														gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
														gl.vertexAttribPointer(this.shader.aPosition, 3, gl.FLOAT, false, 0, 0);
														gl.enableVertexAttribArray(this.shader.aPosition);
														break;
												}
											};

ObjectGL.prototype.loadUniformDataToShaders = function() {
												switch(this.drawingMode)
												{
													case SOLID:
													case WIREFRAME:
														gl.uniform4fv(this.shader.uColor, this.color);
													    gl.uniformMatrix4fv(this.shader.uModelViewMatrix, false, this.modelViewMatrix);
													    gl.uniformMatrix4fv(this.shader.uProjMatrix, false, projMatrix);
														break;
													case VERTEX_COLOR:
													    gl.uniformMatrix4fv(this.shader.uModelViewMatrix, false, this.modelViewMatrix);
													    gl.uniformMatrix4fv(this.shader.uProjMatrix, false, projMatrix);
														break;
													case TEXTURE:
													    gl.uniform1i(this.shader.uSampler, this.textureID);
														gl.uniformMatrix4fv(this.shader.uModelViewMatrix, false, this.modelViewMatrix);
													    gl.uniformMatrix4fv(this.shader.uProjMatrix, false, projMatrix);
														break;
													case LIGTHING:

														break;
													case POINTS:
														gl.uniform4fv(this.shader.uColor, this.color);
														gl.uniform1f(this.shader.uPointSize, this.pointSize);
													    gl.uniformMatrix4fv(this.shader.uModelViewMatrix, false, this.modelViewMatrix);
													    gl.uniformMatrix4fv(this.shader.uProjMatrix, false, projMatrix);
														break;
												}
											};

ObjectGL.prototype.render = function() {
								// Model-View  Matrix
							    mat4.multiply(this.modelViewMatrix, viewMatrix, this.modelMatrix);

							    // Buffers-Shader binding
							    this.bindBuffersToShader();

							    // Loading data to shaders
								this.loadUniformDataToShaders();				

								// Drawing
								switch(this.drawingMode)
								{
									case SOLID:
									case VERTEX_COLOR:
									case TEXTURE:
										gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
										break;
									case WIREFRAME:
										gl.drawElements(gl.LINE_LOOP, this.indices.length, gl.UNSIGNED_SHORT, 0);
										break;
									case POINTS:
										gl.drawArrays(gl.POINTS, 0, this.n);
								}		
								gl.bindBuffer(gl.ARRAY_BUFFER, null);
								gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
							};

ObjectGL.prototype.setColor = function(r, g, b, a) {
								if(a === undefined) {
									a = 1.;
								}
								this.color[0] = r;
								this.color[1] = g;
								this.color[2] = b;
								this.color[3] = a;
							};

ObjectGL.prototype.setDrawingMode = function(mode) {
										if(mode === undefined) {
											drawingMode = WIREFRAME;	
										}
										this.drawingMode = mode;
										this.setShader();
									};

ObjectGL.prototype.setTexture = function(textureFile) {
									if(textureFile === undefined) {
										textureFile = "./default.jpg";
									}
									this.textureFile = textureFile;
									this.setShader();
								};

ObjectGL.prototype.translate = function(tx, ty, tz) {
								if(tx === undefined) {
									tx = 0.;
								}
								if(ty === undefined) {
									ty = 0.;
								}
								if(tz === undefined) {
									tz = 0.;
								}
								mat4.translate(this.modelMatrix, this.modelMatrix, [tx, ty, tz]);
							};

ObjectGL.prototype.scale = function(sx, sy, sz) {
							if(sx === undefined) {
								sx = 1.;
							}
							if(sy === undefined) {
								sy = 1.;
							}
							if(sz === undefined) {
								sz = 1.;
							}
							if(Math.abs(sx) <= CERO)
							{
								sx = 1.;
							}
							if(Math.abs(sy) <= CERO)
							{
								sy = 1.;
							}
							if(Math.abs(sz) <= CERO)
							{
								sz = 1.;
							}
							if(arguments.length == 1)
							{
								sy = sx;
							}
							mat4.scale(this.modelMatrix, this.modelMatrix, [sx, sy, sz]);
						};

ObjectGL.prototype.rotate = function(angleInDegrees, rotUx, rotUy, rotUz) {
								if(angleInDegrees === undefined) {
									angleInDegrees = 0.;
								}
								if(rotUx === undefined) {
									rotUx = 0.;
								}
								if(rotUy === undefined) {
									rotUy = 0.;
								}
								if(rotUz === undefined) {
									rotUz = 1.;
								}
								var angleInRad = angleInDegrees * Math.PI / 180.;
								mat4.rotate(this.modelMatrix, this.modelMatrix, angleInRad, [rotUx, rotUy, rotUz]);
							};
							