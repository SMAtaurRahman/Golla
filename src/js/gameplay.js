function boot() {

    CANVAS = new Canvas('canvas');
    PAINT = new Paint(CANVAS);

    FRAME = new Frame();
    GAME = new Game();
    SCORE = new Score();
    LIFE = new Life();
    CONTROL = new Control();
    GOLLAS = new GollaCollection(20, 15);

    // console.log(GOLLAS);

    GOLLAS.populate(GOLLAS.limit);

    if (!PLAYER) {
        errrrrrrrrror();
    }

    // Lets start the game
    GAME.running = true;
}


function play() {
    // Control Player
    drive();

    // Check Collision
    grasp();

    GOLLAS.foreach(function (key, value) {
        value.scatter();
    });

    management();

}


function drive() {

    if (CONTROL.left === true) {
        PLAYER.moveLeft();
    }
    if (CONTROL.right === true) {
        PLAYER.moveRight();
    }
    if (CONTROL.up === true) {
        PLAYER.moveUp();
    }
    if (CONTROL.down === true) {
        PLAYER.moveDown();
    }
}

function grasp() {

    GOLLAS.foreach(function (key, value) {
        if (!value.player && (value.x > PLAYER.x - (PLAYER.r * 2) || value.x < PLAYER.x + (PLAYER.r * 2)) && GOLLAS.isCollided(PLAYER, value)) {
            //console.log(key);

            // Score
            if (value.bomb) {
                //SCORE.current -= value.penalty;
                LIFE.span--;

                if (LIFE.span === 2) {
                    LIFE.color = LIFE.colors.medium;
                } else if (LIFE.span === 1) {
                    LIFE.color = LIFE.colors.bad;
                } else if (LIFE.span < 1) {
                    // Game Over
                    GAME.running = false;
                    restart();
                }

                PLAYER.getSkinny();
                PLAYER.exploding = 20;
            } else {

                PLAYER.getFat();
                //Lets keep it in check
                PLAYER.radiusCheck();

                SCORE.current++;

                if ((SCORE.current % 30) === 0) {
                    PLAYER.velocity++;
                }


            }

            value.relocate();
        }
    });
}

function management() {
    if (PLAYER.exploding > 0) {
        if (PLAYER.exploding % 2 === 0) {
            PLAYER.color = 'red';
        } else {
            PLAYER.color = 'green';
        }

        PLAYER.exploding--;
    }
}
