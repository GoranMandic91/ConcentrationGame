var Card_Picture = [
    'images/2c.gif',
    'images/2d.gif',
    'images/2h.gif',
    'images/2s.gif',
    'images/3c.gif',
    'images/3d.gif',
    'images/3h.gif',
    'images/3s.gif',
    'images/4c.gif',
    'images/4d.gif',
    'images/4h.gif',
    'images/4s.gif',
    'images/5c.gif',
    'images/5d.gif',
    'images/5h.gif',
    'images/5s.gif',
    'images/6c.gif',
    'images/6d.gif',
    'images/6h.gif',
    'images/6s.gif',
    'images/7c.gif',
    'images/7d.gif',
    'images/7h.gif',
    'images/7s.gif',
    'images/8c.gif',
    'images/8d.gif',
    'images/8h.gif',
    'images/8s.gif',
    'images/9c.gif',
    'images/9d.gif',
    'images/9h.gif',
    'images/9s.gif',
    'images/ac.gif',
    'images/ad.gif',
    'images/ah.gif',
    'images/as.gif',
    'images/j.gif',
    'images/jc.gif',
    'images/jd.gif',
    'images/jh.gif',
    'images/js.gif',
    'images/kc.gif',
    'images/kd.gif',
    'images/kh.gif',
    'images/ks.gif',
    'images/qc.gif',
    'images/qd.gif',
    'images/qh.gif',
    'images/qs.gif',
    'images/tc.gif',
    'images/td.gif',
    'images/th.gif',
    'images/ts.gif',
];
var Background = [
    'images/back.jpg',
    'images/img.jpg',
    'images/b.gif'
];
var Card = (function () {
    function Card(cardId, backImgId) {
        this.cardId = cardId;
        this.backImage = document.createElement("img");
        this.backImage.setAttribute("src", Background[backImageId]);
        this.backImage.style.height = "68px";
        this.backImage.style.width = "50px";
        this.frontImage = document.createElement("img");
        this.frontImage.setAttribute("src", Card_Picture[cardId + 1]);
        this.frontImage.style.height = "68px";
        this.frontImage.style.width = "50px";
    }
    return Card;
}());
;
var Cards = (function () {
    function Cards(num, backImgId) {
        this.cards = new Array();
        this.num = num;
        for (var i = 0; i < this.num / 2; i++) {
            this.cards[i] = new Card(i, backImgId);
            this.cards[i + this.num / 2] = new Card(i, backImgId);
        }
    }
    return Cards;
}());
var ConcentrationGame = (function () {
    function ConcentrationGame(gameLevel, playerName, backImgId) {
        this.gameLevel = gameLevel;
        this.playerName = playerName;
        this.backImgId = backImgId;
        this.table = new Cards(this.gameLevel, this.backImgId);
    }
    ConcentrationGame.prototype.showCards = function () {
        var numberOfRows = Math.sqrt(this.gameLevel);
        var tab = document.getElementById('table');
        if (tab.innerHTML !== '') {
            tab.innerHTML = "";
            numberOfClicks = 0;
        }
        for (var i = 0; i < numberOfRows; i++) {
            var row = tab.insertRow();
            for (var j = 0; j < numberOfRows; j++) {
                var n = i * numberOfRows + j;
                var backgroundImage = this.table.cards[n].backImage;
                var frontImage = this.table.cards[n].frontImage;
                var cell = row.insertCell(0);
                cell.setAttribute("id", "card" + n.toString());
                cell.setAttribute("onclick", "onClickCard(" + n + "," + this.table.cards[n].cardId + "," + this.gameLevel + ")");
                cell.appendChild(backgroundImage);
            }
        }
    };
    ConcentrationGame.prototype.mixCards = function () {
        for (var index = this.table.cards.length - 1; index > 0; index--) {
            var j = Math.floor(Math.random() * (index + 1));
            var tem = this.table.cards[index];
            this.table.cards[index] = this.table.cards[j];
            this.table.cards[j] = tem;
        }
        return this.table.cards;
    };
    return ConcentrationGame;
}());
var Highscore = (function () {
    function Highscore(level, name, score, time, numOfCliks) {
        this.level = level;
        this.name = name;
        this.score = score;
        this.time = time;
        this.numOfCliks = numOfCliks;
    }
    return Highscore;
}());
var audioNo, audioYes;
var audioOnStart, audioApplause;
var audioCardFlip;
var backImageId;
function startGame() {
    flag = false;
    if (mytime !== null) {
        clearInterval(mytime);
        numberOfClicks = 0;
        gameOver = 0;
        score = 0;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
        document.getElementById('highscore').innerHTML = "";
        document.getElementById('share').innerHTML = "";
    }
    var gameLevel = parseFloat(document.getElementById("level").value);
    backImageId = parseFloat(document.getElementById("back").value);
    var playerName = document.getElementById("player").value;
    if (playerName !== '') {
        document.getElementById("warning").removeAttribute("class");
        document.getElementById("warning").innerHTML = "";
        document.getElementById("name").innerHTML = "Player: " + playerName;
        var cg = new ConcentrationGame(gameLevel, playerName, backImageId);
        cg.mixCards();
        cg.showCards();
        display();
        audioOnStart.play();
    }
    else {
        document.getElementById("warning").innerHTML = "You must insert your name! ";
        document.getElementById("warning").setAttribute("class", "ui right pointing red basic label");
    }
}
window.onload = function () {
    //setSounds();
    audioOnStart = new Audio("sounds/CardsShuffling.mp3");
    audioNo = new Audio("sounds/No.wav");
    audioCardFlip = new Audio("sounds/CardFlip.mp3");
    audioYes = new Audio("sounds/Yes.mp3");
    audioApplause = new Audio("sounds/Applause.mp3");
};
var temp = null;
var tempCardId = null;
var numberOfClicks = 0;
var gameOver = 0;
var score = 0;
var flag = false;
function onClickCard(i, cardId, gameLevel) {
    var element = document.getElementById("card" + i);
    var element2;
    if (element.innerHTML !== '<div style="height:68px;width:50px;"></div>' && flag === false) {
        element.innerHTML = '<img src="' + Card_Picture[cardId + 1] + '" style="height:68px;width:50px;">';
        audioCardFlip.play();
        if (temp === null && tempCardId === null) {
            temp = i;
            tempCardId = cardId;
        }
        else if (tempCardId === cardId && temp !== i) {
            element2 = document.getElementById("card" + temp);
            setTimeout(function () {
                element.innerHTML = '<div style="height:68px;width:50px;"></div>';
                element2.innerHTML = '<div style="height:68px;width:50px;"></div>';
                audioYes.play();
                flag = false;
            }, 500);
            temp = null;
            tempCardId = null;
            score += 5;
            gameOver += 2;
            flag = true;
        }
        else if (tempCardId === cardId && temp == i) {
            numberOfClicks--;
        }
        else {
            element2 = document.getElementById("card" + temp);
            setTimeout(function () {
                element.innerHTML = '<img src="' + Background[backImageId] + '" style="height:68px;width:50px;">';
                element2.innerHTML = '<img src="' + Background[backImageId] + '" style="height:68px;width:50px;">';
                score -= 1;
                audioNo.play();
                flag = false;
            }, 500);
            temp = null;
            tempCardId = null;
            flag = true;
        }
        numberOfClicks++;
        document.getElementById('score').innerHTML = "Score: " + score;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
        if (gameOver === gameLevel) {
            audioApplause.play();
            setTimeout(function () {
                document.getElementById('table').innerHTML = "";
            }, 500);
            var name_1 = document.getElementById("player").value;
            var hs = new Highscore(gameLevel, name_1, score, str, numberOfClicks);
            addToHighscore(hs);
            printHighScoreTable(gameLevel.toString());
            gameOver = 0;
            numberOfClicks = 0;
            score = 0;
            clearInterval(mytime);
            flag = false;
        }
    }
}
var h = 0, m = 0, s = 0, mytime = 0;
var str;
function display() {
    h = m = s = 0;
    mytime = setInterval('displayTime()', 1000);
}
function displayTime() {
    if (s < 10) {
        var s1 = '0' + s;
    }
    else {
        var s1 = s.toString();
    }
    if (m < 10) {
        var m1 = '0' + m;
    }
    else {
        var m1 = m.toString();
    }
    if (h < 10) {
        var h1 = '0' + h;
    }
    else {
        var h1 = h.toString();
    }
    str = h1 + ':' + m1 + ':' + s1;
    document.getElementById('time').innerHTML = "Time: " + str;
    if (s < 59) {
        s = s + 1;
    }
    else {
        s = 0;
        m = m + 1;
        if (m == 60) {
            m = 0;
            h = h + 1;
        }
    }
}
function muteSounds() {
    audioOnStart.muted = true;
    audioNo.muted = true;
    audioCardFlip.muted = true;
    audioYes.muted = true;
    audioApplause.muted = true;
}
function unmuteSounds() {
    audioOnStart.muted = false;
    audioNo.muted = false;
    audioCardFlip.muted = false;
    audioYes.muted = false;
    audioApplause.muted = false;
}
function addToHighscore(hs) {
    var highscore = new Array();
    if (typeof (Storage) !== "undefined") {
        for (var i = 0; i < 10; i++) {
            highscore[i] = JSON.parse(localStorage.getItem(hs.level.toString() + i));
        }
        console.log(highscore);
        for (var i = 0; i < 10; i++) {
            if (highscore[i] !== null && hs.score >= highscore[i].score) {
                var temp_1 = highscore[i];
                var temp2 = void 0;
                highscore[i] = hs;
                for (var j = i + 1; j < 10; j++) {
                    temp2 = highscore[j];
                    highscore[j] = temp_1;
                    temp_1 = temp2;
                }
                break;
            }
            else if (highscore[i] === null) {
                highscore[i] = hs;
                break;
            }
        }
        console.log(highscore);
        for (var i = 0; i < 10; i++) {
            localStorage.setItem(hs.level.toString() + i, JSON.stringify(highscore[i]));
        }
    }
    else {
        document.getElementById("highscore").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
function printHighScoreTable(level) {
    var table = document.getElementById('highscore');
    var header = table.createTHead();
    var row = header.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.setAttribute("class", "center aligned");
    cell.innerHTML = "High score table";
    header = table.createTHead();
    row = header.insertRow(-1);
    row.setAttribute("class", "center aligned");
    cell = row.insertCell(-1);
    cell.innerHTML = "Player name";
    cell = row.insertCell(-1);
    cell.innerHTML = "Score";
    cell = row.insertCell(-1);
    cell.innerHTML = "Number of clicks";
    cell = row.insertCell(-1);
    cell.innerHTML = "Time";
    for (var i = 0; i < 10; i++) {
        var myObject = JSON.parse(localStorage.getItem(level + i));
        if (myObject !== null) {
            row = table.insertRow();
            row.setAttribute("class", "center aligned");
            cell = row.insertCell(-1);
            cell.innerHTML = myObject.name;
            cell = row.insertCell(-1);
            cell.innerHTML = myObject.score.toString();
            cell = row.insertCell(-1);
            cell.innerHTML = myObject.numOfCliks.toString();
            cell = row.insertCell(-1);
            cell.innerHTML = myObject.time;
        }
    }
    showShareButtons();
}
function showShareButtons() {
    var share = document.getElementById('share');
    var h2 = document.createElement('h2');
    h2.innerHTML = "Share your score on: ";
    share.appendChild(h2);
    var a = document.createElement('a');
    a.setAttribute("onclick", "openNewWindow('http://www.facebook.com/sharer.php?u=https://www.google.rs/#q=Concentration+Game&t=I%20just%20scored%20" + score + "%20points%20in%20Concentration%20game'); return false;");
    a.setAttribute("target", "_blank");
    var img = document.createElement('img');
    img.setAttribute("src", "images/facebook.png");
    a.appendChild(img);
    share.appendChild(a);
    a = document.createElement('a');
    a.setAttribute("onclick", "openNewWindow('https://twitter.com/share?text=I%20just%20scored%20" + score + "%20points%20in%20Concentration%20game&amp;hashtags=ConcentrationGame'); return false;");
    a.setAttribute("target", "_blank");
    img = document.createElement('img');
    img.setAttribute("src", "images/twitter.png");
    a.appendChild(img);
    share.appendChild(a);
    a = document.createElement('a');
    a.setAttribute("onclick", "openNewWindow('http://www.linkedin.com/shareArticle?mini=true&url=https://www.google.rs/&title=I%20just%20scored%20" + score + "%20points%20in%20Concentration%20game&summary=My%20favorite%20game&source=ConcentrationGame'); return false;");
    a.setAttribute("target", "_blank");
    img = document.createElement('img');
    img.setAttribute("src", "images/linkedin.png");
    a.appendChild(img);
    share.appendChild(a);
}
function openNewWindow(url) {
    var width = 600;
    var height = 400;
    var newWindow = window.open(url, name || 'window' + Math.floor(Math.random() * 10000 + 1), 'width=' + width + ', height=' + height);
    if (window.focus) {
        newWindow.focus();
    }
}
