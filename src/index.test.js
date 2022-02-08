const fs = require('fs').promises;

import {Datnum, Door, Enumeration, Fan, Humidity, Light, Sensor, Switch, Temperature, TimeSeries, version} from '.';

let myEnum = new Enumeration(['TEMPERATURE', 'HUMIDITY', 'LIGHT', 'SWITCH', 'DOOR', 'FAN_SPEED']);

let data;
beforeAll(async () => {
  data = await fs.readFile('./resources/sensors_data.json', {
    encoding: 'utf8',
  });
  data = JSON.parse(data);
});

describe('Sensor model tests', () => {
  describe('real sensor usage tests', () => {
    test('instancing the json file', () => {
      for(let i = 0; i < data.length; i++) {
        let sensor = new Sensor(data[i].type, data[i].id, data[i].name).getSensor();

        if(data[i].data.value === undefined) {
          for(let j = 0; j < data[i].data.values.length; j++) {
            sensor.addEntry(data[i].data.values[j], data[i].data.labels[j]);
          }
        } else {
          sensor.singleValue(data[i].data.value);
        }
        expect(sensor).toBeDefined();
      }
    });
  });


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
    test('Creating a temperature sensor', () => {
      let s = new Sensor(myEnum.TEMPERATURE);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Temperature.prototype);
    });
    test('add entry to temp', () => {
      let s = new Sensor(myEnum.TEMPERATURE);
      let t = s.getSensor();
      t.addEntry(20, "name");
      expect(t.labels()).toStrictEqual(["name"]);
      expect(t.values()).toStrictEqual([20]);
      expect(t.lastValue()).toStrictEqual([20, "name"]);
    });
    test('Creating a humidity sensor', () => {
      let s = new Sensor(myEnum.HUMIDITY);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Humidity.prototype);
    });
    test('add entry to humidity', () => {
      let s = new Sensor(myEnum.HUMIDITY);
      let t = s.getSensor();
      t.addEntry(20, "name");
      expect(t.labels()).toStrictEqual(["name"]);
      expect(t.values()).toStrictEqual([20]);
      expect(t.lastValue()).toStrictEqual([20, "name"]);
    });
    test('Creating a light sensor', () => {
      let s = new Sensor(myEnum.LIGHT);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Light.prototype);
    });
    test('add entry to light', () => {
      let s = new Sensor(myEnum.LIGHT);
      let t = s.getSensor();
      t.addEntry(20, "name");
      expect(t.labels()).toStrictEqual(["name"]);
      expect(t.values()).toStrictEqual([20]);
      expect(t.lastValue()).toStrictEqual([20, "name"]);
    });
    test('Creating a fan sensor', () => {
      let s = new Sensor(myEnum.FAN_SPEED);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Fan.prototype);
    });
    test('add entry to fan', () => {
      let s = new Sensor(myEnum.FAN_SPEED);
      let t = s.getSensor();
      t.addEntry(20, "name");
      expect(t.labels()).toStrictEqual(["name"]);
      expect(t.values()).toStrictEqual([20]);
      expect(t.lastValue()).toStrictEqual([20, "name"]);
    });
    test('Creating a switch sensor', () => {
      let s = new Sensor(myEnum.SWITCH);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Switch.prototype);
    });
    test('add entry to switch', () => {
      let s = new Sensor(myEnum.SWITCH);
      let t = s.getSensor();
      t.singleValue(50);
      expect(t.getSingleValue()).toBe(50);
    });
    test('Creating a door sensor', () => {
      let s = new Sensor(myEnum.DOOR);
      let t = s.getSensor();
      expect(Object.getPrototypeOf(t)).toBe(Door.prototype);
    });
    test('add entry to door', () => {
      let s = new Sensor(myEnum.DOOR);
      let t = s.getSensor();
      t.singleValue(50);
      expect(t.getSingleValue()).toBe(50);
    });
  });

  describe('Data classes tests', () => {
    test('constructor', () => {
      let t = new TimeSeries();
      expect(t).toBeDefined();
      expect(Object.getPrototypeOf(t)).toBe(TimeSeries.prototype);
    });
    test('adding a value with label', () => {
      let t = new TimeSeries();
      t.addEntry(10, "label");
      expect(t.lastValue).toStrictEqual([10, "label"]);
      expect(t.values).toStrictEqual([10]);
      expect(t.labels).toStrictEqual(["label"]);
    });
    test('adding a wrong value with label', () => {
      let t = new TimeSeries();
      expect(() => t.addEntry("10", "label")).toThrow();
    });
    test('adding a value with wrong label', () => {
      let t = new TimeSeries();
      expect(() => t.addEntry(10, 10)).toThrow();
    });
    test('adding a wrong value with wrong label', () => {
      let t = new TimeSeries();
      expect(() => t.addEntry("label", 10)).toThrow();
    });
    test('adding a value', () => {
      let d = new Datnum();
      d.singlevalue = 5;
      expect(d.singlevalue).toBe(5);
    });
    test('adding a wrong value', () => {
      let d = new Datnum();
      expect(() => d.singlevalue = "test").toThrow();
    });
  });
});
