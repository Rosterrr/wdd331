// Display current year in the footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Display the date the document was last modified
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;