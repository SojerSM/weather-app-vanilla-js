class SearchboxView {
  _searchingElement = document.querySelector('.searchbox-searching-bar');
  _locationElement = document.querySelector('.current-location');

  getQuery() {
    const query = this._searchingElement.value;
    this._clearInput();
    return query;
  }

  updateLocationWrapper(city, country) {
    this._locationElement.textContent = `${city}, ${country}`;
  }

  addHandlerSearch(handler) {
    this._searchingElement.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        handler();
      }
    });
  }

  _clearInput() {
    this._searchingElement.value = '';
  }
}

export default new SearchboxView();
