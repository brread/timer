let state = 'not initialized';
let sdate = new Date().getTime();
let timestamp;
let spacepressed;
let timep;
let menu;
let solvestatus = false;
const ttext = document.getElementById('timer')
const solves = document.getElementById('solves')

setInterval(function () {
    checks()
}, 1);

window.addEventListener('keydown', function (key) {
    if (key.code == "Space") {
        if (!spacepressed) {
            timep = 0;
            timep = new Date().getTime();
        }
        spacepressed = true;
        if (state == 'started') {
            state = 'finished';
            console.log('finished');
        } else if (state == 'not initialized') {
            state = 'starting';
        }
    }
})

window.addEventListener('keyup', function (key) {
    if (key.code == "Space") {
        if (state == 'ready') {
            state = 'started';
            timestamp = new Date().getTime();
        } else {
            spacepressed = false;
            state = 'not initialized';
        }
    }
})

function checks() {
    if (state == 'ready') {
        ttext.style.color = "limegreen";
    } else if (state == 'starting') {
        timer.style.color = "red";
        timestamp = new Date().getTime();
        timestamp = (((timestamp - timep)/1000).toFixed(2));
        if (timestamp >= 0.4) {
            state = 'ready';
        }
    } else if (state == 'started') {
        timep = new Date().getTime();
        ttext.style.color = 'black';
        ttext.innerText = ((timep - timestamp)/1000).toFixed(2);
    } else if (state == 'not initialized') {
        ttext.style.color = 'black';
    }
}

solves.addEventListener('click', function () {
    if (!solvestatus) {
        solvestatus = true;
        menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.width = "50vw";
        menu.style.height = "50vh";
        menu.style.backgroundColor = '#ffebc4';
        menu.style.border = "2px solid black";
        document.body.appendChild(menu);
    } else {
        solvestatus = false;
        document.body.removeChild(menu);
    }
})