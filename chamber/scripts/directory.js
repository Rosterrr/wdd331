const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

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

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load members data.");
    }

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    membersContainer.innerHTML = `<p>There was a problem loading the member directory.</p>`;
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>${member.description}</p>
      <span class="member-level">${getMembershipLevel(member.membershipLevel)}</span>
    `;

    membersContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 3) {
    return "Gold Member";
  }

  if (level === 2) {
    return "Silver Member";
  }

  return "Member";
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");

  gridButton.classList.add("active-view");
  listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");

  listButton.classList.add("active-view");
  gridButton.classList.remove("active-view");
});

getMembers();