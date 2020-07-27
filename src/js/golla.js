// Global Variables
var CANVAS = new Canvas('canvas');
var PAINT = new Paint(CANVAS);

// Default Settings
var SETTINGS = {
    playerName: 'Player',
    difficulty: 'easy'
}

var FRAME = new Frame();
var GAME = new Game();
var SCORE = new Score();
var LIFE = new Life();
var CONTROL = new Control();
var GOLLAS = new GollaCollection(20, 15);

var PLAYER;

function start() {
    boot();

    GAME.animationID = requestAnimationFrame(animate);
}

function restart() {
    cancelAnimationFrame(GAME.animationID);

    var notice = function (remaining) {
        CANVAS.clear();

        PAINT.text('SCORE : ' + SCORE.current, CANVAS.width / 2, (CANVAS.height / 2 - (50 + 60)), 'red', 'bold 52px Calibri', 'center');
        PAINT.text('Game will start again in', CANVAS.width / 2, (CANVAS.height / 2 - 50), 'grey', 'bold 24px Calibri', 'center');
        PAINT.text(remaining, CANVAS.width / 2, CANVAS.height / 2, 'white', 'bold 48px Calibri', 'center');
    }

    notice(3);

    setTimeout(function () {
        notice(2);
    }, 1000);

    setTimeout(function () {
        notice(1);
    }, 2000);

    setTimeout(function () {
        CANVAS.clear();
        start();
    }, 3000);
}


// We will do some dirty work here for the time being, who knows

$('#easyBtn').addEventListener("click", function (event) {
    event.preventDefault();
    cancelAnimationFrame(GAME.animationID);

    SETTINGS.difficulty = 'easy';

    start();

    $('#easyBtn').classList.add('btn-success');
    $('#hardBtn').classList.remove('btn-success');
    $('#hardBtn').classList.add('btn-default');
    $('#extremeBtn').classList.remove('btn-success');
    $('#extremeBtn').classList.add('btn-default');
});

$('#hardBtn').addEventListener("click", function (event) {
    event.preventDefault();
    cancelAnimationFrame(GAME.animationID);

    SETTINGS.difficulty = 'hard';

    start();

    $('#hardBtn').classList.add('btn-success');
    $('#easyBtn').classList.remove('btn-success');
    $('#easyBtn').classList.add('btn-default');
    $('#extremeBtn').classList.remove('btn-success');
    $('#extremeBtn').classList.add('btn-default');
});

$('#extremeBtn').addEventListener("click", function (event) {
    event.preventDefault();
    cancelAnimationFrame(GAME.animationID);

    SETTINGS.difficulty = 'extreme';

    start();

    $('#extremeBtn').classList.add('btn-success');
    $('#easyBtn').classList.remove('btn-success');
    $('#easyBtn').classList.add('btn-default');
    $('#hardBtn').classList.remove('btn-success');
    $('#hardBtn').classList.add('btn-default');
});

$('#playerNameForm').addEventListener("submit", function (event) {
    event.preventDefault();
    var playerName = $('_playerName')[0].value;

    //console.log(playerName);

    PLAYER.name = playerName;
});
