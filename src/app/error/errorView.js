class ErrorView {
  _parentElement = document.querySelector('.error-wrapper');

  renderErrorElement(errorMessage) {
    const markup = `
    <p class="error-description">${errorMessage}</p>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearView() {
    this._parentElement.innerHTML = '';
  }
}

export default new ErrorView();
