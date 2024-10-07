const names = ["Alice", "Bob", "Charlie"];
let listHTML = "";

names.forEach((name) => {
  listHTML += `<li>${name}</li>`;
});


console.log(listHTML); // Updates the DOM
