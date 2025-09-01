class Segment {
  /**
   * create a new segment
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this._onClick = () => {};
    this._initHtml();
  }

  _initHtml() {
    this._html = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this._html.classList.add("stroke");
    this._html.setAttribute("x1", this.x1);
    this._html.setAttribute("y1", this.y1);
    this._html.setAttribute("x2", this.x2);
    this._html.setAttribute("y2", this.y2);
    this._html.addEventListener("click", (ev) => {
      this._onClick && this._onClick(ev, this);
    });
    this.disablePointerEvents();
  }

  get html() {
    return this._html;
  }

  /**
   * @param {(ev, segment: Segment) => void} callback
   */
  set onClick(callback) {
    this._onClick = callback;
  }

  distance() {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  updateP1(x, y) {
    this.x1 = x;
    this.y1 = y;
    this._html.setAttribute("x1", x);
    this._html.setAttribute("y1", y);
  }

  updateP2(x, y) {
    this.x2 = x;
    this.y2 = y;
    this._html.setAttribute("x2", x);
    this._html.setAttribute("y2", y);
  }

  disablePointerEvents() {
    this._html.classList.add("disable-pointer-events");
  }

  enablePointerEvents() {
    this._html.classList.remove("disable-pointer-events");
  }

  destroy() {
    this._html.parentElement.removeChild(this._html);
  }
}
