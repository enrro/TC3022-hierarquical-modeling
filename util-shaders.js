function createShader(gl, type, src)
{
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost())
	{
		console.log("An error ocurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		shader = null;
	}
	return shader;
}

function createShaderProgram(gl, vertexShaderID, fragmentShaderID)
{
	var vertexShaderScript = document.getElementById(vertexShaderID);
	var fragmentShaderScript = document.getElementById(fragmentShaderID);
	if(vertexShaderScript.type != "x-shader/x-vertex")
	{
		console.log("An error ocuured loading a shader: unknown vertex shader type");
	} else if(fragmentShaderScript.type != "x-shader/x-fragment")
	{
		console.log("An error ocuured loading a shader: unknown fragment shader type");
	}
	else
	{
		var vertexShaderSrc = vertexShaderScript.text;
		var fragmentShaderSrc = fragmentShaderScript.text;
		var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
		var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

		var shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) && !gl.isContextLost())
		{
			console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
			return null;
		}
		return shaderProgram;
	}
}



