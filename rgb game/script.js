// VARIABLES

const titleRGB = document.querySelector(".title--RGB");
const newGame = document.querySelector(".menu__button--newgame");
const headerColor = document.querySelector(".header");
const gameMsg = document.querySelector(".menu__message");
const tileContainer = document.querySelector(".grid__tiles");
const easyModeButton = document.querySelector(".menu_button--easy");
const hardModeButton = document.querySelector(".menu_button--hard");

let targetColor;
const easyMode = 3;
const hardMode = 6;
const originalHeaderColor = "rgb(58, 117, 172)";

// DIFFICULTY TOGGLE
easyModeButton.addEventListener("click", modeToggle);
hardModeButton.addEventListener("click", modeToggle);

function modeToggle(e) {
    let targetButton = e.target

    if(!targetButton.classList.contains('mode-on')) {
      easyModeButton.classList.toggle("mode-on");
      hardModeButton.classList.toggle("mode-on");
      resetGame();
    }
};

// GAME RESET

window.addEventListener("load", resetGame);
newGame.addEventListener("click", resetGame);

function resetGame() {

  // resets and determines tiles number
  tileContainer.innerHTML = "";
  
  let tilesLength;
  easyModeButton.classList.contains('mode-on')? tilesLength = easyMode : tilesLength = hardMode;
  
  // generates random number to select target tile
  let randomIndex = Math.floor(Math.random() * (tilesLength - 0) + 0);
  
  // sets colors:
  for (let i = 0; i < tilesLength; i++) {
    // gets random color 
    let red = Math.floor(Math.random() * (255 - 0) + 0);
    let green = Math.floor(Math.random() * (255 - 0) + 0);
    let blue = Math.floor(Math.random() * (255 - 0) + 0);

    // applies colors to each tile
    let newTile = document.createElement("div");
    newTile.classList.add("grid__tile");
    newTile.style.backgroundColor = `RGB(${red}, ${green}, ${blue})`;
    newTile.style.opacity = "1";
    tileContainer.appendChild(newTile);
    
    // tests for target tile and saves target colors
    if (i === randomIndex) {
      targetColor = `rgb(${red}, ${green}, ${blue})`;
    }
  }

  // changes header to target RGB text
  titleRGB.textContent = targetColor.toUpperCase();
  
  // resets headerbackground color and messages
  newGame.textContent = "NEW COLORS";
  headerColor.style.backgroundColor = originalHeaderColor;
  gameMsg.textContent = "";

  const gameTiles = document.querySelectorAll(".grid__tile");

  // TILE CLICKING EVENT
  gameTiles.forEach((tile) => {
    tile.addEventListener("click", function event(e) {
      const currentTile = e.target;
  
      if (currentTile.style.backgroundColor !== targetColor) {
        currentTile.style.opacity = "0";
        gameMsg.textContent = "Try again";
      } else {
        gameMsg.textContent = "Correct!";
        gameTiles.forEach((tile) => {
          tile.style.backgroundColor = targetColor;
          tile.style.opacity = "1";
        });
        headerColor.style.backgroundColor = targetColor;
        newGame.textContent = "PLAY AGAIN?";
      }
    });
  });
}






