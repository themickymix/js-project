const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const reset = document.getElementById("reset");
const num = document.getElementById("num");

let num2 = 0;

increase.addEventListener("click", () => {
  num2++;
  num.innerText = num2;
});
decrease.addEventListener("click", () => {
  if (num2 > 0) {
    num2--;
    num.innerText = num2;   
  }
});

reset.addEventListener("click", () => {
  num2 = 0;
  num.innerHTML = "0";
});
