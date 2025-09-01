class Pins {
  constructor({ points, afterHtmlCreated }) {
    this._form = new Form({
      points,
      afterHtmlCreated: (html) => {
        html.classList.add("pins-stroke");
        afterHtmlCreated && afterHtmlCreated(html);
      },
      onClick: () => {
        this.isActivated() ? this.desactivate() : this.activate();
      },
    });
  }

  isActivated() {
    return this._form.isFilled();
  }

  activate() {
    this._form.fill("var(--pins-color)");
  }

  desactivate() {
    this._form.fill("transparent");
  }
}
