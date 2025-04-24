console.log("Welcome to Spotify");

//intialize the variable
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "warriyo - Mortals", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Different Heaven & EH!DE", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "janji-Heroes", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Rabba", filePath: "6.mp3", coverPath: "6.jpg"},
    {songName: "Sakhiyan", filePath: "7.mp3", coverPath: "7.jpg"},
    {songName: "Bhula dena", filePath: "8.mp3", coverPath: "8.jpg"},
    {songName: "Tumhari kasam", filePath: "9.mp3", coverPath: "9.jpg"},
    {songName: "Salam-e-Ishq", filePath: "10.mp3", coverPath: "10.jpg"},
];
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// handle play/pause click
masterPlay.addEventListener( 'click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime * 100) / audioElement.duration);
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        
    });
};


audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let id = parseInt(e.target.id);
        if (!isNaN(id) && songs[id]) {
            makeAllPlays();
            songIndex = id;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            mastersongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});


