let countdown;
const display = document.querySelector("#timer");

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
