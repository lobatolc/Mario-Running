const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');
const buttonRestart = document.querySelector('.buttonReload');
const buttonMusic = document.querySelector('.buttonMusic')
const music = document.querySelector('.soundTrack');
let auxScore = 0;
let speed;
let sound = false
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
    speed = (2500-auxScore)/1000
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
    sound = !sound;
    if(sound){
        music.play();
        buttonMusic.style.textDecoration = 'none';
    }else{
        music.pause();
        buttonMusic.style.textDecoration = 'line-through';
    }
    
    
})

function clearAll(){
    clearInterval(loop);
    clearInterval(timer);
}


