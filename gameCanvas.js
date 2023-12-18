function generateMaze(rows, cols) {
	const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
  
	function isValid(row, col) {
	  return row >= 0 && row < rows && col >= 0 && col < cols;
	}
  
	function recursiveBacktrack(row, col) {
	  const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];
	  directions.sort(() => Math.random() - 0.5);
  
	  for (const [dr, dc] of directions) {
		const newRow = row + dr;
		const newCol = col + dc;
  
		if (isValid(newRow, newCol) && maze[newRow][newCol] === 1) {
		  maze[newRow][newCol] = 0;
		  maze[row + dr / 2][col + dc / 2] = 0;
		  recursiveBacktrack(newRow, newCol);
		}
	  }
	}
  
	// Set the maze walls
	for (let i = 0; i < rows; i += 2) {
	  for (let j = 0; j < cols; j += 2) {
		maze[i][j] = 1;
	  }
	}
  
	// Set the maze paths
	for (let i = 1; i < rows; i += 2) {
	  for (let j = 1; j < cols; j += 2) {
		maze[i][j] = 0;
	  }
	}
  
	// Start generating paths from the top-left corner
	recursiveBacktrack(0, 0);
  
	// Set the goal as -1
	maze[rows - 1][cols - 1] = -1;
  
	return maze;
  }
  
  function button_click() {
	const rows = document.getElementById("row").value;
	const cols = document.getElementById("column").value;
	console.log(rows, cols);
	const maze = generateMaze(rows, cols);
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	for(var i = 0; i < maze[i].length; i++) {
		for(var z = 0; z < maze.length; z++) {
		  console.log(maze[z][i]);
		}
	}
	var border = maze;
  
	var width = myCanvas.width;
	var blockSize = width / border.length;
	var playerLocation = { x: 1, y: 1 };
	document.addEventListener("keydown", keyDown);
  
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	var totalSeconds = 0;
	setInterval(setTime, 1000);
  
	function setTime() {
	  ++totalSeconds;
	  secondsLabel.innerHTML = totalSeconds % 60;
	  minutesLabel.innerHTML = parseInt(totalSeconds / 60);
  
	  var sec = "" + (totalSeconds % 60);
	  if (sec.length < 2) {
		secondsLabel.innerHTML = "0" + sec;
	  } else {
		secondsLabel.innerHTML = sec;
	  }
  
	  var min = "" + parseInt(totalSeconds / 60);
	  if (min.length < 2) {
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
	  ctx.rect(
		blockSize * (border[0].length - 2),
		blockSize * (border[0].length - 2),
		blockSize,
		blockSize
	  );
	  ctx.fillStyle = "yellow";
	  ctx.fill();
	  ctx.closePath();
	}
	function player() {
	  ctx.beginPath();
	  ctx.rect(
		playerLocation.x * blockSize,
		playerLocation.y * blockSize,
		blockSize,
		blockSize
	  );
	  ctx.fillStyle = "blue";
	  ctx.fill();
	  ctx.closePath();
	}
	function detectWall(x, y) {
	  if (y > 0 && x > 0 && border[y][x] != 1) {
		return true;
	  }
	  return false;
	}
	console.log("Wall " + detectWall(playerLocation.x, playerLocation.y));
  
	function keyDown(event) {
	  if (
		event.keyCode == "37" &&
		detectWall(playerLocation.x - 1, playerLocation.y) == true &&
		reachToEndzone(playerLocation.x, playerLocation.y) == true
	  ) {
		playerLocation.x--;
		draw();
	  } else if (
		event.keyCode == "38" &&
		detectWall(playerLocation.x, playerLocation.y - 1) == true &&
		reachToEndzone(playerLocation.x, playerLocation.y) == true
	  ) {
		playerLocation.y--;
		draw();
	  } else if (
		event.keyCode == "39" &&
		detectWall(playerLocation.x + 1, playerLocation.y) == true &&
		reachToEndzone(playerLocation.x, playerLocation.y) == true
	  ) {
		playerLocation.x++;
		draw();
	  } else if (
		event.keyCode == "40" &&
		detectWall(playerLocation.x, playerLocation.y + 1) == true &&
		reachToEndzone(playerLocation.x, playerLocation.y) == true
	  ) {
		playerLocation.y++;
		draw();
	  }
	  console.log(event.keyCode);
	}
  
	function reachToEndzone(x, y) {
	  if (border[y][x + 1] == -1) {
		alert("Goal!!!!!");
		return false;
	  }
	  return true;
	}
	console.log(reachToEndzone(playerLocation.x, playerLocation.y));
  
	function draw() {
	  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	  for (var y = 0; y < border.length; y++) {
		for (var x = 0; x < border[y].length; x++) {
		  if (border[y][x] == 1) {
			drawBorder(x, y);
		  } else if (border[y][x] == -1) {
			drawEndzone();
		  }
		}
	  }
	  player();
	}
	draw();
  }
  