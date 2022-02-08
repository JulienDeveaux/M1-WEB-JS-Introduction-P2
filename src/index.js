export const version = () => '1.0.0';

export const Enumeration = function (keys) {
  const enumeration = Object.create(null);
  for (const key of keys) {
    enumeration[key] = key;
  }
  enumeration[Symbol.iterator] = function* () {
    for (const key of keys) {
      yield enumeration[key];
    }
  };
  Object.freeze(enumeration);
  return enumeration;
};

let myEnum = new Enumeration(['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'SWITCH', 'DOOR']);


export class Sensor {
  #id;
  #name;
  #data;
  #type;

  constructor(type, id = 0, name = "new Sensor") {
    this.#id = id;
    this.#name = name;
    this.#type = type;
    this.#data = new TimeSeries();
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

  getSensor() {
    switch (this.#type) {
      case myEnum.TEMPERATURE : return new Temperature();
      case myEnum.HUMIDITY : return new Humidity();
      case myEnum.LIGHT : return new Light();
      case myEnum.SWITCH : return new Switch();
      case myEnum.DOOR : return new Door();
    }
  }

  addEntry(value, label) {
    this.#data.addEntry(value, label);
  }

  labels() {
    return this.#data.labels;
  }

  values() {
    return this.#data.values;
  }

  lastValue() {
    return this.#data.lastValue;
  }
}

export class Temperature extends Sensor {
  constructor() {
    super();
  }

  addEntry(value, label) {
    super.addEntry(value, label);
  }

  labels() {
    return super.labels();
  }

  values() {
    return super.values();
  }

  lastValue() {
    return super.lastValue();
  }
}
export class Humidity extends Sensor {

}
export class Light extends Sensor {

}
export class Switch extends Sensor {

}
export class Door extends Sensor {

}

export class Data {}

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
  #Singlevalue;

  constructor() {
    super();
    this.#Singlevalue = 0;
  }

  set Singlevalue(value) {
    if(typeof value !== "number") {
      throw new Error("value must be a number");
    }
    this.#Singlevalue = value;
  }

  get Singlevalue() {
    return this.#Singlevalue;
  }
}
