const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

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