class SearchboxView {
  _element = document.querySelector('.searchbox-searching-bar');

  constructor() {}

  getQuery() {
    const query = this._element.value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._element.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        handler();
      }
    });
  }

  _clearInput() {
    this._element.value = '';
  }
}

export default new SearchboxView();
