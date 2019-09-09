function button_click() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var border = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
		[1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
		[1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
		[1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
		[1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, -1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];
	var width = myCanvas.width;
	var blockSize = width /border.length;
	var playerLocation = {x: 1, y: 1};
	document.addEventListener("keydown",keyDown);

	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	var totalSeconds = 0;
	setInterval(setTime, 1000);

	function setTime() {
  		++totalSeconds;
  		secondsLabel.innerHTML = totalSeconds % 60;
  		minutesLabel.innerHTML = parseInt(totalSeconds / 60);

  		var sec = "" + totalSeconds % 60;
  		if(sec.length < 2) {
  			secondsLabel.innerHTML = "0" + sec;
  		} else {
  			secondsLabel.innerHTML = sec;
  		}

  		var min = "" + parseInt(totalSeconds / 60);
  		if(min.length < 2) {
  			minutesLabel.innerHTML = "0" + min;
  		} else {
  			minutesLabel.innerHTML = min;
  		}
	}	

	function drawBorder(x, y) {
		ctx.beginPath();
		ctx.rect(x * blockSize, y * blockSize, blockSize, blockSize);
		ctx.fillStyle = "black";
		ctx.fill(); 
		ctx.closePath();
		ctx.stroke();
	}

	function drawEndzone() {
		ctx.beginPath();
		ctx.rect(blockSize * (border[0].length - 2), blockSize * (border[0].length - 2), blockSize, blockSize);
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.closePath();
	}
	function player() {
	  	ctx.beginPath();
		ctx.rect(playerLocation.x * blockSize, playerLocation.y * blockSize, blockSize, blockSize);
		ctx.fillStyle = "blue";
		ctx.fill(); 
		ctx.closePath();
	}
	function detectWall(x, y) {
		if(y > 0 && x > 0 && border[y][x] != 1) {
			return true;
		}
		return false;
	}
	console.log("Wall " + detectWall(playerLocation.x, playerLocation.y));

	function keyDown(event) {
		if(event.keyCode == "37" && detectWall(playerLocation.x - 1, playerLocation.y) == true && reachToEndzone(playerLocation.x, playerLocation.y) == true) {
			playerLocation.x--;
			draw();
		} else if(event.keyCode == "38" && detectWall(playerLocation.x, playerLocation.y - 1) == true && reachToEndzone(playerLocation.x, playerLocation.y) == true) {
			playerLocation.y--;
			draw();
		} else if(event.keyCode == "39" && detectWall(playerLocation.x + 1, playerLocation.y) == true && reachToEndzone(playerLocation.x, playerLocation.y) == true) {
			playerLocation.x++;
			draw();
		} else if(event.keyCode == "40" && detectWall(playerLocation.x, playerLocation.y + 1) == true && reachToEndzone(playerLocation.x, playerLocation.y) == true) {
			playerLocation.y++;
			draw();		
		} 
	console.log(event.keyCode);
	}

	function reachToEndzone(x, y) {
		if(border[y][x + 1] == -1) {
			alert('Goal!!!!!');
			return false;
		}
		return true;
	}
	console.log(reachToEndzone(playerLocation.x, playerLocation.y));

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
   		player();
   	}
	draw();
}



