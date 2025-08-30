class Segment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1;
    this.y2 = y2;
    this._initHtml();
  }

  _initHtml() {
    this._html = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this._html.classList.add("stroke");
    this._html.setAttribute("x1", this.x1);
    this._html.setAttribute("y1", this.y1);
    this._html.setAttribute("x2", this.x2);
    this._html.setAttribute("y2", this.y2);
  }

  get html() {
    return this._html;
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

  disablePointersEvents() {
    this._html.classList.add("disable-pointers-events");
  }

  destroy() {
    this._html.parentElement.removeChild(this._html);
  }
}
