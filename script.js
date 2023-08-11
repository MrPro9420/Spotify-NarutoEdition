console.log("Welcome to spotify");
// Init 
let songIndex = 0;
let audioElement = new Audio('songs/Blue Bird.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Blue Bird", filePath: 'songs/Blue Bird.mp3', coverPath: "covers/cover1.jpg"},
    {songName: "Alone", filePath: "songs/Alone(PaglaSongs).mp3", coverPath: "covers/Alone.jpg"},
    {songName: "Faded", filePath: "songs/Faded(PaglaSongs).mp3", coverPath: "covers/faded.jpg"},
    {songName: "Hello-World", filePath: "songs/Hello-World(PaglaSongs).mp3", coverPath: "covers/hello world.jpg"},
    {songName: "On-My-Way-(Remix)", filePath: "songs/On-My-Way-(Remix)---Sabrina-Carpenter-n-Farruko(PaglaSongs).mp3", coverPath: "covers/on my way.jpg"},
    {songName: "Paradise", filePath: "songs/Paradise(PaglaSongs).mp3", coverPath: "covers/paradise.jpg"},
    {songName: "Ram-Siya-Ram", filePath: "songs/Ram-Siya-Ram(PaglaSongs).mp3", coverPath: "covers/Ram.jpg"},
]


songItems.forEach((element,i) => {
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
    
});
 

//Handel Play / Pause CLick
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
       
    }
    else{
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity=0;
        makeAllPlays();

    }
})

//Listen To Events
audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(audioElement.duration);
    console.log(progress);
    ProgressBar.value = progress;
    
})

ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (ProgressBar.value* audioElement.duration)/100;
    audioElement.play();

})

const makeAllPlays = ( ) =>{
    Array.from(document.getElementsByClassName('songPlay')).forEach(element=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
       if(e.target.classList.contains('fa-circle-play')){
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=songs[songIndex-1].filePath;
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");}
        else{
            audioElement.pause();
            e.target.classList.add('fa-circle-play');
        e.target.classList.remove('fa-circle-pause');
        gif.style.opacity=0;
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        }

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    audioElement.src=songs[songIndex-1].filePath;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
document.getElementById('privious').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=7;
    }
    else{
        songIndex-=1;
    }
    
    audioElement.src=songs[songIndex-1].filePath;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

