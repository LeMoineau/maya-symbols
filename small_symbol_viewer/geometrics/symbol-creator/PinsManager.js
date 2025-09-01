class PinsManager {
  /**
   * create a pins manager
   *
   * @param {{
   * parentElement: HTMLElement
   * }} props
   * @param parentElement specified the div container where will be append the pins canvas
   */
  constructor({ parentElement }) {
    this._pins = [];
    this._parentElement = parentElement;
    this._init();
  }

  _init() {
    this._createPinsCanvas();
    this._createPins();
  }

  _createPinsCanvas() {
    this._pinsCanvas = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this._pinsCanvas.setAttribute("viewBox", `0 0 10 5`);
    this._pinsCanvas.classList.add("canvas");
    this._pinsCanvas.classList.add("pins-canvas");
    this._parentElement.appendChild(this._pinsCanvas);
  }

  _createPins() {
    const pinsPts = [
      `0.5,0.5 -0.5,3.5 3,3.5 3,0.5`,
      `3.7,0.5 6.3,0.5 6.5,3.5 3.5,3.5`,
      `7,0.5 7,3.5 10.5,3.5 9.5,0.5`,
    ];
    for (let p of pinsPts) {
      this._pins.push(
        new Pins({
          points: p,
          afterHtmlCreated: (html) => {
            this._pinsCanvas.appendChild(html);
          },
        })
      );
    }
  }

  get pinsNumber() {
    return parseInt(
      this._pins.map((p) => (p.isActivated() ? "1" : "0")).join(""),
      2
    );
  }
}
