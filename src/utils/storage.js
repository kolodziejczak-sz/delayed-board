export class Storage {

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static has(key) {
    return (localStorage.getItem(key) !== null);
  }

  static delete(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}