window.addEventListener("load", function() {
    menuScreen(false);
});
  
var audio = new Audio("assets/audio/Sweden.mp3");
audio.volume = 0.5;
audio.play();

audio.addEventListener("ended", function() {
    this.currentTime = 0;
    this.play();
})

var script = document.createElement('script');
script.src = "js/dragAndDrop.js";
script.type = "text/javascript";
script.defer = true;

function playScreen() {
    buttonSound();

    document.getElementById("main-container").innerHTML = `
    <div id="playName">
        <img id="title" src="assets/title.png" alt="">
        <br>
        <h1>Enter your name:</h1>
        <input type="text" id="name-input" maxlength="26">
        <button class="btn-minecraft" id="btn-play2" onclick="gameScreen()">Play</button>&nbsp;&nbsp;
        <button class="btn-minecraft" id="btn-back" onclick="menuScreen(true)">Back</button>
        <br>
        <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="" width="100">
    </div>
    `;

    document.getElementById("name-input").addEventListener('input', checkInput);

    checkInput();

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png';
        }
    }
    
}

function menuScreen(bandera) {
    if(bandera){
        buttonSound();

    }


    document.body.style.backgroundImage = "url('assets/cover.gif')";
    document.body.style.backgroundSize = "cover";
    document.getElementById("main-container").innerHTML = `
    <div id="menu">
        <img id="title" src="assets/title.png" alt="">
        <br>
        <button class="btn-minecraft" id="btn-play" onclick="playScreen()">Play game</button>
        <br>
        <button class="btn-minecraft" id="btn-leaderboards" onclick="leaderboardScreen()">Leaderboard</button>
        <br>
        <button class="btn-minecraft" id="btn-credits" onclick="creditsScreen()">Credits</button>
        <br>
        <h4 id="copyright">Copyright RAID. Do not distribute!</h4>
        <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="" width="100">    
    </div>
    `;

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png';
        }
    }

    var scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes("js/dragAndDrop.js")) {
            console.log("SCIPRT eliminiado");
            scripts[i].parentNode.removeChild(scripts[i]);
            break; 
        }
    }
}

function creditsScreen() {
    buttonSound();

    document.body.style.backgroundImage = "url('assets/dirt-bg.jpg')";
    document.body.style.backgroundSize = "auto";

    document.getElementById("main-container").innerHTML = `
        <div id="credits">
            <img id="title" src="assets/title.png" alt="">
            <br>
            <h1>Made by</h1>
                <h2>Alejandro Lopez Ruiz</h2>
                <h2>Rodolfo Puente Zuniga</h2>
                <h2>Angel Ivan Reyes Hernandez</h2>
                <h2>and</h2>
                <h2>Diego Zamora Delgadillo</h2>
            <br><br>
        
            <h2>Universidad Autonoma de Aguascalientes</h2>
            <h2>Web Technologies</h2>
            <h2>ISC 6° A</h2>

            <br><br>
            <h2>March 2024</h2>
            <h2>Aguascalientes, MX</h2>
            <br>
            <button class="btn-minecraft" id="btn-back" onclick="menuScreen(true)">Back</button>
            <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="" width="100">    
        </div>
    `;

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png'; 
        }
    }
}



function checkMusic() {
    
    var element = document.getElementById("btn-music");

    if(element.classList.contains("btn-play")){
        element.classList.remove("btn-play");
        element.classList.add("btn-stop");
        element.src = 'assets/buttons/stop.png'; 
        audio.pause();
    } else if (element.classList.contains("btn-stop")) {
        element.classList.remove("btn-stop");
        element.classList.add("btn-play");
        element.src = 'assets/buttons/play.png'; 
        audio.play();
    }
}


function gameScreen() {
    buttonSound();

    var nameInput = document.getElementById("name-input").value.trim();

    addPlayer(nameInput, 0, 0);

    document.getElementById("main-container").innerHTML = `
    
    <div id="title-game">
        <img id="title2" src="assets/title.png" alt="">
    </div>
    <div id="game" class="row">
        <div class="col-3">
            <h4>Score<br><span id="scoreT" class="fs-3">0</span></h4>
        </div>
        <div class="col-3">
            <h4>Time<br><span id="timeT" class="fs-3">00:00</span></h4>
        </div>
        <div class="col-2"></div>
        <div class="col-4">
            <h4>Personal Best<br><span class="fs-3">Score: <span id="pbscore"></span> | Time: <span id="pbtime"></span></span></h4>
        </div>
    </div>
    <div id="main-game">
        <section id="imagesDrop">
            <img id="" src="" class="img0" width="" height="">
            <img id="" src="" class="img1" width="" height="">
            <img id="" src="" class="img2" width="" height="">
        </section>
        <section id="cajasoltar" style="display: flex;">
            <div>
                <canvas id="canvas0"></canvas>
            <p id="pc0"></p>
            </div>
            <div>
                <canvas id="canvas1"></canvas>
            <p id="pc1"></p>
            </div>
            <div>
                <canvas id="canvas2"></canvas>
            <p id="pc2"></p>
            </div>
        </section>
        <p id="uno"></p>
        <p id="dos"></p>
        <p id="tres"></p>
    </div>
    <div id="gameBack">
            <button class="btn-minecraft m-0" id="btn-back" onclick="menuScreen(true)">Back</button>
    </div>
    <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="" width="100">    

    `;

    var nameElement = document.createElement("p");
    nameElement.innerHTML = nameInput;
    nameElement.style.visibility = "hidden";
    console.log("NAMEM INPUT " + nameInput);
    nameElement.id = "nombre2";
    document.getElementById("main-container").appendChild(nameElement);

    console.log("NOSEEE " + document.getElementById("nombre2").innerHTML);

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png'; 
        }
    }

    setPersonalBest(nameInput);

    var scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes("js/dragAndDrop.js")) {
            console.log("SCIPRT eliminiado");
            scripts[i].parentNode.removeChild(scripts[i]);
            break; 
        } else {
            console.log("no hay");
            document.body.appendChild(script);
        }
    }

    startGame();

}

function savePlayers(players) {
    localStorage.setItem('leaderboard', JSON.stringify(players));
}

function checkPlayers() {
    var players = localStorage.getItem("leaderboard");
    if (players) {
        return JSON.parse(players);
    } else {
        return [];
    }
}

function addPlayer(name, score, time) {
    var players = checkPlayers();
    var existingPlayer = players.find(player => player.name === name);

    if(!existingPlayer) {
        players.push({
            name: name,
            score: 0,
            time: 0
        });
        savePlayers(players);
    }
}


function buttonSound() {
    var sonido = new Audio('assets/audio/button2.mp3');
    sonido.play();
}

function winSound() {
    var sonido = new Audio('assets/audio/win.mp3');
    sonido.play();
}
  
document.querySelectorAll('.btn-minecraft').forEach(boton => {
    boton.addEventListener('mouseover', buttonSound);
});


function checkInput() {    
    if (document.getElementById("name-input").value.trim() == '') {
        document.getElementById("btn-play2").disabled = true;
        document.getElementById("btn-play2").style.opacity = 0.4;
    } else {
        document.getElementById("btn-play2").disabled = false;
        document.getElementById("btn-play2").style.backgroundImage = "url('assets/buttons/bg.png')"
        document.getElementById("btn-play2").addEventListener("mouseover", function() {
            document.getElementById("btn-play2").style.backgroundImage = "url('assets/buttons/bluebg.png')"
        });
        document.getElementById("btn-play2").addEventListener("mouseout", function() {
            document.getElementById("btn-play2").style.backgroundImage = "url('assets/buttons/bg.png')"
        });
        document.getElementById("btn-play2").style.opacity = 1;
    }
}

function leaderboardScreen() {
    buttonSound();

    document.body.style.backgroundImage = "url('assets/dirt-bg.jpg')";
    document.body.style.backgroundSize = "auto";
    document.getElementById("main-container").innerHTML = `
    <div id="leaderboard">
        <img id="title" src="assets/leaderboard.png" alt="">
        <div id="namesLeaderboard">
            
        </div>
        <br>
        <button class="btn-minecraft" id="btn-back" onclick="menuScreen(true)">Back</button>
        <br>
        <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="">    
    </div>
    `;

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png'; 
        }
    }

    sortLeaderboard();
    showLeaderboard();

}

function sortLeaderboard() {
    var players = checkPlayers();

    players.sort(function(a, b) {
        // Primero compara los puntajes
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        // Si los puntajes son iguales, compara el tiempo
        return a.time - b.time;
    });
    savePlayers(players);
}


function showLeaderboard() {
    var players = checkPlayers();
    var leaderboardcontainer = document.getElementById("namesLeaderboard");

    leaderboardcontainer.innerHTML = '';

    if (players.length > 0){
        players.forEach(function(player, index) {
            var playerElement = document.createElement('h1');
            playerElement.innerHTML = '<br>' + (index + 1) + '. ' + player.name + ' <br><span class="leaderboards-data">Score: ' + player.score + ' <br>Time: ' + player.time + '</span><br>';
    
            leaderboardcontainer.appendChild(playerElement);
        });
    } else {
        var playerElement = document.createElement('h1');
        playerElement.innerHTML = 'We couldn\'t find any match to show you :(<br><br>Start playing to see your best matches!';
        leaderboardcontainer.appendChild(playerElement);
    }

}

function setPersonalBest(name) {
    var players = checkPlayers();
    var player = players.find(player => player.name === name);

    if (player) {
        document.getElementById("pbtime").textContent = player.time;
        document.getElementById("pbscore").textContent = player.score;
    } else {
        document.getElementById("pbtime").textContent = "N/A";
        document.getElementById("pbscore").textContent = "N/A";
    }
}


function winScreen() {
    winSound();
    var nombreUsuario = document.getElementById("nombre2").innerHTML;
    console.log("NOMBRE JUGA " + nombreUsuario);
    var nuevoPuntaje = document.getElementById("scoreT").innerHTML;
    var nuevoTiempo = document.getElementById('timeT').innerHTML;
    
    actualizarMejorPuntajeYTiempo(nombreUsuario, nuevoPuntaje, nuevoTiempo);


    document.getElementById("main-container").innerHTML = `
        <div id="winScreen">
            <img class="img-win" src="assets/congratulations.png" alt="">
            <img class="img-win" src="assets/youwon.png" alt="">
            <br>
            <button class="btn-minecraft" id="btn-backmenu" onclick="menuScreen(true)">Back to menu</button>
            <br>
            <button class="btn-minecraft" id="btn-playagain" onclick="playAgain('`+nombreUsuario+`')">Play again</button>
            <img class="btn-play" id="btn-music" src="assets/buttons/play.png" onclick="checkMusic()" alt="" width="100">    

        </div>

    `;

    

    if(!audio.paused) {
        audio.play();
    } else {
        var element = document.getElementById("btn-music");
        if(element.classList.contains("btn-play")){
            element.classList.remove("btn-play");
            element.classList.add("btn-stop");
            element.src = 'assets/buttons/stop.png'; 
        }
    }
    
}

function actualizarMejorPuntajeYTiempo(name, nuevoPuntaje, nuevoTiempo) {
    console.log("nuevo puntaje: " + nuevoPuntaje);
    console.log("YA ENTRE ")
    var jugadores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    var jugador = jugadores.find(jugador => jugador.name === name);
    console.log("NOMBRE JUGADOR " + name);
  
    var nuevoTiempoEnSegundos = tiempoEnSegundos(nuevoTiempo);
  
    console.log("NUEVO TIEMPO "+nuevoTiempoEnSegundos);
    if (jugador) {
        console.log("SI EXISTE JUGADORE");
      var tiempoJugadorEnSegundos = jugador.time;
      console.log("el puntaje fue"+nuevoPuntaje);
      console.log("el tiemop fue: " + nuevoTiempoEnSegundos);
        console.log("score viejo: " + jugador.score);

      if (nuevoPuntaje > jugador.score || (nuevoPuntaje === jugador.score && nuevoTiempoEnSegundos < tiempoJugadorEnSegundos) || jugador.score == null) {
        console.log("SI ME ACTUALICE");
        console.log("el puntaje fue"+nuevoPuntaje);
        console.log("el tiemop fue " + nuevoTiempo);
        console.log("score viejo: " + jugador.score);

        jugador.score = nuevoPuntaje;
        jugador.time = nuevoTiempoEnSegundos;
        localStorage.setItem('leaderboard', JSON.stringify(jugadores));
      } else {
        console.log("NO ME ACTUALICE");
        console.log("el puntaje fue"+nuevoPuntaje);
        console.log("el tiemop fue " + nuevoTiempo);
        console.log("score viejo: " + jugador.score);

      }
    } else {
        console.log("ALCH NOSE");
      jugadores.push({
        name: name,
        score: nuevoPuntaje,
        time: nuevoTiempoEnSegundos
      });
      localStorage.setItem('leaderboard', JSON.stringify(jugadores));
    }
  }
  
  function tiempoEnSegundos(tiempo) {
    var partes = tiempo.split(':');
    return parseInt(partes[0], 10) * 60 + parseInt(partes[1], 10);
  }

  
  function playAgain(nombreUsuario) {
    var nameElement = document.createElement("input");
    nameElement.value = nombreUsuario;
    nameElement.type = "text";
    nameElement.style.visibility = "hidden";
    nameElement.id = "name-input";
    document.getElementById("main-container").appendChild(nameElement);
    gameScreen();
  }