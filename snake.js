window.onload = () => {
    canv = document.getElementById("snakegrid");
    ctx = canv.getContext("2d");
    spawnSnake();
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1500 / 15);

}


// change tileCount when changing canvas width and height
// devide gridSize by canvas width to know widthTileCount
// devide gridSize by canvas height to know heightTileCount
const gridSize = 20;
const widthTileCount = 60;
const heightTileCount = 40;
var horizontalApple = -1;
var verticalApple = -1;



game = () => {

    // Front position adjustment base on direction.
    horizontalPosition += horizontalVelocity;
    verticalPosition += verticalVelocity;

    // Wall death
    if (horizontalPosition < 0 || verticalPosition < 0 || horizontalPosition > widthTileCount - 1 || verticalPosition > heightTileCount - 1) {

        // Reset to start position after colition
        snakeDeath();

    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x == horizontalPosition && trail[i].y == verticalPosition) {
            if (horizontalVelocity == 0 && verticalVelocity == 0) {
                if (horizontalApple == -1 && verticalApple == -1) {
                    spawnApple();
                } else {
                    return null;
                }
            } else {
                snakeDeath();
            }
        }
    }

    trail.push({
        x: horizontalPosition,
        y: verticalPosition
    });

    while (trail.length > tail) {
        trail.shift();
    }

    if (horizontalApple == horizontalPosition && verticalApple == verticalPosition) {
        tail++;
        spawnApple();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(horizontalApple * gridSize, verticalApple * gridSize, gridSize - 2, gridSize - 2);
    

}

// Start position & head position tracker
snakeDeath = () => {

    horizontalPosition = widthTileCount / 2;
    verticalPosition = heightTileCount / 2;
    horizontalVelocity = verticalVelocity = 0;
    trail = new Array;
    tail = 5;
    var horizontalApple = -1;
    var verticalApple = -1;
    spawnApple();

};

spawnSnake = () => {

    horizontalPosition = widthTileCount / 2;
    verticalPosition = heightTileCount / 2;
    horizontalVelocity = verticalVelocity = 0;
    trail = new Array;
    tail = 5;

};

spawnApple = () => {

    horizontalApple = Math.floor(Math.random() * widthTileCount);
    verticalApple = Math.floor(Math.random() * heightTileCount);
    trail.map((pos) => {
        if (pos.x == horizontalApple && pos.y == verticalApple) {
            return spawnApple();
        }
    })

};

// Key presses
keyPush = (evt) => {

    switch (evt.keyCode) {
        case 37:
            if (horizontalVelocity !== 1) {
                horizontalVelocity = -1;
                verticalVelocity = 0;
                break;
            }
            break;
        case 38:
            if (verticalVelocity !== 1) {
                horizontalVelocity = 0;
                verticalVelocity = -1;
                break;
            }
            break;
        case 39:
            if (horizontalVelocity !== -1) {
                horizontalVelocity = 1;
                verticalVelocity = 0;
                break;
            }
            break;
        case 40:
            if (verticalVelocity !== -1) {
                horizontalVelocity = 0;
                verticalVelocity = 1;
                break;
            }
            break;
    }
}