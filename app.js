
// Grab buttons
const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const noiseBtn = document.getElementById("noiseBtn");
const rainBtn  = document.getElementById("rainBtn");
const chimeBtn = document.getElementById("chimeBtn");

// Grab sliders
const musicVol = document.getElementById("musicVol");
const noiseVol = document.getElementById("noiseVol");
const rainVol  = document.getElementById("rainVol");

// Create audio objects
const music = new Audio("assets/music.mp3");
const noise = new Audio("assets/brown-noise.mp3");
const rain  = new Audio("assets/rain.mp3");
const chime = new Audio("assets/chime.mp3");

// Loop the background tracks
music.loop = true;
noise.loop = true;
rain.loop = true;

// Initial volumes (match slider defaults)
music.volume = Number(musicVol.value);
noise.volume = Number(noiseVol.value);
rain.volume  = Number(rainVol.value);

let unlocked = false;

function enableControls() {
  musicBtn.disabled = false;
  noiseBtn.disabled = false;
  rainBtn.disabled = false;
  chimeBtn.disabled = false;

  musicVol.disabled = false;
  noiseVol.disabled = false;
  rainVol.disabled  = false;
}

async function unlockAudio() {
  try {
    // Unlock only ONE track (more reliable)
    await music.play();
    music.pause();
    music.currentTime = 0;

    unlocked = true;
    enableControls();
    startBtn.textContent = "Sound ready ✓";
    startBtn.disabled = true;
  } catch (e) {
    alert("Audio couldn't start. Click Start sound again.");
    console.log(e);
  }
}

function toggle(audioObj) {
  if (!unlocked) return;
  if (audioObj.paused) audioObj.play();
  else audioObj.pause();
}

startBtn.addEventListener("click", unlockAudio);

musicBtn.addEventListener("click", () => toggle(music));
noiseBtn.addEventListener("click", () => toggle(noise));
rainBtn.addEventListener("click",  () => toggle(rain));

chimeBtn.addEventListener("click", () => {
  if (!unlocked) return;
  chime.currentTime = 0;
  chime.play();
});

// Volume controls
musicVol.addEventListener("input", (e) => music.volume = Number(e.target.value));
noiseVol.addEventListener("input", (e) => noise.volume = Number(e.target.value));
rainVol.addEventListener("input",  (e) => rain.volume  = Number(e.target.value));