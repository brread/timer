let state = 'not initialized';
let sdate = new Date().getTime();
let timestamp;
let spacepressed;
let timep;
let settingsmenu;
let solvesmenu;
let cube;
let settingsstatus = false;
let solvesstatus = false;
const ttext = document.getElementById('timer');
const settings = document.getElementById('settings');
const solves = document.getElementById('solves');

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
    if (!solvesstatus && !settingsstatus) {
        if (state == 'ready') {
            ttext.style.color = "limegreen";
        } else if (state == 'starting') {
            ttext.style.color = "red";
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
}

settings.addEventListener('click', function () {
    if (!settingsstatus) {
        settingsstatus = true;
        settingsmenu = document.createElement('div');
        let bar = document.createElement('div');
        let choose = document.createElement('select');
        let op1 = document.createElement('option');
        op1.value = '1';
        op1.innerText = '3x3';
        choose.style.position = 'absolute';
        choose.style.fontSize = '16px';
        choose.style.cursor = 'pointer';
        choose.style.appearance = 'none';
        choose.style.left = '50%';
        choose.style.top = '50%';
        choose.style.transform = 'translate(-50%, -50%)'
        choose.style.width = "40px";
        choose.style.height = "20px";
        choose.appendChild(op1);
        bar.appendChild(choose);
        bar.style.width = '100%';
        bar.style.height = '10%';
        bar.style.margin = '0';
        bar.style.top = '0';
        bar.style.color = "#ffebc4";
        bar.style.borderBottom = "2px solid black";
        bar.style.position = "relative";
        settingsmenu.style.position = 'absolute';
        settingsmenu.style.width = "50vw";
        settingsmenu.style.height = "65vh";
        settingsmenu.style.backgroundColor = '#ffebc4';
        settingsmenu.style.border = "2px solid black";
        settingsmenu.style.top = "50%";
        settingsmenu.style.left = "50%";
        settingsmenu.style.transform = "translate(-50%, -50%)";
        settingsmenu.appendChild(bar);
        document.body.appendChild(settingsmenu);
    } else if (settingsstatus) {
        settingsstatus = false;
        document.body.removeChild(settingsmenu);
    }
})

solves.addEventListener('click', function () {
    if (!solvesstatus && !settingsstatus) {
        solvesstatus = true;
        solvesmenu = document.createElement('div');
        let bar = document.createElement('div');
        let choose = document.createElement('select');
        let op1 = document.createElement('option');
        let session = document.createElement('span');
        op1.value = '1';
        op1.innerText = '3x3';
        choose.style.position = 'absolute';
        choose.style.fontSize = '16px';
        choose.style.cursor = 'pointer';
        choose.style.appearance = 'none';
        choose.style.left = '50%';
        choose.style.top = '50%';
        choose.style.transform = 'translate(-50%, -50%)'
        choose.style.width = "40px";
        choose.style.height = "20px";
        choose.appendChild(op1);
        session.style.position = 'relative';
        session.style.fontSize = '16px';
        session.style.margin = 'auto';
        session.style.marginRight = "55%";
        session.innerText = "Session";
        session.style.color = "black";
        session.style.textAlign = 'right';
        session.style.display = 'block';
        bar.appendChild(session)
        bar.appendChild(choose);
        bar.style.width = '100%';
        bar.style.height = '10%';
        bar.style.margin = '0';
        bar.style.top = '0';
        bar.style.color = "#ffebc4";
        bar.style.borderBottom = "2px solid black";
        bar.style.position = "relative";
        solvesmenu.style.position = 'absolute';
        solvesmenu.style.width = "50vw";
        solvesmenu.style.height = "65vh";
        solvesmenu.style.backgroundColor = '#ffebc4';
        solvesmenu.style.border = "2px solid black";
        solvesmenu.style.top = "50%";
        solvesmenu.style.left = "50%";
        solvesmenu.style.transform = "translate(-50%, -50%)";
        solvesmenu.appendChild(bar);
        document.body.appendChild(solvesmenu);
    } else if (solvesstatus) {
        solvesstatus = false;
        document.body.removeChild(solvesmenu);
    }
})
