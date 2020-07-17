let countdown;
const display = document.querySelector("#timer");
const allbtns = document.querySelectorAll(".set");
const body = document.querySelector("body");
const boton = document.querySelector("#btn");
let timeSetP = 1500;
let timeSetS = 0;
let timesetL = 0;

boton.addEventListener("click", callClosure());

function callClosure() {
  let variable;
  console.log(variable);
  return function aClousure(e) {
    if (e.target.textContent === "START" && variable === undefined) {
      e.target.textContent = "STOP";
      timer(timeSetP);
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
      console.log(variable);
    } else if (e.target.textContent === "START" && variable !== undefined) {
      console.log("sup");
      e.target.textContent = "STOP";
      clearInterval(countdown);
      timer(variable);
    }
  };
}

body.addEventListener("click", (e) => {
  if (e.target.id === "short") {
    body.style.backgroundColor = "#4ca6a9";
    btn.style.color = "#4ca6a9";
    display.textContent = "5:00";
  } else if (e.target.id === "pomodoro") {
    body.style.backgroundColor = "#f05b56";
    btn.style.color = "#f05b56";
  } else if (e.target.id === "long") {
    body.style.backgroundColor = "#498fc1";
    btn.style.color = "#498fc1";
    display.textContent = "10:00";
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
