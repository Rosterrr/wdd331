const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".navigation a");
const gallery = document.querySelector("#temple-gallery");
const pageTitle = document.querySelector("#page-title");

const temples = [
  {
    templeName: "San Diego California",
    location: "California, USA",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "images/San_Diego_California_Temple.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Utah, USA",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl: "images/Salt_lake_temple.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Hawaii, USA",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl: "images/Laie_Hawaii_Temple.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Utah, USA",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/Payson_Utah_Temple.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/Rome_Italy_Temple.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Utah, USA",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl: "images/Logan_Utah_Temple.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Utah, USA",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/Manti_Utah_Temple.jpg"
  },
  {
    templeName: "Meridian Idaho",
    location: "Idaho, USA",
    dedicated: "2017, November, 19",
    area: 66979,
    imageUrl: "images/Meridian_Idaho_Temple.jpg"
  },
  {
    templeName: "Paris France",
    location: "Paris, France",
    dedicated: "2017, May, 21",
    area: 44000,
    imageUrl: "images/Paris_France_Temple.jpg"
  }
];

function displayTemples(templeList) {
  gallery.innerHTML = "";

  templeList.forEach((temple) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");

    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} Temple`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    caption.textContent = temple.templeName;

    figure.appendChild(image);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

function filterTemples(filter) {
  let filteredTemples = [];

  switch (filter) {
    case "old":
      filteredTemples = temples.filter((temple) => parseInt(temple.dedicated) < 1900);
      pageTitle.textContent = "Old";
      break;

    case "new":
      filteredTemples = temples.filter((temple) => parseInt(temple.dedicated) > 2000);
      pageTitle.textContent = "New";
      break;

    case "large":
      filteredTemples = temples.filter((temple) => temple.area > 90000);
      pageTitle.textContent = "Large";
      break;

    case "small":
      filteredTemples = temples.filter((temple) => temple.area < 50000);
      pageTitle.textContent = "Small";
      break;

    default:
      filteredTemples = temples;
      pageTitle.textContent = "Home";
      break;
  }

  displayTemples(filteredTemples);
}

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  if (navMenu.classList.contains("open")) {
    menuButton.textContent = "✖";
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;
    filterTemples(filter);

    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

displayTemples(temples);