const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const weatherCurrent = document.querySelector("#weather-current");
const forecastContainer = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlight-container");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  if (navigation.classList.contains("open")) {
    menuButton.textContent = "X";
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// Weather API
const latitude = 13.6731;
const longitude = -89.2408;
const apiKey = "4e0ce3799d8c96362cdf135e396d3a74";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const currentResponse = await fetch(currentWeatherUrl);
    const forecastResponse = await fetch(forecastUrl);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data could not be loaded.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    weatherCurrent.innerHTML = "<p>Weather information is currently unavailable.</p>";
    forecastContainer.innerHTML = "";
    console.error(error);
  }
}

function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;

  weatherCurrent.innerHTML = `
    <p><strong>Current Temperature:</strong> ${temperature}&deg;C</p>
    <p><strong>Condition:</strong> ${description}</p>
  `;
}

function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const temperature = Math.round(day.main.temp);

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    forecastCard.innerHTML = `
      <p><strong>${dayName}</strong></p>
      <p>${temperature}&deg;C</p>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}

// Member Spotlights
async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Member data could not be loaded.");
    }

    const data = await response.json();

    const qualifiedMembers = data.members.filter(member => {
      return member.membershipLevel === 2 || member.membershipLevel === 3;
    });

    const randomSpotlights = qualifiedMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    displaySpotlights(randomSpotlights);
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Member spotlights are currently unavailable.</p>";
    console.error(error);
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>Membership:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 3) {
    return "Gold";
  }

  if (level === 2) {
    return "Silver";
  }

  return "Member";

}
getWeather();
getSpotlights();
