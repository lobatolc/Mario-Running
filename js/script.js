const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');
const buttonRestart = document.querySelector('.buttonReload');
const buttonMusic = document.querySelector('.buttonMusic')
const music = document.querySelector('.soundTrack');
const soundButton = document.querySelector('.soundButton');
let auxScore = 0;
let speed;
let sound = false;
buttonMusic.style.textDecoration = 'line-through';

const jump = () =>{
    mario.classList.add('jump');

    setTimeout(() =>{
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(()=>{
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;
    

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 111){
        sound = false;
        music.pause();
        music.src = "./audio/game-over.mp3";
        music.loop = false;
        music.play();
        buttonMusic.style.textDecoration = 'line-through';
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        clearAll();
        
    }
}, 10)

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


