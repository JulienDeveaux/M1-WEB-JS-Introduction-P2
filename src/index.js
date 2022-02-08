export const version = () => '1.0.0';

const myEnum = [
  'TEMPERATURE',
  'HUMIDITY',
  'LIGHT',
  'SWITCH',
  'DOOR'
];

export class Sensor {
  #id;
  #name;

  constructor(id = 0, name = "new Sensor") {
    this.#id = id;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  set id(id) {
    if(typeof id !== "number") {
      throw new Error("id must be a number");
    }
    if(id < 0) {
      throw new Error("id must be positive");
    }
    this.#id = id;
  }

  set name(name) {
    if(typeof name !== "string") {
      throw new Error("name must ba a string");
    }
    this.#name = name;
  }
}

export class Data {

}

export class TimeSeries extends Data {
  #values;
  #labels;

  constructor() {
    super();
    this.#labels = [];
    this.#values = [];
  }


  get values() {
    return this.#values;
  }

  get labels() {
    return this.#labels;
  }

  get lastValue() {
    return [this.#values[this.#values.length-1], this.#labels[this.#labels.length-1]];
  }

  addEntry(value, label) {
    if(typeof value !== "number") {
      throw new Error("Value must be a number");
    }
    if(typeof label !== "string") {
      throw new Error("label must be a string");
    }
    this.#values.push(value);
    this.#labels.push(label);
  }
}

export class Datnum extends Data {

}
