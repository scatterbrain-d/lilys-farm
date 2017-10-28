const animals = [
    {
    name: "lion",
    image: "images/lion.png",
    sound: "sounds/lion.wav",
    colors: {
        bg: "goldenrod",
        text: "black"
        }
    },{
    name: "owl",
    image: "images/owl.png",
    sound: "sounds/owl.wav",
    colors: {
        bg: "sienna",
        text: "black"
        }
    },{
    name: "cow",
    image: "images/cow.png",
    sound: "sounds/cow.wav",
    colors: {
        bg: "white",
        text: "black"
        }
    },{
    name: "dog",
    image: "images/dog.png",
    sound: "sounds/dog.wav",
    colors: {
        bg: "tan",
        text: "black"
        }
    },{
    name: "cat",
    image: "images/cat.png",
    sound: "sounds/cat.wav",
    colors: {
        bg: "sandybrown",
        text: "white"
        }
    },{
    name: "duck",
    image: "images/duck.png",
    sound: "sounds/duck.wav",
    colors: {
        bg: "gold",
        text: "black"
        }
    },{
    name: "pig",
    image: "images/pig.png",
    sound: "sounds/pig.wav",
    colors: {
        bg: "lightcoral",
        text: "black"
        }
    },{
    name: "sheep",
    image: "images/sheep.png",
    sound: "sounds/sheep.wav",
    colors: {
        bg: "lightgray",
        text: "black"
        }
    },{
    name: "elephant",
    image: "images/elephant.png",
    sound: "sounds/elephant.wav",
    colors: {
        bg: "slategray",
        text: "black"
        }
    }];

var main = document.querySelector("#main");
var scoreboard = document.querySelector("#score");
var gameMode = document.querySelectorAll(".difficulty");
var titlescreen = document.querySelector("#titlescreen");
var back = document.querySelector("#quit");
var namespace = document.querySelector("#namespace");
var label = document.querySelector("#label");
var message = document.querySelector("#message");
var bgm = new Audio("sounds/slumber.mp3");
var sound = document.querySelector("#sound");
var score = 0;
var generator;

function togglePlay(){
    console.log("clicked");
    return bgm.paused ? playSound() : pauseSound();
}

function playSound(){
    bgm.play();
    sound.textContent = "🔊";
}

function pauseSound(){
    bgm.pause();
    sound.textContent = "🔇";
}

//starts game based on difficulty level chosen
function chooseGame(event) {
    if (event.target.className.includes("easy"))
        generator = window.setInterval(runApp, 2000);
    else generator = window.setInterval(runApp, 600);
    back.style.opacity = 1;
    titlescreen.style.opacity = 0;
    titlescreen.style.zIndex = -1;
}

//picks random animal and calls creation function
function runApp() {
    var index = Math.floor((Math.random() * animals.length));
    var animal = animals[index];
    makeAnimal(animal);
}

//creates animal element in DOM offscreen, starts animation, starts timer for deletion
function makeAnimal(animal){
    var animalPic = document.createElement("img");
    var image = animal.image;
    var name = animal.name;
    main.append(animalPic);
    animalPic.src = image;
    animalPic.classList.add(name);
    animalPic.classList.add("hide");
    
    var delay = 500 + (Math.random() * 2000);
    function run(){animalPic.classList.add("run");}
    window.setTimeout(run, delay);  //adds some delay to randomize animal procession
    
    window.setTimeout(grinder, 10500, animalPic);
}

//deletes element from DOM
function grinder(ele){
    ele.remove();
}

//reacts to click
function react(event){
    var animalPic = event.target;
    console.log(event);
    //reference object with which element was created
    if (animalPic.nodeName === "IMG"
        && animalPic.className.includes("run")) {
        var clicked = animals.find(function(animal){
            for (var i = 0; i < animals.length; i++)
                if (animalPic.className.includes(animal.name)){
                    return animal;
        }});
    
        //display animal name in label header
        label.textContent = clicked.name.toUpperCase() + "!";
        label.style.color = clicked.colors.text;
        namespace.style.opacity = 1;
        namespace.style.color = clicked.colors.bg;
        namespace.style.borderColor = clicked.colors.text;
        namespace.style.background = clicked.colors.bg;
    
        //increment score
        score++;
        scoreboard.textContent = score;
        scoreboard.style.opacity = 1;
        
        //play animal sound
        var audio = new Audio(clicked.sound);
        audio.play();
        
        //cancel "run" animation, reset position of element, initiate "clicked" animation    
        animalPic.style.left = (event.clientX - event.offsetX) + "px";
        animalPic.style.top = (event.clientY - event.offsetY) + "px";
        animalPic.classList.remove("run");
        animalPic.classList.remove("hide");
        animalPic.classList.add("clicked");
        window.setTimeout(grinder, 1500, animalPic);
    }
}

//stop game, return to title screen, reset score
function quit(){
    clearInterval(generator);
    titlescreen.style.opacity = 1;
    titlescreen.style.zIndex = 2;
    namespace.style.opacity = 0;
    score = 0;
    scoreboard.textContent = score;
}


//prompts landscape display when loaded in portrait
function screenCheck(){
    if (window.innerWidth < window.innerHeight) {
    message.style.display = "block";
    gameMode.forEach(function(button){
        button.style.display = "none";
        });
    }
}

//displays gamemode buttons once device is in landscape display
function showButton(){
    if (window.innerWidth > window.innerHeight) {
    message.style.display = "none";
    gameMode.forEach(function(button){
        button.style.display = "inline-block";
        });
    }
}

bgm.play();
screenCheck();

//listener for window resize
window.addEventListener("resize", showButton);

// background music toggle
sound.addEventListener("click", togglePlay);

// listener for game difficulty selection
gameMode.forEach(function(button){
    button.addEventListener("click", chooseGame);
});

//listener for click on moving animal elements
main.addEventListener("click", react);

//listener for quit button
back.addEventListener("click", quit);