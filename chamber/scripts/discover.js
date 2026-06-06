import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

function createPlaceCard(place, index) {
  const card = document.createElement("article");
  card.classList.add("discover-card");
  card.style.gridArea = `card${index + 1}`;

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn More</button>
  `;

  return card;
}

places.forEach((place, index) => {
  cardsContainer.appendChild(createPlaceCard(place, index));
});

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const millisecondsBetweenVisits = currentVisit - Number(lastVisit);
    const daysBetweenVisits = Math.floor(millisecondsBetweenVisits / 86400000);

    if (daysBetweenVisits < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

displayVisitMessage();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
  });
}