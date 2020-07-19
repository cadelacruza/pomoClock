//Values for timer()
let countdown;
let variable;

//Elements from the DOM
const display = document.querySelector("#timer");
const allbtns = document.querySelectorAll(".set");
const body = document.querySelector("body");
const boton = document.querySelector("#btn");
const pomodoro = document.querySelector("#pomodoro");
const audio = document.querySelector("#audio");
const short = document.querySelector("#short");
const long = document.querySelector("#long");
const modal = document.querySelector("#modal");
const settings = document.querySelector("#settings");
const closeModal = document.querySelector("#close");
const timePom = document.querySelector("#pom");
const timeShort = document.querySelector("#shorter");
const timeLong = document.querySelector("#longer");
const toggleBtn = document.querySelector("#check");

const volumen = document.querySelector("#volume");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  console.log(toggleBtn.value);
});

let timeSet = toSeconds(pomodoro.dataset.min);
window.onload = resetInCase;
timePom.oninput = changePom;
timeShort.oninput = changeShort;
timeLong.oninput = changeLong;

function resetInCase() {
  timePom.value = "25";
  timeShort.value = "5";
  timeLong.value = "10";
  toggleBtn.checked = false;
}

function changePom(e) {
  pomodoro.dataset.min = timePom.value;

  if (pomodoro.classList.contains("active")) {
    clearInterval(countdown);
    variable = undefined;
    display.textContent = `${pomodoro.dataset.min}:00`;
    timeSet = toSeconds(pomodoro.dataset.min);
    boton.textContent = "START";
  }

  console.log(typeof pomodoro.dataset.min);
}

function changeShort(e) {
  short.dataset.min = timeShort.value;

  if (short.classList.contains("active")) {
    clearInterval(countdown);
    variable = undefined;
    display.textContent = `${short.dataset.min}:00`;
    boton.textContent = "START";
    timeSet = toSeconds(short.dataset.min);
  }

  console.log(typeof short.dataset.min);
}

function changeLong(e) {
  long.dataset.min = timeLong.value;

  if (long.classList.contains("active")) {
    clearInterval(countdown);
    variable = undefined;
    display.textContent = `${long.dataset.min}:00`;
    boton.textContent = "START";
    timeSet = toSeconds(long.dataset.min);
  }

  console.log(typeof long.dataset.min);
}

closeModal.addEventListener("click", () => {
  if (checkIt()) {
    closeIt();
  }
});
document.querySelector("#boton-m").addEventListener("click", () => {
  if (checkIt()) {
    closeIt();
  }
});

function closeIt(e) {
  modal.classList.remove("active");
  document.querySelector(".modal-wrapper").style.display = "none";
}

function checkIt() {
  if (
    timePom.value <= 0 ||
    timePom.value % 1 !== 0 ||
    timeShort.value % 1 !== 0 ||
    timeLong.value % 1 !== 0 ||
    timeShort.value <= 0 ||
    timeLong.value <= 0
  ) {
    return false;
  } else {
    return true;
  }
}

settings.addEventListener("click", () => {
  modal.classList.add("active");
  document.querySelector(".modal-wrapper").style.display = "block";
});

// The varibale timeSet is goin to be what's passed onto timer()
//I gotta update timeSet to change when:
// 1.- I click on pomodoro/short/long
// 2.- I change the amount of minutes the session will take (settings)

function toSeconds(valueInMinutes) {
  return parseInt(valueInMinutes * 60);
}

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
    timeSet = toSeconds(short.dataset.min);
    console.log(timeSet);
    boton.textContent = "START";
  } else if (e.target.id === "pomodoro") {
    clearInterval(countdown);
    variable = undefined;
    body.style.backgroundColor = "#f05b56";
    btn.style.color = "#f05b56";
    display.textContent = `${pomodoro.dataset.min}:00`;
    timeSet = toSeconds(pomodoro.dataset.min);
    console.log(timeSet);
    boton.textContent = "START";
  } else if (e.target.id === "long") {
    clearInterval(countdown);
    variable = undefined;
    body.style.backgroundColor = "#498fc1";
    btn.style.color = "#498fc1";
    display.textContent = `${long.dataset.min}:00`;
    timeSet = toSeconds(long.dataset.min);
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
      audio.volume = volumen.value;
      audio.play();
      clearInterval(countdown);

      if (pomodoro.classList.contains("active")) {
        variable = undefined;
        pomodoro.classList.remove("active");
        short.classList.add("active");

        body.style.backgroundColor = "#4ca6a9";
        btn.style.color = "#4ca6a9";
        display.textContent = `${short.dataset.min}:00`;
        timeSet = toSeconds(short.dataset.min);

        if (toggleBtn.classList.contains("active")) {
          timer(timeSet);
          boton.textContent = "STOP";
        } else {
          boton.textContent = "START";
        }
      } else if (
        short.classList.contains("active") ||
        long.classList.contains("active")
      ) {
        short.classList.remove("active");
        long.classList.remove("active");
        pomodoro.classList.add("active");
        variable = undefined;

        body.style.backgroundColor = "#f05b56";
        btn.style.color = "#f05b56";
        display.textContent = `${pomodoro.dataset.min}:00`;
        timeSet = toSeconds(pomodoro.dataset.min);

        if (toggleBtn.classList.contains("active")) {
          timer(timeSet);
          boton.textContent = "STOP";
        } else {
          boton.textContent = "START";
        }
      }
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
