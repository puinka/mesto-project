export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderer = renderer; // записываем renderer в this
    // ...
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }
}
