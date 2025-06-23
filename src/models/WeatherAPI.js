import { Weather } from "./Weather";

export class WeatherAPI {
  #location;
  constructor(location) {
    this.#location = location;
  }

  async #getWeatherData() {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
          this.#location
        }?unitGroup=metric&key=USDLVLBR4BUNM5GDZ8ZVXDDBS`,
        {
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error("g");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  #processWeatherData(data) {
    return {
      conditions: data.currentConditions.conditions,
      address: data.resolvedAddress,
      tempCelcius: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      rain: data.currentConditions.precip,
      wind: data.currentConditions.windspeed,
    };
  }

  async constructWeatherObject() {
    try {
      const data = await this.#getWeatherData(this.#location);
      if (!data || !data.currentConditions) {
        throw new Error("Failed to retrieve valid weather Data");
      }
      const dataObject = this.#processWeatherData(data);
      const weather = new Weather(
        dataObject.conditions,
        dataObject.address,
        dataObject.tempCelcius,
        dataObject.humidity,
        dataObject.rain,
        dataObject.wind
      );
      return weather;
    } catch (err) {
      throw err;
    }
  }
}
