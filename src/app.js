import { Weather } from "./models/Weather";
import { WeatherAPI } from "./models/WeatherAPI";

export class App {
  init() {
    const weatherAPI = new WeatherAPI("Wavre");
    weatherAPI.constructWeatherObject().then((weatherConstruct) => {
      const weather = weatherConstruct;
      console.log(weather);
    });
  }
}
