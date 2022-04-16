//DOM elements
const linksSection = document.querySelector(".links");
const errorMessage = document.querySelector(".error-message");
const newLinkForm = document.querySelector(".new-link-form");
const newLinkUrl = document.querySelector(".new-link-url");
const newLinkButton = document.querySelector(".new-link-button");
const clearStorageButton = document.querySelector(".clear-storage");

//DOM APIs

const parser = new DOMParser();


const parserResponse = (text) => {
  return parser.parseFromString(text, "text/html");
};

const findTitle = (nodes) => {
  return nodes.querySelector("title").innerText;
};
const storeLink = (title, url) => {
  localStorage.setItem(url, JSON.stringify({ title, url }));
};
const getLinks = () => {
  return Object.keys(localStorage).map((key) => JSON.parse(localStorage[key]));
};

const createLinkElement = (link) => {
  return `
    <div>
        <h3>${link.title}</h3>
        <p>
            <a href="${link.url}">${link.url}</a>
        </p>
    </div>`;
};
const rederLinks = () => {
  const linksElements = getLinks().map(createLinkElement).join("");
  linksSection.innerHTML = linksElements;
};
const clearForm = () => {
  newLinkUrl.value = null;
};
const handleError = (error, url) => {
  errorMessage.innerHTML = `
        There was an issues adding "${url}": ${error.message}
        `.trim();
  setTimeout(() => {
    errorMessage.innerHTML = null;
  }, 5000);
};
//events
rederLinks();

newLinkUrl.addEventListener("keyup", () => {
  newLinkButton.disabled = !newLinkUrl.validity.valid;
});
newLinkForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = newLinkUrl.value;
  try {
    const response = await fetch(url);
    const text = await response.text();
    const html = parserResponse(text);
    const title = findTitle(html);
    storeLink(title, url);
    rederLinks();
    clearForm();
  } catch (e) {
    handleError(e, url);
  }
});

clearStorageButton.addEventListener("click", () => {
  localStorage.clear();
  linksSection.innerHTML = "";
});