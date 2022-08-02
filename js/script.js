const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');
const buttonRestart = document.querySelector('.buttonReload');
const buttonMusic = document.querySelector('.buttonMusic')
const music = document.querySelector('.soundTrack');
const soundButton = document.querySelector('.soundButton');
const gameRecord = document.querySelector('.game-record')
let auxScore = 0;
let speed;
let sound = false;
let recordColor = false;
buttonMusic.style.textDecoration = 'line-through';

if(localStorage.getItem("record") == undefined || localStorage.getItem("record") == null){
    localStorage.setItem("record", "0");
}


const jump = () =>{
    mario.classList.add('jump');

    setTimeout(() =>{
        mario.classList.remove('jump');
    }, 500);
}

function stopSound(){
    if(sound){
        music.src = "./audio/game-over.mp3";
        music.loop = false;
        music.play();
    }
}

const loop = setInterval(()=>{
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;
    

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 111){
   
        music.pause();

        stopSound();
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        
        gameRecord.style.display = "none";
        clearAll();
        
        showRecord();
        
        
    }
}, 10)

function showRecord(){
    const record = setInterval(()=>{
        const oldRecord = localStorage.getItem("record");
        if(auxScore >= oldRecord){
            gameRecord.style.display = "block";
            
            gameRecord.innerHTML = "New record: "+auxScore;
            localStorage.setItem("record", auxScore);
            if(!recordColor){
                
                gameRecord.style.color = "red";
                recordColor = true;
            }else{
                
                gameRecord.style.color = "yellow";
                recordColor = false;
            }
        }
           
    }, 100)
}

const timer = setInterval(()=>{
    auxScore = auxScore+1;
    speed = (2000-auxScore)/1000
    if(speed<0.75){
        speed = 0.75;
    }
    pipe.style.animation = `pipe-animation ${speed}s infinite linear`;
    
    score.innerHTML = `Score: ${auxScore}`
}, 100)





document.addEventListener('keydown', jump);

buttonRestart.addEventListener('click', ()=>{
    window.location.href = '/';
});



buttonRestart.addEventListener('click', ()=>{
    window.location.href = '/';
});

buttonMusic.addEventListener('click', ()=>{
    soundButton.play();
    if(sound){
        sound = false;
        music.pause();
        buttonMusic.style.textDecoration = 'line-through';
       
    }else{
        sound = true;
        music.play();
        buttonMusic.style.textDecoration = 'none';
        
    }
    
    
})

function clearAll(){
    
    clearInterval(loop);
    clearInterval(timer);
    
}


