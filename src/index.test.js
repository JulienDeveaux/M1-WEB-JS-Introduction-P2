const fs = require('fs').promises;

import {Sensor, version} from '.';

let data;
beforeAll(async () => {
  data = await fs.readFile('./resources/sensors_data.json', {
    encoding: 'utf8',
  });
  data = JSON.parse(data);
});

describe('Sensor model tests', () => {
  describe('Dummy tests', () => {
    test('data is loaded with 3 elements', () => {
      expect(data.length).toBe(3);
    });
    test('version number from the model', () => {
      expect(version()).toBe('1.0.0');
    });
  });

  describe('Sensor class tests', () => {
    test('constructor', () => {
      let s = new Sensor();
      expect(s).toBeDefined();
      expect(Object.getPrototypeOf(s)).toBe(Sensor.prototype);
    });

    test('id write with positive number', () => {
      let s = new Sensor();
      s.id = 10;
      expect(s.id).toBe(10);
    });

    test('id not a number', () => {
      let s = new Sensor();
      expect(() => (s.id = "myId")).toThrow();
    });

    test('negative id', () => {
      let s = new Sensor();
      expect(() => (s.id = -1)).toThrow();
    });

    test('name write with a valid string', () => {
      let s = new Sensor();
      s.name = "MyName";
      expect(s.name).toBe("MyName");
    });

    test('name not a string', () => {
      let s = new Sensor();
      expect(() => (s.name = 0)).toThrow();
    });
  });
});
