export class Weather {
  #conditions;
  #address;
  #tempCelcius;
  #tempFarheneit;
  #humidity;
  #rain;
  #wind;
  #unit;

  constructor(
    conditions,
    address,
    tempCelcius,
    humidity,
    rain,
    wind,
    unit = "C"
  ) {
    this.#conditions = conditions;
    this.#address = address;
    this.#tempCelcius = tempCelcius;
    this.#humidity = humidity;
    this.#rain = rain;
    this.#wind = wind;
    this.#unit = unit;
    this.#tempFarheneit = ((this.#tempCelcius * 9) / 5 + 32).toFixed(2);
  }

  set tempCelcius(tempCelcius) {
    this.#tempCelcius = tempCelcius;
  }

  set wind(wind) {
    this.#wind = wind;
  }

  set humidity(humidity) {
    this.#humidity = humidity;
  }

  set address(address) {
    this.#address = address;
  }

  set conditions(conditions) {
    this.#conditions = conditions;
  }

  set rain(rain) {
    this.#rain = rain;
  }

  set unit(unit) {
    this.#unit = unit;
  }

  get humidity() {
    return this.#humidity;
  }

  get conditions() {
    return this.#conditions;
  }

  get address() {
    return this.#address;
  }

  get tempCelcius() {
    return this.#tempCelcius;
  }

  get rain() {
    return this.#rain;
  }

  get wind() {
    return this.#wind;
  }

  get tempFarhenheit() {
    return this.#tempFarheneit;
  }

  get unit() {
    return this.#unit;
  }
}
