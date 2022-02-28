// variables
const textsToWrite = document.getElementById("textsToWrite");
const writeHere = document.getElementById("writeText");
const charPerMin = document.getElementById("charPerMin");
const wordPerMin = document.getElementById("wordPerMin");
const TimeTaken = document.getElementById("totalTime");
const totalError = document.getElementById("totalError");
const showScore = document.getElementById("score");
const button = document.getElementById("btn");

let totalCorrect = 0;
let error = 0;
let chars = 0;
let startTime, endTime;
let totalScore,
  yourTotalScore = 0;

// Get user input
const getValues = () => {
  let userInput = writeHere.value;
  let splitUserInput = userInput.split("");

  let randomText = textsToWrite.innerText;
  let splitRandomText = randomText.split("");

  let allSpanText = document.getElementsByTagName("span");

  splitRandomText.forEach((value, index) => {
    if (splitUserInput[index] == null) {
      allSpanText[index].classList.remove("text-green-700");
      allSpanText[index].classList.remove("text-red-700");
    } else if (splitUserInput[index] === value) {
      allSpanText[index].classList.add("text-green-700");
      allSpanText[index].classList.remove("text-red-700");
    } else {
      allSpanText[index].classList.add("text-red-700");
      allSpanText[index].classList.remove("text-green-700");
    }
  });
};

// Start Game
const startGame = () => {
  spanText();
  let date = new Date();
  startTime = date.getTime();
  writeHere.addEventListener("input", () => {
    getValues();
  });

  error = 0;
  button.innerText = "END";
  button.classList.add("bg-purple-700");
  button.classList.add("border-fuchsia-400");
};

// getting a random qoute from the json file
const spanText = () => {
  textsToWrite.innerText = "";
  writeHere.value = "";

  let getJson = async () => {
    let URL = "/src/data.json";
    let res = await fetch(URL);
    let Texts = await res.json();
    let randomNumber = Math.floor(Math.random() * Texts.length);
    let randomText = Texts[randomNumber];
    let splitRandomText = randomText.split("");

    splitRandomText.forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.innerText = char;
      textsToWrite.appendChild(charSpan);
    });
  };
  getJson();
};

// end game function
const endGame = () => {
  let date = new Date();
  endTime = date.getTime();
  showResult();
  button.innerText = "START";
  button.classList.remove("bg-purple-700");
  button.classList.remove("border-fuchsia-400");
};

// counting errors and showing result
const showResult = () => {
  let totalTime = (endTime - startTime) / 1000;

  let userInput = writeHere.value;

  countErrors();
  if (userInput.length == 0) {
    wordPerMin.innerHTML = `⌨ Words/Min : 0`;
    showScore.innerHTML = `🏆 Your score : 0/${totalScore}`;
  } else {
    let splitUserInput = userInput.split(" ");
    let speed = Math.round((splitUserInput.length / totalTime) * 60);
    wordPerMin.innerHTML = `⌨ Words/min : ${speed}`;
    showScore.innerHTML = `🏆 Your score : ${yourTotalScore}/${totalScore}`;
  }

  totalError.innerHTML = `📛 Total Errors : ${error}`;
  TimeTaken.innerHTML = `⌛ Time Taken : ${totalTime} secs.`;
};

// error counting function
const countErrors = () => {
  let userInput = writeHere.value;
  let splitUserInput = userInput.split(" ");

  let randomText = textsToWrite.innerText;
  let splitRandomText = randomText.split(" ");

  totalScore = splitRandomText.length * 2;

  splitRandomText.forEach((value, index) => {
    if (value === splitUserInput[index]) {
      totalCorrect++;
    } else {
      error++;
    }
  });
  yourTotalScore = (splitRandomText.length - error) * 2;
};

// start and end the game
button.addEventListener("click", () => {
  if (button.innerText == "START") {
    startGame();
  } else if (button.innerText == "END") {
    endGame();
  }
});
