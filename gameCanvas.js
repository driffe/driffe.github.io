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
  
    maze[0][0] = 0;
    recursiveBacktrack(0, 0);

    maze[rows - 1][cols - 2] = -1;
    return maze;
}

function button_click() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var width = c.width;
	var maze = generateMaze(10,10)
    var blockSize = width / (maze.length); // Adjust the blockSize calculation
    console.log(blockSize);
    var playerLocation = { x: 1, y: 0 };

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
            blockSize * (maze[0].length - 2),
            blockSize * (maze.length - 2),
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
        if (y >= 0 && x >= 0 && maze[y][x] != 1) {
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
        if (maze[playerLocation.y][playerLocation.x] == -1) {
            alert("Goal!!!!!");
            return false;
        }
        return true;
    }
    console.log(reachToEndzone(playerLocation.x, playerLocation.y));

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (var y = 0; y < maze.length; y++) {
            for (var x = 0; x < maze[y].length; x++) {
                if (maze[y][x] == 1) {
                    drawBorder(x, y);
                } else if (maze[y][x] == -1) {
                    drawEndzone();
                }
            }
        }
        player();
    }

    draw();
}
