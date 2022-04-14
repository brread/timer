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
let session = 1;
let times = {};
let v = 1;
let tlist;
const ttext = document.getElementById('timer');
const settings = document.getElementById('settings');
const solves = document.getElementById('solves');

setInterval(function () {
    checks()
}, 1);

function load() {
    if (localStorage.times) {
        times = JSON.parse(localStorage.times);
    } else {
        times = {
            1: {
                times: {

                }, scrambles: {

                }
            },
            2: {
                times: {

                }, scrambles: {
                    
                }
            },
            3: {
                times: {

                }, scrambles: {
                    
                }
            },
            4: {
                times: {

                }, scrambles: {
                    
                }
            },
            5: {
                times: {

                }, scrambles: {
                    
                }
            }
        }
        localStorage.times = JSON.stringify(times);
    }
}

load();

window.addEventListener('keydown', function (key) {
    if (key.code == "Space") {
        if (!spacepressed) {
            timep = 0;
            timep = new Date().getTime();
        }
        spacepressed = true;
        if (state == 'started') {
            state = 'finished';
            times[v].times[Object.keys(times[v].times).length + 1] = Number(ttext.innerText);
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
    localStorage.times = JSON.stringify(times);
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

function loadtimes() {
    while (tlist.lastElementChild) {
        tlist.removeChild(tlist.lastElementChild);
    }
    for (let i = 0; i < Object.keys(times[v].times).length; i++) {
        let tr = document.createElement("tr");
        tr.style.color = 'black';
        tr.style.fontSize = '16px';
        tr.style.fontWeight = 'bold';
        tr.innerText = times[v].times[Object.keys(times[v].times)[i]];
        tlist.appendChild(tr);
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
        tlist = document.createElement('table');
        tlist.id = "tlist";
        let nobr = document.createElement('nobr');
        let span = document.createElement('span');
        let choose = document.createElement('select');
        choose.onchange = (e) => {
            v = e.target.value;
            loadtimes();
        }
        choose.id = 'choose';
        let op1 = document.createElement('option');
        op1.value = '1';
        op1.innerText = '1';
        let op2 = document.createElement('option');
        op2.value = '2';
        op2.innerText = '2';
        let op3 = document.createElement('option');
        op3.value = '3';
        op3.innerText = '3';
        let op4 = document.createElement('option');
        op4.value = '4';
        op4.innerText = '4';
        let op5 = document.createElement('option');
        op5.value = '5';
        op5.innerText = '5';
        choose.selectedIndex = v - 1;
        span.innerText = "Session"
        nobr.style.position = 'absolute';
        choose.style.font   Size = '16px';
        choose.style.cursor = 'pointer';
        choose.style.appearance = 'none';
        nobr.style.left = '50%';
        nobr.style.top = '50%';
        nobr.style.transform = 'translate(-50%, -50%)'
        choose.style.width = "40px";
        choose.style.height = "20px";
        choose.appendChild(op1);
        choose.appendChild(op2);
        choose.appendChild(op3);
        choose.appendChild(op4);
        choose.appendChild(op5);
        nobr.appendChild(span);
        nobr.appendChild(choose);
        bar.appendChild(nobr);
        span.style.color = 'black';
        span.style.fontSize = "16px";
        span.style.marginRight = '7px';
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
        solvesmenu.appendChild(tlist);
        document.body.appendChild(solvesmenu);
        v = Number(document.getElementById('choose').value);
        loadtimes();
    } else if (solvesstatus) {
        solvesstatus = false;
        document.body.removeChild(solvesmenu);
    }
})
