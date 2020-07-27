function keyPressed(evt) {

    switch (evt.keyCode) {
        // Left arrow.
        case 37:
            CONTROL.left = true;
            break;

            // Right arrow.
        case 39:
            CONTROL.right = true;
            break;

            // Down arrow
        case 40:
            CONTROL.down = true;
            break;

            // Up arrow 
        case 38:
            CONTROL.up = true;
            break;

            // Enter arrow 
            // case 13:
            // restart();
            // break;
    }
}

function keyReleased(evt) {

    switch (evt.keyCode) {
        // Left arrow.
        case 37:
            CONTROL.left = false;
            break;

            // Right arrow.
        case 39:
            CONTROL.right = false;
            break;

            // Down arrow
        case 40:
            CONTROL.down = false;
            break;

            // Up arrow 
        case 38:
            CONTROL.up = false;
            break;
    }
}