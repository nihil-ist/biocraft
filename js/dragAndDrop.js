

let elements = ["assets/mobs/0.png","assets/mobs/1.png","assets/mobs/2.png","assets/mobs/3.png",
                "assets/mobs/4.png","assets/mobs/5.png","assets/mobs/6.png","assets/mobs/7.png",
                "assets/mobs/8.png","assets/mobs/9.png"]; //all the images of the mobs
let biomes = ["assets/biomes/b0.png","assets/biomes/b1.png","assets/biomes/b2.png","assets/biomes/b3.png",
              "assets/biomes/b4.png","assets/biomes/b5.png","assets/biomes/b6.png","assets/biomes/b7.png",
              "assets/biomes/b8.png","assets/biomes/b9.png"];

let names =["Bat","Bee","Blaze","Enderman","Ghast","Panda","Squid","Snowman","Mooshroom","Villager"];

var indexes = [];
var score = 0;
var progress = 0;
var images=[];
var x;
var y;
var soltar,lienzo,soltar1,lienzo1,soltar2,lienzo2;
var band = false;

var timer;
var seconds=0;

function startGame(){
    clearInterval(timer);//the timer will stop

    seconds = 0;
    indexes = [];
    score = 0;
    progress = 0;
    band = false;
    images = document.querySelectorAll('#imagesDrop > img');
    for (var i = 0; i<images.length;i++){
        images[i].addEventListener('dragstart', arrastrado,false);
        images[i].addEventListener('dragend',finalizado,false);
    }
    soltar = document.getElementById('canvas0');
    soltar.width = soltar.width * 1.2;
    soltar.height = soltar.height * 1.2;
    lienzo = soltar.getContext('2d');
    soltar.addEventListener('drop',soltado,false);
    soltar.addEventListener('dragenter',eventoEnter,false);
    soltar.addEventListener('dragover',eventoOver,false);

    soltar1 = document.getElementById('canvas1');
    soltar1.width = soltar1.width * 1.2;
    soltar1.height = soltar1.height * 1.2;
    lienzo1 = soltar1.getContext('2d');
    soltar1.addEventListener('drop',soltado1,false);
    soltar1.addEventListener('dragenter',eventoEnter,false);
    soltar1.addEventListener('dragover',eventoOver,false);

    soltar2 = document.getElementById('canvas2');
    soltar2.width = soltar2.width * 1.2;
    soltar2.height = soltar2.height * 1.2;
    lienzo2 = soltar2.getContext('2d');
    soltar2.addEventListener('drop',soltado2,false);
    soltar2.addEventListener('dragenter',eventoEnter,false);
    soltar2.addEventListener('dragover',eventoOver,false);

    selectImages();

    startTimer();
}

function startTimer(){
    timer = setInterval(advance,1000);
}

function advance(){
    if(progress==6){
        clearInterval(timer);//the timer will stop
    }
    seconds++;
    let minutes=Math.floor(seconds / 60);
    let seconds1 = seconds%60;
    let minuteFormat = minutes < 10 ? "0" + minutes : minutes;
    let secondFormat = seconds1 < 10 ? "0" + seconds1 : seconds1;

    document.getElementById("timeT").innerHTML = minuteFormat +':' +secondFormat;
}


function eventoEnter(e){
    e.preventDefault();
}
console.log("JAJAJA");
function eventoOver(e){
    e.preventDefault();
}

function finalizado(e){
    elemento = e.target;
}

function arrastrado(e){
    elemento = e.target;
    e.dataTransfer.setData('Text',elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target,0,0);
    
    x = elemento.style.left;
    y = elemento.style.top;
}

function soltado(e){
    //document.getElementById("uno").innerHTML = "entro soltado";
    console.log("entro soltado");
    //e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);

    var nImg = id.charAt(id.length - 1);
    var cI = elemento.src.slice(-5);  
    var cC = soltar.style.backgroundImage;
    console.log(cI+'  '+cC);
    if (cC.includes(cI)) {
        elemento.style.visibility = 'hidden';
        let audio = new Audio('assets/audio/mobs/'+nImg+'/c.ogg'); //the image is on its place
        let name = new Audio('assets/audio/names/'+nImg+'.mp3');
        soltar.style.backgroundImage = 'url("assets/bgmodel/c'+nImg+'.png")'; //soltar1.style.backgroundImage = 'url("'+assets/tal/tal+'")';
        document.getElementById("pc0").innerHTML = names[nImg];
        score++;
        progress++;
        audio.play();
        setTimeout(function(){
            name.play();
        },1000);
        //acomodar el nombre del mob debajo del canvas
        //se debe de escuchar el nombre el mob
    } else {//the image returns to the same place
        let audio = new Audio('assets/audio/mobs/'+nImg+'/w.ogg'); //the image its not in its place
        elemento.style.left = 0;
        elemento.style.top = 0;
        score--;
        if(score<0){
            score = 0;
        }
        elemento.style.visibility = 'visible'; //this is because the image doesnt have to disappear
        audio.play();
    }
    if(progress==3 && !band){
        band = true;
        setTimeout(() => {
            selectImages();
            for (var i = 0; i<images.length;i++){
                images[i].style.visibility = 'visible';
            }
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000);
    }
    if(progress>=6){
        band = false;
        indexes = [];
        setTimeout(() => {
            winScreen();
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000);
    }
    document.getElementById("scoreT").innerHTML = score;
    document.getElementById("progreso").innerHTML = "Aciertos:" +progress;
}

function soltado1(e){
    //document.getElementById("dos").innerHTML = "entro soltado1";
    console.log("entro soltado1");
    //e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);

    var nImg = id.charAt(id.length - 1);
    var cI = elemento.src.slice(-5);  
    var cC = soltar1.style.backgroundImage;
    console.log(cI+'  '+cC);
    if (cC.includes(cI)) {
        elemento.style.visibility = 'hidden';
        let audio = new Audio('assets/audio/mobs/'+nImg+'/c.ogg'); //the image is on its plac
        let name = new Audio('assets/audio/names/'+nImg+'.mp3');
        soltar1.style.backgroundImage = 'url("assets/bgmodel/c'+nImg+'.png")'; //soltar1.style.backgroundImage = 'url("'+assets/tal/tal+'")';
        document.getElementById("pc1").innerHTML = names[nImg];
        score++;
        progress++;
        audio.play();
        setTimeout(function(){
            name.play();
        },1000);
        //acomodar el nombre del mob debajo del canvas
        //se debe de escuchar el nombre el mob
    } else {//the image returns to the same place
        let audio = new Audio('assets/audio/mobs/'+nImg+'/w.ogg'); //the image its not in its place
        elemento.style.left = x;
        elemento.style.top = y;
        score--;
        if(score<0){
            score = 0;
        }
        elemento.style.visibility = 'visible'; //this is because the image doesnt have to disappear
        audio.play();
    }
    if(progress==3 && !band){
        band = true;

        setTimeout(() => {
            selectImages();
            for (var i = 0; i<images.length;i++){
                images[i].style.visibility = 'visible';
            }
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000);
        
    }
    if(progress>=6){
        band = false;
        indexes = [];
        setTimeout(() => {
            winScreen();
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000); 
    }
    document.getElementById("scoreT").innerHTML = score;
    document.getElementById("progreso").innerHTML = "Aciertos:" +progress;
}

function soltado2(e){
    //document.getElementById("tres").innerHTML = "entro soltado2";
    console.log("entro soltado2");
    //e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);

    var nImg = id.charAt(id.length - 1);
    var cI = elemento.src.slice(-5);  
    var cC = soltar2.style.backgroundImage;
    console.log(cI+'  '+cC);
    if (cC.includes(cI)) {
        elemento.style.visibility = 'hidden';
        let audio = new Audio('assets/audio/mobs/'+nImg+'/c.ogg'); //the image is on its place
        let name = new Audio('assets/audio/names/'+nImg+'.mp3');
        soltar2.style.backgroundImage = 'url("assets/bgmodel/c'+nImg+'.png")'; //soltar1.style.backgroundImage = 'url("'+assets/tal/tal+'")';
        document.getElementById("pc2").innerHTML = names[nImg];
        score++;
        progress++;
        audio.play();
        setTimeout(function(){
            name.play();
        },1000);
        //acomodar el nombre del mob debajo del canvas
        //se debe de escuchar el nombre el mob
    } else {//the image returns to the same place
        let audio = new Audio('assets/audio/mobs/'+nImg+'/w.ogg'); //the image its not in its place
        elemento.style.left = x;
        elemento.style.top = y;
        score--;
        if(score<0){
            score = 0;
        }
        elemento.style.visibility = 'visible'; //this is because the image doesnt have to disappear
        audio.play();
    }
    if(progress==3 && !band){
        band = true;
        setTimeout(() => {
            selectImages();
            for (var i = 0; i<images.length;i++){
                images[i].style.visibility = 'visible';
            }
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000);
    }
    if(progress>=6){
        band = false;
        indexes = [];
        setTimeout(() => {
            winScreen();
            document.getElementById("pc0").innerHTML = "";
            document.getElementById("pc1").innerHTML = "";
            document.getElementById("pc2").innerHTML = "";
        }, 2000);
    }
    document.getElementById("scoreT").innerHTML = score;
    document.getElementById("progreso").innerHTML = "Aciertos:" +progress;
}

console.log("JIJIAJAJAJ");

function selectImages(){
    var possibleI = []; //the possible images the second array can grab
    var i1 =[]; //we'll make sure as well that it doesnt repeat
    for (var i = 0; i < 3; i++) { //theres the same number of images than canvases
        var selection;
        do{
            selection = Math.floor(Math.random() * 10);
        }while(indexes.includes(selection)); //this tells us that the image will be different

        possibleI.push(selection);
        indexes.push(selection);
        images[i].id = "img" + selection;
        images[i].src = elements[selection];
    }
    for(var i=0; i<3;i++){
        var selection1;
        do{
            selection1 = Math.floor(Math.random() * 3);
        }while(i1.includes(selection1)); //this tells us that the image will be different
        
        i1.push(selection1);
        if(i==0){
            soltar.id = "lienzo" + selection; //we  put the biome to the associated mob
            soltar.style.backgroundImage = 'url("'+biomes[possibleI[selection1]]+'")';
            soltar.style.backgroundSize = 'cover';
            soltar.style.backgroundRepeat = 'no-repeat';
        }
        if(i==1){
            soltar1.id = "lienzo" + selection; //we  put the biome to the associated mob
            soltar1.style.backgroundImage = 'url("'+biomes[possibleI[selection1]]+'")';
            soltar1.style.backgroundSize = 'cover';
            soltar1.style.backgroundRepeat = 'no-repeat';
        }
        if(i==2){
            soltar2.id = "lienzo" + selection; //we  put the biome to the associated mob
            soltar2.style.backgroundImage = 'url("'+biomes[possibleI[selection1]]+'")';
            soltar2.style.backgroundSize = 'cover';
            soltar2.style.backgroundRepeat = 'no-repeat';
        }
    }
}

startGame();

