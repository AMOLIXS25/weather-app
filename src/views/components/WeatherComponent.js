import { WeatherAPI } from "../../models/WeatherAPI";
import { CelciusFarenheitToggleButton } from "./CelciusFarenheitToggleButton";
import { SearchLocationBar } from "./SearchLocationBar";

export class WeatherComponent {
  #tempTitle;
  #addressText;
  #conditionsText;
  #weatherStatsComponentsContainer;
  #weatherComponentContainer;
  #weather;
  #rootElement;
  constructor(location, rootElement) {
    this.#rootElement = rootElement;
    const weatherAPI = new WeatherAPI(location);
    weatherAPI
      .constructWeatherObject()
      .then((weatherConstruct) => {
        const weather = weatherConstruct;
        this.#weather = weather;
        this.#init();
      })
      .catch((err) => {
        this.#handleWeatherError(rootElement, err);
      });
  }

  async #init(rootElement = document.querySelector("#root")) {
    this.#weatherStatsComponentsContainer = document.createElement("div");
    this.#weatherStatsComponentsContainer.classList.add(
      "weather-stats-components-container"
    );
    this.#weatherComponentContainer = document.createElement("div");
    this.#weatherComponentContainer.classList.add(
      "weather-component-container"
    );
    this.#tempTitle = document.createElement("h1");
    this.#tempTitle.classList.add("title-temp");
    this.#tempTitle.textContent = `${this.#weather.tempCelcius}°C`;
    this.#addressText = document.createElement("p");
    this.#addressText.textContent = this.#weather.address;
    this.#conditionsText = document.createElement("p");
    this.#conditionsText.textContent = this.#weather.conditions;
    await this.#initConditionsImage(this.#weatherComponentContainer);
    this.#weatherComponentContainer.appendChild(this.#tempTitle);
    this.celciusFarenheitToggleButton = new CelciusFarenheitToggleButton(
      this.#weatherComponentContainer
    );
    this.celciusFarenheitToggleButton.toggleHandler(
      this.#changeTempUnit.bind(this)
    );
    this.searchLocationBar = new SearchLocationBar(
      this.#weatherComponentContainer
    );
    this.searchLocationBar.pressEnterHandler(this.#searchLocation.bind(this));
    this.#weatherComponentContainer.appendChild(this.#addressText);
    this.#weatherComponentContainer.appendChild(this.#conditionsText);
    this.#weatherComponentContainer.appendChild(
      this.#weatherStatsComponentsContainer
    );
    const weatherStatsComponentWind = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-wind",
      `${this.#weather.wind}km/h`,
      "Wind"
    );
    const weatherStatsComponentWater = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-droplet",
      `${this.#weather.humidity}%`,
      "Humidity",
      "#74C0FC"
    );
    const weatherStatsComponentEarth = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-water",
      `${this.#weather.rain}%`,
      "Rain"
    );
    rootElement.appendChild(this.#weatherComponentContainer);
  }

  async #update() {
    this.#clear();
    this.#tempTitle = document.createElement("h1");
    this.#tempTitle.classList.add("title-temp");
    this.#tempTitle.textContent = `${this.#weather.tempCelcius}°C`;
    this.#addressText = document.createElement("p");
    this.#addressText.textContent = this.#weather.address;
    this.#conditionsText = document.createElement("p");
    this.#conditionsText.textContent = this.#weather.conditions;
    await this.#initConditionsImage(this.#weatherComponentContainer);
    this.#weatherComponentContainer.appendChild(this.#tempTitle);
    this.celciusFarenheitToggleButton = new CelciusFarenheitToggleButton(
      this.#weatherComponentContainer
    );
    this.celciusFarenheitToggleButton.toggleHandler(
      this.#changeTempUnit.bind(this)
    );
    this.searchLocationBar = new SearchLocationBar(
      this.#weatherComponentContainer
    );
    this.searchLocationBar.pressEnterHandler(this.#searchLocation.bind(this));
    this.#weatherComponentContainer.appendChild(this.#addressText);
    this.#weatherComponentContainer.appendChild(this.#conditionsText);
    this.#weatherComponentContainer.appendChild(
      this.#weatherStatsComponentsContainer
    );
    const weatherStatsComponentWind = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-wind",
      `${this.#weather.wind}km/h`,
      "Wind"
    );
    const weatherStatsComponentWater = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-droplet",
      `${this.#weather.humidity}%`,
      "Humidity",
      "#74C0FC"
    );
    const weatherStatsComponentEarth = new WeatherStatsComponent(
      this.#weatherStatsComponentsContainer,
      "fa-solid fa-water",
      `${this.#weather.rain}%`,
      "Rain"
    );
  }

  #clear() {
    this.#weatherComponentContainer.innerHTML = "";
    this.#weatherStatsComponentsContainer.innerHTML = "";
  }

  async #initConditionsImage(weatherComponentContainer) {
    try {
      const conditionsImage = document.createElement("img");
      let conditionsImageSrc = null;
      if (this.#weather.conditions == "Partially cloudy") {
        conditionsImageSrc = await import(
          "../../assets/images/partially-sunny.png"
        );
      } else if (this.#weather.conditions == "Overcast") {
        conditionsImageSrc = await import("../../assets/images/overcast.png");
      } else if (this.#weather.conditions == "Clear") {
        conditionsImageSrc = await import("../../assets/images/clear.png");
      }
      conditionsImage.src = conditionsImageSrc.default;
      weatherComponentContainer.appendChild(conditionsImage);
    } catch (err) {
      console.log(err);
    }
  }

  get tempTitle() {
    return this.#tempTitle;
  }

  #changeTempUnit() {
    if (this.#weather.unit == "C") {
      this.celciusFarenheitToggleButton.toggleButton.innerHTML =
        "°C /<strong>°F</strong>";
      this.#tempTitle.textContent = `${this.#weather.tempFarhenheit}°F`;
      this.weather.unit = "F";
      this;
    } else {
      this.#tempTitle.textContent = `${this.#weather.tempCelcius}°C`;
      this.weather.unit = "C";
      this.celciusFarenheitToggleButton.toggleButton.innerHTML =
        "<strong>°C</strong> /°F";
    }
  }

  #searchLocation(event) {
    if (event.key === "Enter") {
      const weatherAPI = new WeatherAPI(
        this.searchLocationBar.inputSearchLocation.value
      );
      weatherAPI
        .constructWeatherObject()
        .then((weatherConstruct) => {
          const weather = weatherConstruct;
          this.#weather = weather;
          this.#update();
        })
        .catch((err) => {
          this.#weatherComponentContainer.textContent = err;
        });
    }
  }

  #handleWeatherError(rootElement, errorMessage) {
    const error = document.createElement("h2");
    error.textContent = errorMessage;
    rootElement.appendChild(error);
  }

  get weather() {
    return this.#weather;
  }
}

export class WeatherStatsComponent {
  #statsText;
  #descriptionStatsText;
  #descriptionStats;
  #icon;
  #iconColor;
  #iconClass;
  #weatherStatsComponentContainer;

  constructor(
    rootElement,
    iconClass,
    stats,
    descriptionStats,
    iconColor = "#000"
  ) {
    this.#iconClass = iconClass;
    this.stats = stats;
    this.#descriptionStats = descriptionStats;
    this.#iconColor = iconColor;
    this.#init(rootElement);
  }

  #init(rootElement = document.querySelector("#root")) {
    this.#statsText = document.createElement("p");
    this.#descriptionStatsText = document.createElement("p");
    this.#descriptionStatsText.textContent = this.#descriptionStats;
    this.#weatherStatsComponentContainer = document.createElement("div");
    this.#weatherStatsComponentContainer.classList.add(
      "weather-stats-component-container"
    );

    this.#icon = document.createElement("i");
    this.#icon.className = this.#iconClass;
    this.#icon.style.color = this.#iconColor;
    this.#statsText.textContent = this.stats;
    rootElement.appendChild(this.#weatherStatsComponentContainer);
    this.#weatherStatsComponentContainer.appendChild(this.#icon);
    this.#weatherStatsComponentContainer.appendChild(this.#statsText);
    this.#weatherStatsComponentContainer.appendChild(
      this.#descriptionStatsText
    );
  }
}
