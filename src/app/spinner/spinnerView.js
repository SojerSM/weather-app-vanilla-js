class AppView {
  _parentElement = document.querySelector('.spinner');
  _appContainerElement = document.querySelector('.app-container');

  renderSpinner() {
    const spinnerMarkup = `
    <span class="loader"></span>
    <p class="spinner-text">Loading your location...</p>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  _clearView() {
    this._parentElement.innerHTML = '';
  }

  displayAppContainer() {
    this._parentElement.innerHTML = '';
    this._appContainerElement.classList.remove('hidden');
  }
}

export default new AppView();
