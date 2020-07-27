function Canvas(id) {
    this.instance = document.getElementById(id);
    this.context = this.instance.getContext('2d');

    this.width = this.instance.width;
    this.height = this.instance.height;

    this.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

function Paint(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.context;

    this.text = function (text, x, y, color, font, align = 'left') {
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.textAlign = align;
        this.context.fillText(text, x, y);
    }

    this.circle = function (x, y, r, color, start = 0, end = 2, fill = true) {
        this.context.beginPath();
        this.context.arc(x, y, r, start, end * Math.PI);
        this.context.closePath();
        if (fill) {
            this.context.fillStyle = color;
            this.context.fill();
        } else {
            this.context.strokeStyle = color;
            this.context.stroke();
    }
    }

    this.rectangle = function (x, y, w, h, color, fill = true) {
        this.context.beginPath();
        if (fill) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, w, h);
        } else {
            this.context.strokeStyle = color;
            this.context.strokeRect(x, y, w, h);
        }
        this.context.closePath();
    }
}

function Golla(x = 50, y = 50, r = 10, color = 'white', velocity = 1, direction = 'r', visibility = true) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
    this.direction = direction;
    this.visibility = visibility;
    this.player = false;
    this.bomb = false;

    this.scatter = function () {

        if (this.player) {
            return false;
        }

        var currentVelocity = (this.velocity + FRAME.delta);

        if (GAME.difficulty === 'easy') {
            /**
             * On easy Mode
             * Gollas will move horizontally
             */

            if (this.direction !== 'r' && this.direction !== 'l') {
                this.direction = randomItem(['l', 'r']);
            }

            if ((this.x + this.r) < CANVAS.width && (this.x - this.r) > 0) {
                if (this.direction === 'r') {
                    this.x += currentVelocity;
                } else if (this.direction === 'l') {
                    this.x -= currentVelocity;
                }
            } else if ((this.x + this.r) >= CANVAS.width) {
                this.direction = 'l';
                this.x -= currentVelocity;
            } else if ((this.x - this.r) <= 0) {
                this.direction = 'r';
                this.x += currentVelocity;
            }

        } else if (GAME.difficulty === 'hard') {
            /**
             * On hard Mode
             * Gollas will move zigzag-cross
             */

            if (this.direction === 'l' || this.direction === 'r') {
                this.direction = randomItem(['lt', 'ld', 'rt', 'rd']);
            }

            if (this.direction === 'lt') {
                // Left Top ^-_
                if (this.y - this.r - currentVelocity < 0) {
                    // Upper Bar
                    this.x -= currentVelocity;
                    this.y = this.r;
                    this.direction = 'ld';
                } else if (this.x - this.r - currentVelocity < 0) {
                    // Left Bar
                    this.x = this.r;
                    this.y -= currentVelocity;
                    this.direction = 'rt';
                } else {
                    this.x -= currentVelocity;
                    this.y -= currentVelocity;
                }
            } else if (this.direction === 'ld') {
                // Left Down
                if (this.x - this.r - currentVelocity < 0) {
                    // Left Bar
                    this.x = this.r;
                    this.y += currentVelocity;
                    this.direction = 'rd';
                } else if (this.y + this.r + currentVelocity > CANVAS.height) {
                    // Lower Bar
                    this.x -= currentVelocity;
                    this.y = CANVAS.height - this.r;
                    this.direction = 'lt';
                } else {
                    this.x -= currentVelocity;
                    this.y += currentVelocity;
                }
            } else if (this.direction === 'rt') {
                // Right Top _-^
                if (this.y - this.r - currentVelocity < 0) {
                    // Upper Bar
                    this.x += currentVelocity;
                    this.y = this.r;
                    this.direction = 'rd';
                } else if (this.x + this.r + currentVelocity > CANVAS.width) {
                    // Right Bar
                    this.x = CANVAS.width - this.r;
                    this.y -= currentVelocity;
                    this.direction = 'lt';
                } else {
                    this.x += currentVelocity;
                    this.y -= currentVelocity;
                }
            } else if (this.direction === 'rd') {
                // Right Down
                if (this.x + this.r + currentVelocity > CANVAS.width) {
                    // Right Bar
                    this.x = CANVAS.width - this.r;
                    this.y += currentVelocity;
                    this.direction = 'ld';
                } else if (this.y + this.r + currentVelocity > CANVAS.height) {
                    // Lower Bar
                    this.x += currentVelocity;
                    this.y = CANVAS.height - this.r;
                    this.direction = 'rt';
                } else {
                    this.x += currentVelocity;
                    this.y += currentVelocity;
                }
            }
        } else if (GAME.difficulty === 'extreme') {
            /**
             * On Extreme Mode
             * Gollas will move zigzag-cross
             * Over The boundary
             */
            var corner = 50;

            if (this.direction === 'l' || this.direction === 'r') {
                this.direction = randomItem(['lt', 'ld', 'rt', 'rd']);
            }



            if (this.direction === 'lt') {
                // Left Top ^-_
                if (this.y - this.r - currentVelocity < 0 && (this.x < corner || this.x > CANVAS.width - corner)) {
                    // Upper Bar
                    this.x -= currentVelocity;
                    this.y = this.r;
                    this.direction = 'ld';
                } else if (this.x - this.r - currentVelocity < 0 && (this.y < corner || this.y > CANVAS.height - corner)) {
                    // Left Bar
                    this.x = this.r;
                    this.y -= currentVelocity;
                    this.direction = 'rt';
                } else {
                    this.x -= currentVelocity;
                    this.y -= currentVelocity;
                }
            } else if (this.direction === 'ld') {
                // Left Down
                if (this.x - this.r - currentVelocity < 0 && (this.y < corner || this.y > CANVAS.height - corner)) {
                    // Left Bar
                    this.x = this.r;
                    this.y += currentVelocity;
                    this.direction = 'rd';
                } else if (this.y + this.r + currentVelocity > CANVAS.height && (this.x < corner || this.x > CANVAS.width - corner)) {
                    // Lower Bar
                    this.x -= currentVelocity;
                    this.y = CANVAS.height - this.r;
                    this.direction = 'lt';
                } else {
                    this.x -= currentVelocity;
                    this.y += currentVelocity;
                }
            } else if (this.direction === 'rt') {
                // Right Top _-^
                if (this.y - this.r - currentVelocity < 0 && (this.x < corner || this.x > CANVAS.width - corner)) {
                    // Upper Bar
                    this.x += currentVelocity;
                    this.y = this.r;
                    this.direction = 'rd';
                } else if (this.x + this.r + currentVelocity > CANVAS.width && (this.y < corner || this.y > CANVAS.height - corner)) {
                    // Right Bar
                    this.x = CANVAS.width - this.r;
                    this.y -= currentVelocity;
                    this.direction = 'lt';
                } else {
                    this.x += currentVelocity;
                    this.y -= currentVelocity;
                }
            } else if (this.direction === 'rd') {
                // Right Down
                if (this.x + this.r + currentVelocity > CANVAS.width && (this.y < corner || this.y > CANVAS.height - corner)) {
                    // Right Bar
                    this.x = CANVAS.width - this.r;
                    this.y += currentVelocity;
                    this.direction = 'ld';
                } else if (this.y + this.r + currentVelocity > CANVAS.height && (this.x < corner || this.x > CANVAS.width - corner)) {
                    // Lower Bar
                    this.x += currentVelocity;
                    this.y = CANVAS.height - this.r;
                    this.direction = 'rt';
                } else {
                    this.x += currentVelocity;
                    this.y += currentVelocity;
                }
            }

            if (this.y + this.r < 0) {
                // Upper Bar
                this.x = CANVAS.width - this.x;
                this.y = CANVAS.height - this.r;
            } else if (this.x + this.r < 0) {
                // Left Bar
                this.x = CANVAS.width - this.r;
                this.y = CANVAS.height - this.y;
            } else if (this.y - this.r > CANVAS.height) {
                // Lower Bar
                this.x = CANVAS.width - this.x;
                this.y = this.r;
            } else if (this.x - this.r > CANVAS.width) {
                // Right Bar
                this.x = this.r;
                this.y = CANVAS.height - this.y;
            }
        }

    }

    this.relocate = function () {
        var randLocation = GOLLAS.randomXY();
        this.x = randLocation.x;
        this.y = randLocation.y;
        this.color = GOLLAS.randomColor();

        if (this.color === GOLLAS.penaltyColor) {
            if (this.bomb === false) {
                this.penalty = 5;
                this.bomb = true;
                GOLLAS.bombs++;
            }
        } else {
            if (this.bomb === true) {
                this.reward = 1;
                this.bomb = false;
                GOLLAS.bombs--;
            }
        }

        if (this.velocity < 10) {
            this.velocity++;
        } else {
            this.velocity -= 5;
        }
}
}

function GollaCollection(limit, bombLimit, minBombLimit = 5) {
    this.gollas = [];
    this.originalRedius = 10;

    this.colors = ['white', 'blue', 'yellow', 'orange', 'grey', '#8B4513', '#8A2BE2', '	#8B008B', 'black'];
    this.rewardColors = ['white', 'blue', 'yellow', 'orange', 'grey', '#8B4513', '#8A2BE2', '#8B008B'];
    this.penaltyColor = 'black';

    this.limit = limit;
    this.bombs = 0;
    this.bombLimit = bombLimit;
    this.minBombLimit = minBombLimit;

    if (this.bombLimit > this.limit) {
        this.bombLimit = this.limit - 1;
    }
    if (this.minBombLimit > this.bombLimit) {
        this.minBombLimit = this.bombLimit - 1;
    }

    this.populate = function (amount) {
        this.gollas = [];
        var randColor;
        var randLocation;

        if (amount > this.limit) {
            amount = this.limit;
        }

        for (i = 0; i < amount; i++) {
            // First player
            if (i === 0) {
                this.gollas[i] = new Player(
                        randomInt(this.originalRedius, CANVAS.width - this.originalRedius),
                        randomInt(this.originalRedius, CANVAS.height - this.originalRedius),
                        this.originalRedius
                        );

                PLAYER = this.gollas[i];
                continue;
            }

            /**
             * Lets decide golla color
             * If there is enough bomb, ignore it
             */

            if (this.bombs < this.minBombLimit) {
                randColor = this.penaltyColor;
            } else if (this.bombs < this.bombLimit) {
                randColor = randomItem(this.colors);
            } else {
                randColor = randomItem(this.rewardColors);
            }

            // Random XY
            randLocation = this.randomXY();

            this.gollas[i] = new Golla(
                    randLocation.x,
                    randLocation.y,
                    this.originalRedius,
                    randColor
                    );

            // Bomb Check
            if (randColor === this.penaltyColor) {
                this.gollas[i].bomb = true;
                this.gollas[i].penalty = 5;
                this.bombs++;
            } else {
                this.gollas[i].reward = 1;
            }
        }
    }

    this.player = function () {
        return this.gollas[0];
    }

    this.foreach = function (callback) {
        foreach(this.gollas, callback);
    }

    this.isCollided = function (golla1, golla2) {
        return (this.distance(golla1, golla2) < (golla1.r + golla2.r))
    }

    this.distance = function (golla1, golla2) {
        var distanceX = golla1.x - golla2.x;
        var distanceY = golla1.y - golla2.y;
        return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    }

    this.randomX = function () {
        return randomInt(this.originalRedius, CANVAS.width - this.originalRedius);
    }

    this.randomY = function () {
        return randomInt(this.originalRedius, CANVAS.height - this.originalRedius);
    }

    this.randomXY = function () {
        var xy = {x: 0, y: 0}
        while (true) {
            xy.x = this.randomX();
            xy.y = this.randomY();

            if (this.distance(xy, PLAYER) > PLAYER.r + 50) {
                break;
            }
        }

        return xy;
    }

    this.randomColor = function () {
        var randColor;
        if (this.bombs < this.bombLimit) {
            randColor = randomItem(this.colors);
        } else if (this.bomb < 3) {
            randColor = 'black';
        } else {
            randColor = randomItem(this.rewardColors);
        }

        return randColor;
}
}

function Frame() {
    this.maxFPS = 50;
    this.lastFrame = 0;
    this.delta = 0;
    this.stdDuration = 1000 / this.maxFPS;
}

function Score() {
    this.current = 0;
    this.color = 'white';
    this.font = 'serif';
    this.size = '24px';
    this.x = 15;
    this.y = 35;
}

function Life() {
    this.span = 3;
    this.colors = {
        good: 'rgba(0, 255, 0, 0.35)',
        medium: 'rgba(255, 255, 0, 0.40)',
        bad: 'rgba(255, 0, 0, 0.40)',
    }
    this.color = this.colors.good;
}

function Game() {
    this.animationID;
    this.running = false;
    this.difficulty = SETTINGS.difficulty;
}

function Control() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    window.addEventListener('keydown', keyPressed, true);
    window.addEventListener('keyup', keyReleased, true);
}

function Player(x = 50, y = 50, r = 10, color = 'green', velocity = 3, direction = 'r', visibility = true) {

    Golla.call(this, x, y, r, color, velocity, direction, visibility);
    this.prototype = Object.create(Golla.prototype);
    this.prototype.constructor = this;

    // New Properties
    this.name = SETTINGS.playerName;
    this.growth = 1;

    // Fine Tune
    this.player = true;
    this.bomb = false;

    this.moveRight = function () {
        var stepLength = (this.velocity + FRAME.delta);

        if ((this.x + this.r + stepLength) > CANVAS.width) {
            this.x = CANVAS.width - this.r;
            return false;
        }

        this.x += stepLength;
    }

    this.moveLeft = function () {
        if ((this.x - (this.r + this.velocity)) < 0) {
            this.x = this.r;
            return false;
        }

        this.x -= this.velocity + FRAME.delta;
    }

    this.moveUp = function () {
        if ((this.y - this.r) - this.velocity < 0) {
            this.y = this.r;
            return false;
        }

        this.y -= this.velocity + FRAME.delta;
    }

    this.moveDown = function () {
        var stepLength = (this.velocity + FRAME.delta);

        if ((this.y + this.r + stepLength) > CANVAS.height) {
            this.y = CANVAS.height - this.r;
            return false;
        }

        this.y += stepLength;
    }

    this.getFat = function () {
        if (PLAYER.r >= 50) {
            return false;
        }
        this.r += this.growth;
    }

    this.getSkinny = function () {
        if (PLAYER.r <= 10) {
            return false;
        }
        this.r -= this.growth;
    }

    this.radiusCheck = function () {
        if (this.x - this.r < 0) {
            this.x = this.r;
        }
        if (this.y - this.r < 0) {
            this.y = this.r;
        }
        if (this.x + this.r > CANVAS.width) {
            this.x = CANVAS.width - this.r;
        }
        if (this.y + this.r > CANVAS.height) {
            this.y = CANVAS.height - this.r;
        }
}

}