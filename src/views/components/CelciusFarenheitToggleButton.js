export class CelciusFarenheitToggleButton {
  #toggleButton;
  constructor(rootElement = document.querySelector("#root")) {
    this.#init(rootElement);
  }

  #init(rootElement) {
    this.#toggleButton = document.createElement("button");
    this.#toggleButton.innerHTML = "<strong>°C</strong> / °F";
    this.#toggleButton.classList.add("celcius-farenheit-toggle-button");
    rootElement.appendChild(this.#toggleButton);
  }

  toggleHandler(handler) {
    this.#toggleButton.addEventListener("click", handler);
  }

  get toggleButton() {
    return this.#toggleButton;
  }
}
