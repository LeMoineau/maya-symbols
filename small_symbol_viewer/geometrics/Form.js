class Form {
  /**
   * create a form from a string of points ("0,0 0,5 5,5 5,0") or a list of Point
   *
   * when onClick is precised, if parentElement is not set, click handler will
   * be append to the first form stroke parent element
   *
   * @param {{
   * points?: string | Point[],
   * afterHtmlCreated?: (html) => void,
   * onClick?: (ev, form: Form) => void,
   * parentElement?: HTMLElement
   * }} props
   */
  constructor({ points, afterHtmlCreated, onClick, parentElement }) {
    this.strokes = [];
    this._afterHtmlCreated = afterHtmlCreated;
    this._points = points
      ? Array.isArray(points)
        ? points.map((p) => `${p.x},${p.y}`).join(" ")
        : points
      : "";
    this._createFormFromString(this._points);
    this._parentElement = parentElement;
    this._onClick = onClick;
    this._createFormContent();
  }

  _createFormFromString(pts) {
    const splittedpts = pts.split(" ");
    for (let i = 0; i < splittedpts.length; i++) {
      const line = new Segment(
        splittedpts[i].split(",")[0],
        splittedpts[i].split(",")[1],
        splittedpts[(i + 1) % splittedpts.length].split(",")[0],
        splittedpts[(i + 1) % splittedpts.length].split(",")[1]
      );
      this._afterHtmlCreated && this._afterHtmlCreated(line.html);
      this.strokes.push(line);
    }
  }

  /**
   * create a polygon which will handle the use click
   */
  _createFormContent() {
    if (!this._parentElement && this.strokes.length === 0) return;
    this._formContent = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    this._formContent.setAttribute("points", this._points);
    this._formContent.style.fill = "transparent";
    if (this._onClick) {
      this._formContent.addEventListener("click", (ev) => {
        this._onClick(ev, this);
      });
    }
    (this._parentElement ?? this.strokes[0].html.parentElement).appendChild(
      this._formContent
    );
  }

  /**
   * apply a callback on every strokes of the form
   * @param {() => void} callback
   */
  applyOnEveryStrokes(callback) {
    for (let s of this.strokes) {
      callback(s);
    }
  }

  isFilled() {
    return this._formContent.style.fill !== "transparent";
  }

  fill(color) {
    this._formContent.style.fill = color;
  }

  emptyContent() {
    this._formContent.style.fill = "transparent";
  }
}
