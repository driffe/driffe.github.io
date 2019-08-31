window.addEventListener("keyup", ev => {
  if (ev.keyCode === 80) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	c.addEventListener('mousemove', mouseMoved);
	window.requestAnimationFrame(draw);


	var border = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
		[1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
		[1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
		[1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
		[1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];
	var width = myCanvas.width;
	var blockSize = width /border.length;
	var playerLocation = {x: 0, y: 0};

	playerLocation.x

	var me = new player(blockSize + 15, blockSize + 15, "blue", blockSize - 5, blockSize - 5);

	function mouseMoved(event) {
		me.setLocation(event.clientX - 20, event.clientY - 140);
	}

	function drawBorder(x, y) {
		ctx.beginPath();
		ctx.rect(x * blockSize, y * blockSize, blockSize, blockSize);
		ctx.fillStyle = "black";
		ctx.fill(); 
		ctx.closePath();
	}

	function drawEndzone() {
		ctx.beginPath();
		ctx.rect( blockSize * (border[0].length - 2), blockSize * (border[0].length - 2), blockSize, blockSize);
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.closePath();
	}
	function player(x, y, color, width, height) {
	   this.x = x;
	   this.y = y;
	   this.color = color;
	   this.width = width;
	   this.height = height;

	   this.setLocation = function(x, y) {
	      this.x = x;
	      this.y = y;
	   }

	   this.draw = function() {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.rect(this.x, this.y, this.width, this.height);
	      ctx.fill();
	      ctx.closePath();
	   }
	}

	// function detectWall(me) {
	// 	for(var y = 0; y < border.length; y++) {
	// 		for(var x = 0; x < border[y].length: x++) {
	// 			if(border[y][x] == 1) {
	// 				if(me.x > )
	// 			}
	// 		}
	// 	}
	// }
	console.log(border.length);
	function draw() {
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
		for(var y = 0; y < border.length; y++) {
			for(var x = 0; x < border[y].length; x++) {
				if(border[y][x] == 1) {
					drawBorder(x, y);
				} else if(border[y][x] == -1) {
					drawEndzone();
				}
			}
		}
		// if(detectWall(x, y) == true) {
		// 	console.log("True");
		// }
		// if(detectWall(x, y) == false) {
		// 	console.log("True");
		// }
		me.draw();
		window.requestAnimationFrame(draw);
	}
	draw();

  }
});

