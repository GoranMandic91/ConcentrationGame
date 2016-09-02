 const Card_Picture = [
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
 const Background =[
     'images/back.jpg',
     'images/img.jpg',
     'images/b.gif'
 ];

class Card {
    cardId: number;
    backImage: HTMLImageElement;
    frontImage: HTMLImageElement;

    constructor(cardId: number) {
        this.cardId = cardId;
        this.backImage = document.createElement("img");
        this.backImage.setAttribute("src", Background[0]);
        this.backImage.style.height= "68px";
        this.backImage.style.width= "50px"; 
        this.frontImage = document.createElement("img");
        this.frontImage.setAttribute("src", Card_Picture[cardId+1]);
        this.frontImage.style.height= "68px";
        this.frontImage.style.width= "50px"; 
    }
   
};

class Cards {
    num: number;
    cards: Card[] = new Array();

    constructor(num: number) {
        this.num = num;
        for (let i = 0; i < this.num/2; i++){
            this.cards[i] = new Card(i);
            this.cards[i + this.num / 2] = new Card(i);
        }
    }
}

class ConcentrationGame {
    gameLevel: number;
    playerName: string;
    table: Cards;

    constructor(gameLevel: number, playerName: string) {
        this.gameLevel = gameLevel;
        this.playerName = playerName;
        this.table = new Cards(this.gameLevel);              
    }

    showCards() {
        var numberOfRows: number = Math.sqrt(this.gameLevel);
        var tab: HTMLTableElement = <HTMLTableElement>document.getElementById('table');
        if (tab.innerHTML !== '') {
            tab.innerHTML = "";
            numberOfClicks = 0;
        }
        for (let i = 0; i < numberOfRows; i++) {
            var row: HTMLTableRowElement = <HTMLTableRowElement>tab.insertRow();
            for (let j = 0; j < numberOfRows; j++) {
                var n: number = i * numberOfRows + j;
                var backgroundImage = this.table.cards[n].backImage;
                var frontImage = this.table.cards[n].frontImage;             
                var cell = row.insertCell(0);                
                cell.setAttribute("id", "card" + n.toString());
                cell.setAttribute("onclick", "onClickCard(" + n + "," + this.table.cards[n].cardId + ","+ this.gameLevel+")");
                cell.appendChild(backgroundImage);             
            }
        }
    }

    mixCards() {
        for (let index = this.table.cards.length - 1; index > 0; index--) {
            let j = Math.floor(Math.random() * (index + 1));
            let tem = this.table.cards[index];
            this.table.cards[index] = this.table.cards[j];
            this.table.cards[j] = tem;
        }
        return this.table.cards;
    }
}

class Highscore{
    
    constructor(public level: number, public name: string, public score:number, public time: string, public numOfCliks: number) {

    }
}

let audioNo: HTMLAudioElement, audioYes: HTMLAudioElement ;
let audioOnStart: HTMLAudioElement, audioApplause : HTMLAudioElement ;
let audioCardFlip: HTMLAudioElement ;

function startGame() {
    if (mytime !== null) {
        clearInterval(mytime);
        numberOfClicks = 0;
        gameOver=0;
        score=0;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
        document.getElementById('highscore').innerHTML = "";
    }
    let gameLevel = parseFloat((<HTMLInputElement>document.getElementById("level")).value);
    let playerName = (<HTMLInputElement>document.getElementById("player")).value;
    if(playerName!==''){
        document.getElementById("warning").removeAttribute("class");
        document.getElementById("warning").innerHTML="";
        document.getElementById("name").innerHTML = "Player: " + playerName;
        let cg = new ConcentrationGame(gameLevel, playerName);
        cg.mixCards();
        cg.showCards();
        display();
        audioOnStart.play();
    }else {
        document.getElementById("warning").innerHTML = "You must insert your name! ";
        document.getElementById("warning").setAttribute("class", "ui right pointing red basic label")
    }
}

window.onload = function() {
  //setSounds();
    audioOnStart = new Audio("sounds/CardsShuffling.mp3");
    audioNo = new Audio("sounds/No.wav");
    audioCardFlip = new Audio("sounds/CardFlip.mp3");
    audioYes = new Audio("sounds/Yes.mp3");
    audioApplause = new Audio("sounds/Applause.mp3");
};

var temp: number = null;
var tempCardId: number = null;
var numberOfClicks = 0;
var gameOver = 0;
let score=0;
function onClickCard(i: number, cardId: number, gameLevel: number ): any {
    var element = document.getElementById("card" + i);
    var element2: HTMLElement;

    if (element.innerHTML !== '<div style="height:68px;width:50px;"></div>') {
        element.innerHTML = '<img src="' + Card_Picture[cardId + 1] + '" style="height:68px;width:50px;">';
        audioCardFlip.play();
        if (temp === null && tempCardId === null) {
            temp = i;
            tempCardId = cardId;          
        } else if (tempCardId === cardId && temp !== i) {
            element2 = document.getElementById("card" + temp);
            setTimeout(function () {
                element.innerHTML = '<div style="height:68px;width:50px;"></div>';
                element2.innerHTML = '<div style="height:68px;width:50px;"></div>';
                audioYes.play();
            }, 450);
            temp = null;
            tempCardId = null;
            score+=5;
            gameOver += 2;            
        } else if (tempCardId === cardId && temp == i) {
            numberOfClicks--;
        } else {         
            element2 = document.getElementById("card" + temp); 
            setTimeout(function () {
                element.innerHTML = '<img src="' + Background[0] + '" style="height:68px;width:50px;">';
                element2.innerHTML = '<img src="' + Background[0] + '" style="height:68px;width:50px;">';                
                score-=1;
                audioNo.play();
            }, 450);
            temp = null;
            tempCardId = null;
        }
        numberOfClicks++;
        document.getElementById('score').innerHTML = "Score: " + score;
        document.getElementById('numberOfClicks').innerHTML = "Number of clicks: " + numberOfClicks;
        if (gameOver === gameLevel) {           
            audioApplause.play();
            setTimeout(function () {
                document.getElementById('table').innerHTML = "";
            }, 450);
            let name = (<HTMLInputElement>document.getElementById("player")).value;
            let hs = new Highscore(gameLevel, name, score, str, numberOfClicks);
            addToHighscore(hs);
            printHighScoreTable(gameLevel.toString());
            gameOver = 0;
            numberOfClicks = 0;
            score=0;
            clearInterval(mytime);
        }
    }
}

let h: number = 0,  m: number = 0, s: number = 0, mytime: number = 0 ;
let str: string;

function display() {
    h = m = s = 0;
    mytime = setInterval('displayTime()',1000);
}

function displayTime() {
    if (s < 10) {
        var s1 = '0' + s;
    } else {
        var s1 = s.toString();
    }
    if (m < 10) {
        var m1 = '0' + m;
    } else {
        var m1 = m.toString();
    }
    if (h < 10) {
        var h1 = '0' + h;
    } else {
        var h1 = h.toString();
    }
    str= h1 + ':' + m1 + ':' + s1;
    document.getElementById('time').innerHTML = "Time: " + str;
    if (s < 59) {
        s = s + 1;
    } else {
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

function unmuteSounds(){
        audioOnStart.muted = false;
        audioNo.muted = false;
        audioCardFlip.muted = false;
        audioYes.muted = false;
        audioApplause.muted = false;
}



function addToHighscore(hs: Highscore){
    let highscore: Highscore[] = new Array();
    if (typeof(Storage) !== "undefined") {
        for(let i=0; i<10; i++){
                highscore[i] = <Highscore>JSON.parse(localStorage.getItem(hs.level.toString()+i));
        }
        console.log(highscore);
        for(let i=0; i<10; i++){
                if(highscore[i] !== null && hs.score>= highscore[i].score){
                      let temp: Highscore =highscore[i];
                      let temp2:Highscore;
                      highscore[i]=hs;
                      for(let j=i+1;j<10;j++){
                        temp2 =highscore[j];
                        highscore[j]=temp;
                        temp=temp2;
                      }
                      break;  
                }else if(highscore[i] === null){
                    highscore[i]=hs;
                    break;
                }
        }
        console.log(highscore);
        for(let i=0; i<10; i++){
                localStorage.setItem(hs.level.toString()+i, JSON.stringify(highscore[i]));
        }
    } else {
        document.getElementById("highscore").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function printHighScoreTable(level:string){
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById('highscore');
    let header = table.createTHead();
    let row: HTMLTableRowElement = <HTMLTableRowElement>header.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.setAttribute("class", "center aligned");
    cell.innerHTML ="High score table"; 
    header = table.createTHead();
    row = <HTMLTableRowElement>header.insertRow(-1);
    row.setAttribute("class", "center aligned");
    cell = row.insertCell(-1);                
    cell.innerHTML ="Player name";
    cell = row.insertCell(-1);                
    cell.innerHTML="Score";
    cell = row.insertCell(-1);                
    cell.innerHTML="Number of clicks";
    cell = row.insertCell(-1);                
    cell.innerHTML="Time";
    for (let i = 0; i < 10; i++) {
            let myObject:Highscore = JSON.parse(localStorage.getItem(level+i));                           
            if(myObject!==null){
            row = <HTMLTableRowElement>table.insertRow();
            row.setAttribute("class", "center aligned");
            cell = row.insertCell(-1);                
            cell.innerHTML = myObject.name;
            cell = row.insertCell(-1);                
            cell.innerHTML=myObject.score.toString();
            cell = row.insertCell(-1);                
            cell.innerHTML=myObject.numOfCliks.toString();
            cell = row.insertCell(-1);                
            cell.innerHTML=myObject.time;
        }
    }
}