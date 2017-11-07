function initEventHandlers()
{
	var dragging = false;	// Dragging or not
	var lastX = -1;			// last position of the mouse
	var lastY = -1;	

	canvas.onmousedown = function(event)	{
							var x = event.clientX;
							var y = event.clientY;
							// Start dragging if a mouse is in <canvas>
							var rect = event.target.getBoundingClientRect();
							if(rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom)
							{
								lastX = x;
								lastY = y;
								dragging = true;
							}
						};

	canvas.onmouseup = function(event) {
							dragging = false;	// mouse is released
						};

	canvas.onmousemove = function(event) {
							var x = event.clientX;
							var y = event.clientY;
							if(dragging)
							{
								var factor = 10 / canvas.height; // The rotation ratio
								var dx = factor * (x - lastX);
								var dy = factor * (y - lastY);
								// Limit x-axis rotation angle to [-90, 90] degrees
								currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.), -90.);
								currentAngle[1] = currentAngle[1] + dx;
							}
							lastX = x;
							lastY = y;
						};
}