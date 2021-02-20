// Variables
let isRunning = false;
let funcID;
let score = -1;
// Board Control
let board = document.getElementById("board");
let player = document.getElementById("player");
// Keyboard Access
window.addEventListener("keydown",keyPress,false);

// Keypress Function
function keyPress(key){
    if(key.keyCode == "32"){
        console.log("Space Pressed");
        playerJump();
    }
    if(key.keyCode == "13"){
        startGame();
    }
}

//Player Control Function
function playerJump(){
    if(player.style.animationName == ""){
    player.style.animationName = "playerJumpAnimation";
    delay(function(){
        player.style.animationName = "";
    }, 700 ); // end delay
}
}
// Enemy Creation Function
function enemyCreation(){
    let enemynode = document.getElementById("enemy");
    enemynode.remove();
    let enemy = document.createElement("div");
    let width = Math.floor((Math.random() * 80) + 32);
    let height = Math.floor((Math.random() * 64) + 64);
    enemy.style.width = `${width}px`;
    enemy.style.height = `96px`;
    enemy.style.backgroundImage = "url(./enemy.png)";
    enemy.classList.add("enemyPosition");
    enemy.setAttribute("id","enemy");
    board.appendChild(enemy);
    // adding animation to the created node
    enemynode = document.getElementById("enemy");
    enemynode.style.animationName = "enemyMoveAnimation";
    // Score
    updateScore();

}
// Score Update Function
function updateScore(){
    score++;
    let updateScore = document.getElementById("score");
    updateScore.innerText = `Score : ${score}`
}
// Enemy creation function running every 1500ms
function startGame(){
if(isRunning == false){
    isRunning = true;
    funcId = setInterval(()=>{
        enemyCreation()
    },1500)
    // hiding menu overlay
    let menu = document.getElementById("menu");
    menu.classList.add("hideElement");
}
else {
    console.log("Eat fivestar and do nothing");
    }
};

// Collison Detection
function collisonDetect(){
    let player = document.getElementById("player");
    let board = document.getElementById("board");
    let enemyLeft = document.getElementById("enemy").offsetLeft;
    let enemy = document.getElementById("enemy");
    let playerTop = document.getElementById("player").offsetTop;
    let enemyRight = board.offsetWidth - enemyLeft - enemy.offsetWidth; 
    if(enemyLeft > 160 && enemyLeft < 240 && playerTop > 208 || enemyRight > 560 && enemyRight < (560 + 80) && playerTop > 208 ){
        console.log("Collison Detected !");
        enemy.style.animationName = "none";
        stopFunc();
        // menu overlay reappear
        let menu = document.getElementById("menu");
        menu.classList.remove("hideElement");
        isRunning = false;
        score = -1;
    }
}
setInterval(collisonDetect,10);
// Function to stop a Function
function stopFunc() {
    clearInterval(funcId);
}
// Delay Function
var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
// fps function
const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
    }
    times.push(now);
    fps = times.length;
    // Updating UI
    let fpsNode = document.getElementById("fps");
    fpsNode.innerText = `Fps : ${fps}`;
    refreshLoop();
});
}
refreshLoop();