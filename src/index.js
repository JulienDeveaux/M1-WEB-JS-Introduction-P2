export const version = () => '1.0.0';

const myEnum = [
  'THIS',
  'THAT',
  'OTHER'
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
