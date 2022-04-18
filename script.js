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
let cubesize = 3;
const ttext = document.getElementById('timer');
const settings = document.getElementById('settings');
const solves = document.getElementById('solves');



function scramble() {
    let Http = new XMLHttpRequest();
    let url = 'http://scrambler-api.herokuapp.com/3x3x3';
    Http.open('GET', url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
        console.log(JSON.stringify(Http.responseText[0]));
    }
}

scramble();

setInterval(function () {
    checks()
}, 1);

function load() {
    if (localStorage.v) {
        v = localStorage.v;
    } else {
        localStorage.v = 1;
    }
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
            minutes = Math.floor((((timep - timestamp)/1000).toFixed(2)) / 60);
            if (minutes > 0) {
                let dcsns = (((timep - timestamp)/1000).toFixed(2)) - Math.floor(((timep - timestamp)/1000).toFixed(2));
                timerdisplay += dcsns.toFixed(2).toString().replace('0.', '.');
                ttext.innerText = timerdisplay;
            }
            times[v].times[Object.keys(times[v].times).length + 1] = ttext.innerText;
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
            timerdisplay = '';
            seconds = ((timep - timestamp)/1000).toFixed(2);
            minutes = Math.floor(seconds / 60);
            hours = Math.floor(seconds / 3600);
            seconds = seconds % 60;
            if (hours > 0) {timerdisplay += hours + ':';}
            if (minutes > 0) {minutes %= 60; if (hours > 0) {minutes = String(minutes).padStart(2, "0");} timerdisplay += minutes + ':'; seconds = Math.floor(seconds); seconds = String(seconds).padStart(2, "0");} else {seconds = seconds.toFixed(2);}
            timerdisplay += seconds;
            ttext.innerText = timerdisplay;
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
        tr.style.backgroundColor = "#ffebc4";
        tr.innerText = times[v].times[Object.keys(times[v].times)[i]];
        tlist.prepend(tr);
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
        textmenu = document.createElement('div');
        let bar = document.createElement('div');
        tlist = document.createElement('table');
        tlist.id = "tlist";
        tlist.style.backgroundColor = "#ffebc4";
        let nobr = document.createElement('nobr');
        let span = document.createElement('span');
        let choose = document.createElement('select');
        choose.onchange = (e) => {
            v = e.target.value;
            localStorage.v = v;
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
        span.innerText = "Session"
        nobr.style.position = 'absolute';
        choose.style.fontSize = '16px';
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
        choose.selectedIndex = v - 1;
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
        bar.style.border = "2px solid black";
        bar.style.position = "relative";
        solvesmenu.style.position = 'absolute';
        textmenu.style.width = '100%';
        textmenu.style.height = '100%';
        textmenu.position = 'relative';
        textmenu.style.overflowY = 'scroll';
        solvesmenu.style.width = "50vw";
        solvesmenu.style.height = "65vh";
        solvesmenu.style.backgroundColor = '#ffebc4';
        textmenu.style.backgroundColor = '#ffebc4';
        textmenu.style.borderLeft = "2px solid black";
        textmenu.style.borderRight = "2px solid black";
        textmenu.style.borderBottom = "2px solid black";
        solvesmenu.style.top = "50%";
        solvesmenu.style.left = "50%";
        solvesmenu.style.transform = "translate(-50%, -50%)";
        solvesmenu.appendChild(bar);
        textmenu.appendChild(tlist);
        solvesmenu.appendChild(textmenu);
        document.body.appendChild(solvesmenu);
        loadtimes();
    } else if (solvesstatus) {
        solvesstatus = false;
        document.body.removeChild(solvesmenu);
    }
})
