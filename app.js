let memeNavLeft = document.getElementById("meme-nav-left");
let memeNavRight = document.getElementById("meme-nav-right");
let memeDispImg = document.getElementById("meme-display-image");
let likeBtn = document.getElementById("like");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let id = 1;
let memeDisplay = document.getElementById("meme-display");
let memeObjArr = [];

const chk = document.getElementById("chk");
chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

function renderMemes(meme) {
  let memeImg = document.createElement("img");
  memeImg.src = meme.url;
  memeImg.addEventListener("click", () => showMeme(meme));
  memeNavLeft.append(memeImg);
}

function showMeme(meme) {
  memeDisplay.dataset.id = meme.id;
  memeDispImg.src = meme.url;
}

function renderFavorite() {
  let id = parseInt(memeDisplay.dataset.id);
  let meme = memeObjArr.find((memeObj) => memeObj.id === id);
  let favoriteImg = document.createElement("img");
  favoriteImg.src = meme.url;
  memeNavRight.append(favoriteImg);
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
  if (id < 32) {
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
        memeObjArr.push(meme);
        renderMemes(meme);
      });
      showMeme(memesArr[0]);
    });
  likeBtn.addEventListener("click", renderFavorite);
  nextBtn.addEventListener("click", nextMeme);
  previousBtn.addEventListener("click", previousMeme);
}

app();

function fetchSingleMeme(id) {
  fetch(`http://localhost:3000/memes/${id}`)
    .then((res) => res.json())
    .then((meme) => showMeme(meme));
}
