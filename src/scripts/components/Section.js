//Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Вы получаете эти данные от Api. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.

//Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.

export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector('containerSelector');
  }

  //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.

  renderItems() {
    this._data.forEach((item) => {
      console.log('render item', item)
      this.addItem(item);
    });
  }

  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  // addItem(item) {
  //   const element = this._renderer(item);
  //   this._container.prepend(element);
  // }

  //сделал реализацию, как в тренажере
  //тут просто добавляем карточку, а сам метод вызываем при вызове класса в index.js
  addItem(element) {
    console.log('add item', element)
    this._container.prepend(element);

  }

}

export {Section};