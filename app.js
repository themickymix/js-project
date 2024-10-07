const cardData = [
  {
    name: "Bg color changer",
    image: "asset/bgcolor.png",
    description:
      "The Background Color Changer is an interactive web application that allows users to easily change the background color of a webpage with a single button click. It automatically adjusts the text color based on the brightness of the selected background, ensuring optimal readability. This engaging tool offers a playful way for users to explore various color combinations while enhancing their overall experience.",
    pages: "project/bgchange/bgchange.html", // Add valid URLs here
  },
  {
    name: "Simple E-commerse",
    image: "asset/ecomerse.png",
    description:
      "My simple e-commerce project uses the Fetch API to retrieve product data from a remote server and display it on the webpage. Users can view product details and add items to their cart seamlessly, enhancing the shopping experience.",
    pages: "project/ecomerse/index.html",
  },
  {
    name: "Counter",
    image: "asset/counter.png",
    description:
      "Manipulating the number using increse, decrease and reset button.",
    pages: "project/counter/index.html",
  },
];

function carddata() {
  const datahere = document.getElementById("datahere");

  // Use map to transform cardData into a single HTML string
  const cardHTML = cardData
    .map((card) => {
      return `
      <div class="col" onclick="clickme('${card.pages}')">
        <div class="card h-100 foothere">
          <img src="${card.image}" class="bgimg card-img-top" alt="${card.name}" />
          <div class="card-body">
            <h3 class="card-title">${card.name}</h3>
            <p class="descrip card-text">${card.description}</p>
          </div>
          <div class="card-footer d-flex justify-content-center">
            <div class="d-flex justify-content-center g-4">
              <box-icon type="solid" name="show"></box-icon>
              <div>Visit</div>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""); // Join all elements of the array into a single string

  // Insert the HTML string into the container
  datahere.innerHTML = cardHTML;
}

// Call the function to display cards
carddata();

// Function that handles card click and redirects to the specified page
function clickme(pageUrl) {
  if (pageUrl) {
    window.location.href = pageUrl; // Redirects to the specified URL
  } else {
    alert("No page available for this card");
  }
}
