var Card_Picture = [
    'images/img.jpg',
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
var Card = (function () {
    function Card(cardId) {
        this.cardId = cardId;
        this.backImage = document.createElement("img");
        this.backImage.setAttribute("src", Card_Picture[0]);
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
    function Cards(num) {
        this.cards = new Array();
        this.num = num;
        for (var i = 0; i < this.num / 2; i++) {
            this.cards[i] = new Card(i);
            this.cards[i + this.num / 2] = new Card(i);
        }
    }
    return Cards;
}());
var ConcentrationGame = (function () {
    function ConcentrationGame(gameLevel, playerName) {
        this.gameLevel = gameLevel;
        this.playerName = playerName;
        this.table = new Cards(this.gameLevel);
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
var audioNo, audioYes;
var audioOnStart, audioApplause;
var audioCardFlip;
function startGame() {
    if (mytime !== null) {
        clearInterval(mytime);
        numberOfClicks = 0;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
    }
    var gameLevel = parseFloat(document.getElementById("level").value);
    var playerName = document.getElementById("player").value;
    if (playerName !== '') {
        document.getElementById("warning").removeAttribute("class");
        document.getElementById("warning").innerHTML = "";
        document.getElementById("name").innerHTML = "Player: " + playerName;
        var cg = new ConcentrationGame(gameLevel, playerName);
        cg.mixCards();
        cg.showCards();
        display();
        setSounds();
        audioOnStart.play();
    }
    else {
        document.getElementById("warning").innerHTML = "You must insert your name! ";
        document.getElementById("warning").setAttribute("class", "ui right pointing red basic label");
    }
}
var temp = null;
var tempCardId = null;
var numberOfClicks = 0;
var gameOver = 0;
function onClickCard(i, cardId, gameLevel) {
    var element = document.getElementById("card" + i);
    var element2;
    if (element.innerHTML !== '<div style="height:68px;width:50px;"></div>') {
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
            }, 450);
            temp = null;
            tempCardId = null;
            gameOver += 2;
        }
        else if (tempCardId === cardId && temp == i) {
            numberOfClicks--;
        }
        else {
            element2 = document.getElementById("card" + temp);
            setTimeout(function () {
                element.innerHTML = '<img src="' + Card_Picture[0] + '" style="height:68px;width:50px;">';
                element2.innerHTML = '<img src="' + Card_Picture[0] + '" style="height:68px;width:50px;">';
                audioNo.play();
            }, 450);
            temp = null;
            tempCardId = null;
        }
        numberOfClicks++;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
        if (gameOver === gameLevel) {
            audioApplause.play();
            document.getElementById('table').innerHTML = "";
            gameOver = 0;
            numberOfClicks = 0;
            clearInterval(mytime);
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
function setSounds() {
    audioOnStart = new Audio("sounds/CardsShuffling.mp3");
    audioNo = new Audio("sounds/No.wav");
    audioCardFlip = new Audio("sounds/CardFlip.mp3");
    audioYes = new Audio("sounds/Yes.mp3");
    audioApplause = new Audio("sounds/Applause.mp3");
}
