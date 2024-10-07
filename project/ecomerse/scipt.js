const test = document.getElementById("test");
const RELOAD_INTERVAL = 5000; // Time interval for auto-reload
const OFFLINE_MESSAGE_ID = "offline-status";

// Function to add placeholder cards before data loads
function addPlaceholders(count = 6) {
  for (let i = 0; i < count; i++) {
    const placeholderCard = `
      <div class="col-md-4 col-lg-3 col-xl-2 mt-3">
        <div class="card carddata">
          <div class="picture-wrapper common-img fs-card-img img-w100p d-flex justify-content-center">
            <div class="placeholder-glow w-100" style="height: 200px;"></div>
          </div>
          <div class="card-body">
            <div class="fs-card-price">
              <span class="currency placeholder-wave">₱</span>
              <span class="price placeholder-wave">000.00</span>
            </div>
            <h5 class="card-title fs-card-title two-line-clamp placeholder-wave">
              Loading...
            </h5>
          </div>
        </div>
      </div>
    `;
    test.innerHTML += placeholderCard;
  }
}

async function tery() {
  try {
    // Add placeholders before fetching
    addPlaceholders();

    const response = await fetch("https://fakestoreapi.com/products");
    const json = await response.json();

    // Clear the placeholders
    test.innerHTML = "";

    // Loop through each product in the JSON array
    json.forEach((product) => {
      // Create card HTML for each product
      const card = `
        <div class="col-md-4 col-lg-3 col-xl-2 mt-3">
          <div class="card carddata" onclick="openProductPage(${product.id})">
            <div class="picture-wrapper common-img fs-card-img img-w100p d-flex justify-content-center">
              <img src="${
                product.image
              }" loading="lazy" class="card-img-top" alt="${product.title}">
            </div>
            <div class="card-body">
              <div class="fs-card-price">
                <span class="currency">₱</span>
                <span class="price">${product.price.toFixed(2)}</span>
              </div>
              <h5 class="card-title fs-card-title two-line-clamp">${
                product.title
              }</h5>
            </div>
          </div>
        </div>
      `;
      AutoRefresh(RELOAD_INTERVAL);
      // Append the card to the test element
      test.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    AutoRefresh(RELOAD_INTERVAL);
    checkOnlineStatus();
  }
}

// Function to open a new page with product information
function openProductPage(productId) {
  window.location.href = `product.html?id=${productId}`; // Redirect to product page with the product ID
}

// Function to display an offline message
function displayOfflineMessage() {
  let message = document.getElementById(OFFLINE_MESSAGE_ID);

  if (!message) {
    message = document.createElement("div");
    message.id = OFFLINE_MESSAGE_ID;
    message.innerText =
      "You are currently offline. The page will reload once you're back online.";
    message.style.position = "fixed";
    message.style.top = "0";
    message.style.width = "100%";
    message.style.backgroundColor = "#ffc107";
    message.style.color = "#000";
    message.style.textAlign = "center";
    message.style.padding = "10px";
    message.style.zIndex = "9999";
    document.body.appendChild(message);
    AutoRefresh(t);
  }
}

function removeOfflineMessage() {
  const message = document.getElementById(OFFLINE_MESSAGE_ID);
  if (message) {
    document.body.removeChild(message);
  }
}

function AutoRefresh(t) {
  if (!navigator.onLine) {
    displayOfflineMessage();
    setTimeout(() => location.reload(true), t);
  }
}

function checkOnlineStatus() {
  if (!navigator.onLine) {
    displayOfflineMessage();

    // Add an event listener that triggers when the user goes back online
    window.addEventListener("online", () => {
      removeOfflineMessage();
      location.reload(); // Reload the page when the user is back online
    });
  } else {
    console.log("You are online.");
    removeOfflineMessage();
  }
}

// Check online/offline status when the page loads
window.addEventListener("load", checkOnlineStatus);

// Optionally, you can also check status when network changes
window.addEventListener("offline", checkOnlineStatus);
window.addEventListener("online", checkOnlineStatus);

// Call the fetch function
tery();
