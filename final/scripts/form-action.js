const formResults = document.querySelector("#form-results");
const params = new URLSearchParams(window.location.search);

function formatKey(key) {
    return key
        .replaceAll("-", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function displayFormData() {
    const entries = [...params.entries()];

    if (entries.length === 0) {
        formResults.innerHTML = "<p>No form information was received.</p>";
        return;
    }

    const grouped = entries.reduce((result, [key, value]) => {
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(value);
        return result;
    }, {});

    formResults.innerHTML = `
        <dl class="results-list">
            ${Object.entries(grouped)
                .map(([key, values]) => `
                    <dt>${formatKey(key)}</dt>
                    <dd>${values.join(", ")}</dd>
                `)
                .join("")}
        </dl>
    `;
}

displayFormData();
