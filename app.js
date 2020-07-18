//Values for timer()
let countdown;
let timeSet = 1500;

//Elements from the DOM
const display = document.querySelector("#timer");
const allbtns = document.querySelectorAll(".set");
const body = document.querySelector("body");
const boton = document.querySelector("#btn");

const pomodoro = document.querySelector("#pomodoro");
const short = document.querySelector("#short");
const long = document.querySelector("#long");

// The varibale timeSet is goin to be what's passed onto timer()
//I gotta update timeSet to change when:
// 1.- I click on pomodoro/short/long
// 2.- I change the amount of minutes the session will take (settings)

function setTime(valueInMinutes) {
  return parseInt(valueInMinutes * 60);
}

let variable;
let prueba10 = callClosure();

boton.addEventListener("click", prueba10);

function callClosure() {
  return function aClousure(e) {
    console.log(e.target.color);
    if (e.target.textContent === "START" && variable === undefined) {
      e.target.textContent = "STOP";
      timer(timeSet);
      console.log(`case 1 ${variable}`);
    } else if (e.target.textContent === "STOP") {
      e.target.textContent = "START";
      clearInterval(countdown);
      let minutos = [];
      let contador = 0;
      while (display.textContent[contador] !== ":") {
        minutos.push(display.textContent[contador]);
        contador++;
      }
      let segundos = parseInt(
        display.textContent[display.textContent.length - 2] +
          display.textContent[display.textContent.length - 1]
      );
      minutos = parseInt(minutos.join(""));
      variable = minutos * 60 + segundos;
      console.log(`case 2 ${variable}`);
    } else if (e.target.textContent === "START" && variable !== undefined) {
      e.target.textContent = "STOP";
      clearInterval(countdown);
      timer(variable);
      console.log(`case 3 ${variable}`);
    }
  };
}

body.addEventListener("click", (e) => {
  if (e.target.id === "short") {
    clearInterval(countdown);
    variable = undefined;
    body.style.backgroundColor = "#4ca6a9";
    btn.style.color = "#4ca6a9";
    display.textContent = `${short.dataset.min}:00`;
    timeSet = setTime(short.dataset.min);
    console.log(timeSet);
    boton.textContent = "START";
  } else if (e.target.id === "pomodoro") {
    clearInterval(countdown);
    variable = undefined;
    body.style.backgroundColor = "#f05b56";
    btn.style.color = "#f05b56";
    display.textContent = `${pomodoro.dataset.min}:00`;
    timeSet = setTime(pomodoro.dataset.min);
    console.log(timeSet);
    boton.textContent = "START";
  } else if (e.target.id === "long") {
    clearInterval(countdown);
    variable = undefined;
    body.style.backgroundColor = "#498fc1";
    btn.style.color = "#498fc1";
    display.textContent = `${long.dataset.min}:00`;
    timeSet = setTime(long.dataset.min);
    console.log(timeSet);

    boton.textContent = "START";
  }
});

allbtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    checkActive();
    e.target.classList.add("active");
  });
});

function checkActive() {
  allbtns.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
}

function timer(seconds) {
  const current = Date.now();
  const target = current + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const remainingTime = Math.round((target - Date.now()) / 1000);

    if (remainingTime < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(remainingTime);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const segundos = seconds % 60;

  const value = `${minutes}:${segundos < 10 ? "0" : ""}${segundos}`;
  display.textContent = value;
  document.title = value;
}
