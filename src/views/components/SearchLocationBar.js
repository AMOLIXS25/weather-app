export class SearchLocationBar {
  #inputSearchLocation;
  constructor(rootElement) {
    this.#init(rootElement);
  }

  #init(rootElement) {
    this.#inputSearchLocation = document.createElement("input");
    this.#inputSearchLocation.classList.add("search-location-bar");
    rootElement.appendChild(this.#inputSearchLocation);
  }

  pressEnterHandler(handler) {
    this.#inputSearchLocation.addEventListener("keypress", handler);
  }

  get inputSearchLocation() {
    return this.#inputSearchLocation;
  }
}
