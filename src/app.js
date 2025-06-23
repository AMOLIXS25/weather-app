import { WeatherComponent } from "./views/components/WeatherComponent";

export class App {
  async mountApp(rootElement = document.querySelector("#root")) {
    let data = null;
    try {
      const response = await fetch("http://ip-api.com/json/");
      data = await response.json();
    } catch (err) {
      console.log(err);
    }

    const weatherComponent = new WeatherComponent(
      data ? data.city : "Wavre",
      rootElement
    );
  }
}
