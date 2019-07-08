var bodySel = document.querySelector("body");
var wordInDataSel = document.querySelector("#wordInData");
var inputBoxSel = document.querySelector("#inputBox");
var inputButtonSel = document.querySelector("#inputButton");
var resultSel = document.querySelector("#resultWindow");
var formSel = document.querySelector("#formTag");

var screenOn = function() {
  let randomIndex = Math.floor(Data.length * Math.random());
  wordInDataSel.innerText = Data[randomIndex];
};

var correct = function() {
  resultSel.innerText = "참";
  wordInDataSel.textContent = inputBoxSel.value;
  inputBoxSel.value = "";
};

var incorrect = function() {
  resultSel.innerText = "거짓";
};

var buttonClick = function(event) {
  event.preventDefault();
  let firstWord = inputBoxSel.value[0];
  let dataLastWord = wordInDataSel.innerText.split("").pop();
  if (firstWord == dataLastWord) {
    return correct();
  } else if (inputBoxSel.value == undefined) {
    return incorrect();
  } else {
    return incorrect();
  }
};

inputButtonSel.addEventListener("click", buttonClick);
formSel.addEventListener("submit", buttonClick);

window.onload = screenOn();
