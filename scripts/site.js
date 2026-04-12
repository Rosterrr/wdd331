const destinations = [
  {
    name: `Ruta de las Flores`,
    type: `town`,
    image: `images/ruta-flores.jpg`,
    alt: `Colorful town street in Ruta de las Flores`,
    description: `A scenic route known for colorful towns, local food, markets, and weekend culture.`,
    bestFor: `Food and culture`
  },
  {
    name: `El Tunco`,
    type: `beach`,
    image: `images/el-tunco.jpg`,
    alt: `Beach view at El Tunco`,
    description: `A popular beach destination with surfing, sunsets, and a lively atmosphere.`,
    bestFor: `Surfing`
  },
  {
    name: `Santa Ana Volcano`,
    type: `volcano`,
    image: `images/santa-ana.jpg`,
    alt: `View of Santa Ana Volcano crater`,
    description: `One of the best-known volcano hikes in the country with stunning crater views.`,
    bestFor: `Hiking`
  },
  {
    name: `Suchitoto`,
    type: `town`,
    image: `images/suchitoto.jpg`,
    alt: `Historic street in Suchitoto`,
    description: `A colonial town with art, history, and relaxed views near Lake Suchitlán.`,
    bestFor: `Photography`
  }
];

function setupMenu() {
  const menuButton = document.querySelector(`#menuButton`);
  const siteNav = document.querySelector(`#siteNav`);

  if (!menuButton || !siteNav) {
    return;
  }

  menuButton.addEventListener(`click`, () => {
    siteNav.classList.toggle(`open`);
    const expanded = siteNav.classList.contains(`open`);
    menuButton.setAttribute(`aria-expanded`, `${expanded}`);
    menuButton.textContent = `${expanded ? `✕` : `☰`}`;
  });
}

function setFooterData() {
  const year = document.querySelector(`#currentYear`);
  const modified = document.querySelector(`#lastModified`);

  if (year) {
    year.textContent = `${new Date().getFullYear()}`;
  }

  if (modified) {
    modified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function getFavorites() {
  const storedFavorites = localStorage.getItem(`esFavorites`);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem(`esFavorites`, JSON.stringify(favorites));
}

function updateFavoriteCount() {
  const favoriteCount = document.querySelector(`#favoriteCount`);
  if (!favoriteCount) {
    return;
  }

  const favorites = getFavorites();
  favoriteCount.textContent = `You have ${favorites.length} saved destination${favorites.length === 1 ? `` : `s`}.`;
}

function toggleFavorite(destinationName) {
  const favorites = getFavorites();
  const alreadySaved = favorites.includes(destinationName);

  const updatedFavorites = alreadySaved
    ? favorites.filter((favorite) => favorite !== destinationName)
    : [...favorites, destinationName];

  saveFavorites(updatedFavorites);
  updateFavoriteCount();
  renderFeatured();
  renderDestinations(`all`);
}

function createDestinationCard(destination) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(destination.name);

  return `
    <article class="card destination-card">
      <img src="${destination.image}" alt="${destination.alt}" width="600" height="400" loading="lazy">
      <h3>${destination.name}</h3>
      <div class="destination-meta">
        <span class="tag">${destination.type}</span>
        <span class="tag">${destination.bestFor}</span>
      </div>
      <p>${destination.description}</p>
      <button class="favorite-button" data-name="${destination.name}">
        ${isFavorite ? `Remove Favorite` : `Save Favorite`}
      </button>
    </article>
  `;
}

function attachFavoriteEvents() {
  const favoriteButtons = document.querySelectorAll(`.favorite-button`);

  favoriteButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      toggleFavorite(button.dataset.name);
    });
  });
}

function renderFeatured() {
  const featuredList = document.querySelector(`#featuredList`);
  if (!featuredList) {
    return;
  }

  featuredList.innerHTML = `${destinations
    .slice(0, 3)
    .map((destination) => createDestinationCard(destination))
    .join(``)}`;

  attachFavoriteEvents();
}

function renderDestinations(filterValue = `all`) {
  const destinationList = document.querySelector(`#destinationList`);
  if (!destinationList) {
    return;
  }

  const filteredDestinations = filterValue === `all`
    ? destinations
    : destinations.filter((destination) => destination.type === filterValue);

  destinationList.innerHTML = `${filteredDestinations
    .map((destination) => createDestinationCard(destination))
    .join(``)}`;

  attachFavoriteEvents();
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(`.filter-button`);

  if (!filterButtons.length) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      filterButtons.forEach((item) => item.classList.remove(`active-filter`));
      button.classList.add(`active-filter`);
      renderDestinations(button.dataset.filter);
    });
  });
}

function setupTripForm() {
  const tripForm = document.querySelector(`#tripForm`);
  const planResult = document.querySelector(`#planResult`);

  if (!tripForm || !planResult) {
    return;
  }

  const savedTrip = localStorage.getItem(`esTripPlan`);

  if (savedTrip) {
    const tripData = JSON.parse(savedTrip);
    planResult.innerHTML = `
      <h2>Suggested focus</h2>
      <p>Hello, ${tripData.name || `traveler`}.</p>
      <p>Your selected season is <strong>${tripData.season}</strong>.</p>
      <p>Your main interest is <strong>${tripData.interest}</strong>.</p>
      <p>Activities: <strong>${tripData.activities.length ? tripData.activities.join(`, `) : `none selected`}</strong>.</p>
      <p>${tripData.recommendation}</p>
    `;
  }

  tripForm.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const travelerName = document.querySelector(`#travelerName`).value.trim();
    const season = document.querySelector(`#season`).value;
    const interestInput = document.querySelector(`input[name="interest"]:checked`);
    const activityInputs = document.querySelectorAll(`input[name="activities"]:checked`);

    if (!interestInput) {
      return;
    }

    const interest = interestInput.value;
    const activities = [...activityInputs].map((activity) => activity.value);

    let recommendation = `A balanced route with food, towns, and nature would fit your trip.`;

    if (interest === `beach`) {
      recommendation = `You should focus on beaches like El Tunco and nearby coastal stops.`;
    } else if (interest === `volcano`) {
      recommendation = `You should prioritize volcano routes like Santa Ana for hiking and views.`;
    } else if (interest === `town`) {
      recommendation = `You should explore cultural towns like Suchitoto and Ruta de las Flores.`;
    }

    const tripPlan = {
      name: travelerName,
      season: season,
      interest: interest,
      activities: activities,
      recommendation: recommendation
    };

    localStorage.setItem(`esTripPlan`, JSON.stringify(tripPlan));

    planResult.innerHTML = `
      <h2>Suggested focus</h2>
      <p>Hello, ${travelerName || `traveler`}.</p>
      <p>Your selected season is <strong>${season}</strong>.</p>
      <p>Your main interest is <strong>${interest}</strong>.</p>
      <p>Activities: <strong>${activities.length ? activities.join(`, `) : `none selected`}</strong>.</p>
      <p>${recommendation}</p>
    `;

    tripForm.reset();
  });
}

setupMenu();
setFooterData();
updateFavoriteCount();
renderFeatured();
renderDestinations(`all`);
setupFilters();
setupTripForm();