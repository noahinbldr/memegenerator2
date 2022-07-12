let memeNavLeft = document.getElementById("meme-nav-left");
let memeNavRight = document.getElementById("meme-nav-right");
let memeDispImg = document.getElementById("meme-display-image");
let likeBtn = document.getElementById("like");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let id = 1;
let darkMode = document.getElementById("dark");
let lightMode = document.getElementById("light");

function renderMemes(meme) {
  let memeImg = document.createElement("img");
  memeImg.src = meme.url;
  memeImg.addEventListener("click", () => showMeme(meme));
  memeNavLeft.append(memeImg);
}

function showMeme(meme) {
  memeDispImg.src = meme.url;
}

function moveMeme(meme) {
  console.log("testing this button");
}

function toggleDarkMode() {
  alert("DARK MODE");
  // pushing new files for merge
}

function toggleLightMode() {
  alert("LIGHT MODE");
}

function previousMeme() {
  if (id > 1) {
    id -= 1;
    fetchSingleMeme(id);
  } else {
    alert("No more memes!");
  }
}

function nextMeme() {
  if (id < 20) {
    id += 1;
    fetchSingleMeme(id);
  } else {
    alert("No more memes!");
  }
}

function app() {
  fetch("http://localhost:3000/memes/")
    .then((res) => res.json())
    .then((memesArr) => {
      memesArr.forEach((meme) => {
        renderMemes(meme);
      });
      showMeme(memesArr[0]);
    });
  likeBtn.addEventListener("click", moveMeme);
  nextBtn.addEventListener("click", nextMeme);
  previousBtn.addEventListener("click", previousMeme);
  lightMode.addEventListener("click", toggleLightMode);
  darkMode.addEventListener("click", toggleDarkMode);
}

app();

function fetchSingleMeme(id) {
  fetch(`http://localhost:3000/memes/${id}`)
    .then((res) => res.json())
    .then((meme) => showMeme(meme));
}