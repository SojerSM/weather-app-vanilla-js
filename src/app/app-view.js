class AppView {
  _parentElement = document.querySelector('.spinner');
  _appContainerElement = document.querySelector('.app-container');

  renderSpinner() {
    const spinnerMarkup = `
    <span class="loader"></span>`;
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  _clearView() {
    this._parentElement.innerHTML = '';
  }

  displayAppContainer() {
    this._appContainerElement.classList.remove('hidden');
  }
}

export default new AppView();
