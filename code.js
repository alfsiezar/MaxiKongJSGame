/** @type {HTMLCanvasElement} */
var canvas = null;
var ctx = null;

var time = 0,
    fps = 0,
    framesAcum = 0,
    acumDelta = 0;

var targetDT = 1 / 60;

var globalDT = 0;

var lastDTsSize = 120;
var lastDTs = [];
var currentLastDTs = 0;

var pause = true;

var graphicAssets = {
    kong: {
        path:"./assets/MAXIKong.png",
        image: null
    },
    mario: {
        path: "./assets/VicenteFinal.png",
        image: null
    },
    plats: {
        path: "./assets/Platforms.png",
        image: null
    },
    barr:{
         path: "./assets/Barril.png",
         image: null
    }
};

var score = 0;
var highScore = 0;
var timeLeft = 100;
var startClick = false;
var gameend = false;
var level = 1;
var highLvl = level;

var vicen = null;
var doubleJ = false;
var doubleV = 0;

var maxikong = null;
var platforms = null;
var audio = null;
var iniPos = new Vector2(.5, .54);

function LoadImages(assets, onloaded) {
    let imagesToLoad = 0;

    if (Object.keys(assets).length === 0)
        onloaded();
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets) {
        if (assets.hasOwnProperty(asset)) {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}



function Init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    for (let i = 0; i < lastDTsSize; i++) {
        lastDTs.push(0);
    }

    // input
    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadImages(graphicAssets, () => {
        Start();
        // first Loop call
        Loop();
    })
}

function Start() {
    time = performance.now();

    CreateWorld(ctx);

    vicen = new Vicen();
    maxikong = new Maxikong();

    platforms = new Platforms();
    platforms.Start();

    document.addEventListener('click', function() {
        if(!startClick){
            pause = false; 
            audio = new Audio('assets/Song.mp3');
            audio.volume = .1;
            audio.loop = true;
            audio.play();
            maxikong.Barrels();
            vicen.Start();
            startClick = true;
        }
    });
}

function Loop() {
    requestAnimationFrame(Loop);
    
    let now = performance.now();
    if (now - time < targetDT * 900)
        return;

    let deltaTime = (now - time) / 1000;
    globalDT = deltaTime;

    if (deltaTime > 1)
        deltaTime = 0;

    time = now;

    lastDTs[currentLastDTs] = deltaTime;
    currentLastDTs = (currentLastDTs + 1) % lastDTs.length
    
    framesAcum++;
    acumDelta += deltaTime;

    if (acumDelta >= 1) {
        fps = framesAcum;
        framesAcum = 0;
        acumDelta -= 1;
    }

    // update the logic -----
    Update(deltaTime);

    // draw the game elements ----
    Draw(ctx);

    Input.PostUpdate();
}

function ReSpawnVicen(){
    gameend = true;
    if(maxikong.timeToSpawn > 1) maxikong.timeToSpawn -= 0.5;
    score += (100 + (timeLeft * 0.5));
    timeLeft = 101;
    ++level;
    if(highLvl < level) highLvl = level;
}

function YouLost(){
    gameend = true;
    maxikong.timeToSpawn = 5;
    score = 0;
    timeLeft = 101;
    level = 1;
}

function UpLvl(){
    level++;
    if(maxikong.timeToSpawn > 1) maxikong.timeToSpawn -= 0.5;
    gameend = true;
}

function Update(deltaTime) {
    
    if (Input.IsKeyDown(KEY_P)) {
        pause = !pause;
        //audio.volume = 0.1;
    }

    if(Input.IsKeyDown(KEY_F)) UpLvl();

    if (pause)  return;
        //audio.volume = 0.5;
    
    timeLeft -= deltaTime;
    
    if(timeLeft <= 0){
        //DrawLose(ctx);
        YouLost();
    }
    
    vicen.Update(deltaTime);
    maxikong.Update(deltaTime);

    if(score > highScore) highScore = score;

    // update physics
    // Step(timestep , velocity iterations, position iterations)
    world.Step(deltaTime, 8, 3);
    world.ClearForces();
}

function DrawLose(ctx){
    ctx.textAlign = "start";
    ctx.fillStyle = "white";
    ctx.font = "30px Comic Sans MS regular";
    ctx.fillText("YOU LOST! " + 452, 30);
}

function Draw(ctx) {
    // background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // box2d world debug
    //DrawWorldDebug(ctx);

    if(startClick)    vicen.Draw(ctx);
    maxikong.Draw(ctx);
    platforms.Draw(ctx);

    // deltaTimes graph
    // DrawProfiler(ctx);

    // draw the fps
    DrawStats(ctx);

    //DrawLose(ctx);
}

function DrawStats(ctx)
{
    ctx.textAlign = "start";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(2, 2, 110, 54);
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS regular";
    ctx.fillText("FPS: " + fps, 6, 80);
    ctx.fillText("FPS (dt): " + (1 / globalDT).toFixed(2), 6, 98);
    ctx.fillText("deltaTime: " + (globalDT).toFixed(4), 6, 116);
    // print the number of bodies in the world simulation
    ctx.fillText("body count: " + world.GetBodyCount(), 6, 134);
    
    ctx.font = "30px Comic Sans MS regular";
    ctx.fillText("Time left: " + Math.trunc(timeLeft), 430, 30);
    ctx.fillText("Score: " + Math.trunc(score), 6, 60);
    ctx.fillText("High-Score: " + Math.trunc(highScore) + " Lvl: " + highLvl, 6, 30);
    ctx.fillText("Level: " + level, 430, 60);
}

function DrawProfiler(ctx)
{
    let xStep = 2;
    let yScale = 5000;
    let initX = 10;
    let initY = 400;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(initX, initY - (lastDTs[0] * yScale));
    for (let i = 0; i < lastDTs.length; i++) {
        ctx.lineTo(initX + (i * xStep), initY - (lastDTs[i] * yScale));
    }
    ctx.stroke();

    const redLineHeight = 20 / 2;
    const currentXStep = initX + (currentLastDTs * xStep);
    const currentYStep = lastDTs[currentLastDTs] * yScale;

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.5;
    ctx.moveTo(currentXStep, (initY - redLineHeight) - currentYStep);
    ctx.lineTo(currentXStep, (initY + redLineHeight) - currentYStep);
    ctx.stroke();
}

function DrawWorldDebug(ctx) {
    // Transform the canvas coordinates to cartesian coordinates
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
}


window.onload = Init;
