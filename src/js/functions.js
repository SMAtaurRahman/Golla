function $(item) {
    if (!item) {
        return false;
    }

    if (item[0] === '#') {
        return document.getElementById(item.substr(1));
    } else if (item[0] === '.') {
        return document.getElementsByClassName(item.substr(1));
    } else if (item[0] === '_') {
        return document.getElementsByName(item.substr(1));
    } else {
        return document.getElementsByTagName(item);
    }
}

function randomItem(item) {
    if (item && item.length > 0) {
        return item[randomInt(0, item.length - 1)];
    }

    return false;
}

function foreach(array, callback) {
    if (array) {
        for (var key in array) {
            if (array.hasOwnProperty(key) === false) {
                continue;
            }
            var value = array[key];

            callback(key, value);
        }
    }

    return false;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}