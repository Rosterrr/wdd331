// scripts/getdates.js

const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();

const lastModifiedPara = document.querySelector("#lastModified");
lastModifiedPara.innerHTML = `Last Modification: ${document.lastModified}`;