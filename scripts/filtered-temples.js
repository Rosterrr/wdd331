const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".navigation a");
const gallery = document.querySelector("#temple-gallery");
const pageTitle = document.querySelector("#page-title");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/Aba_Nigeria.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/Manti_Utah.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/Payson_Utah.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/Yigo_Guam.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/Washington.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/Lima_Peru.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/Mexico_City.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "images/San_Diego_California.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/Rome_Italy.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl: "images/Logan_Utah.jpg"
  }
];

function getTempleYear(dedicatedDate) {
  return Number(dedicatedDate.split(",")[0]);
}

function createTempleCard(temple) {
  const card = document.createElement("figure");
  card.classList.add("temple-card");

  const title = document.createElement("h3");
  title.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`;

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} Temple`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  card.append(title, location, dedicated, area, image);
  return card;
}

function displayTemples(templeList) {
  gallery.innerHTML = "";
  templeList.forEach((temple) => {
    const templeCard = createTempleCard(temple);
    gallery.appendChild(templeCard);
  });
}

function filterTemples(filter) {
  let filteredTemples = temples;
  let title = "Home";

  switch (filter) {
    case "old":
      filteredTemples = temples.filter((temple) => getTempleYear(temple.dedicated) < 1900);
      title = "Old Temples";
      break;
    case "new":
      filteredTemples = temples.filter((temple) => getTempleYear(temple.dedicated) > 2000);
      title = "New Temples";
      break;
    case "large":
      filteredTemples = temples.filter((temple) => temple.area > 90000);
      title = "Large Temples";
      break;
    case "small":
      filteredTemples = temples.filter((temple) => temple.area < 10000);
      title = "Small Temples";
      break;
    default:
      filteredTemples = temples;
      title = "Home";
      break;
  }

  pageTitle.textContent = title;
  displayTemples(filteredTemples);
}

function toggleMenu() {
  navMenu.classList.toggle("open");
  const isOpen = navMenu.classList.contains("open");

  menuButton.textContent = isOpen ? "✖" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

menuButton.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;
    filterTemples(filter);

    if (navMenu.classList.contains("open")) {
      toggleMenu();
    }
  });
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

displayTemples(temples);