function animate(timestamp) {

    if (GAME.running === false) {
        cancelAnimationFrame(GAME.animationID);
        return false;
    }

    // get the delta time since last frame
    if (FRAME.lastFrame === 0) {
        FRAME.lastFrame = timestamp - 1;
    }
    FRAME.delta = (timestamp - FRAME.lastFrame) / FRAME.stdDuration;

    if (FRAME.delta > 0) {
        // To do
        // Clear this logic
    } else if (FRAME.delta > 10) {
        // Don't know if it helps
        FRAME.delta = 10;
    } else {
        FRAME.delta = 0;
    }
    // console.log(frameDelta);

    // Throttle the frame rate.    
    if (timestamp < (FRAME.lastFrame + FRAME.stdDuration)) {
        GAME.animationID = requestAnimationFrame(animate);
        return false;
    }
    FRAME.lastFrame = timestamp;

    // Operation Clean Slate
    CANVAS.clear();

    // Render Gollas
    GOLLAS.foreach(function (key, value) {

        PAINT.circle(value.x, value.y, value.r, value.color);

        if (value.bomb) {
            PAINT.circle(value.x, value.y, value.r, '#B22222', 0, 2, false);
        }
    });

    // Render Score
    PAINT.text(SCORE.current, SCORE.x, SCORE.y, SCORE.color, 'bold ' + SCORE.size + ' ' + SCORE.font);

    // Render LifeSpan
    if (LIFE.span > 0) {
        PAINT.rectangle(CANVAS.width - 160, (SCORE.y - 20), 132, 20, LIFE.color, false);
        PAINT.rectangle(CANVAS.width - 160 + 3, (SCORE.y - 20), 40, 20, LIFE.color);
    }
    if (LIFE.span > 1) {
        PAINT.rectangle(CANVAS.width - 120 + 6, (SCORE.y - 20), 40, 20, LIFE.color);
    }
    if (LIFE.span > 2) {
        PAINT.rectangle(CANVAS.width - 80 + 9, (SCORE.y - 20), 40, 20, LIFE.color);
    }

    // We will Do calculation Now
    play();

    GAME.animationID = requestAnimationFrame(animate);
}