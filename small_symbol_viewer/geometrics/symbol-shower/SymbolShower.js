class SymbolShower {
  /**
   * create a new symbol shower
   * @param {{
   * points: string[]
   * containerId: string
   * options?: {
   *    width?: number,
   *    height?: number,
   *    x?: number,
   *    y?: number
   * }
   * }} props
   * @param points list of form points
   */
  constructor({ points, containerId, options }) {
    this._points = points;
    this._container = document.getElementById(containerId);
    this.forms = [];
    this.options = options;
    this._init();
  }

  _init() {
    this._createCanvas();
    this._createForms();
    this._initCanvasViewPort();
  }

  _createCanvas() {
    this._canvas = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this._canvas.classList.add("canvas");
    this._container.appendChild(this._canvas);
  }

  _initCanvasViewPort() {
    let maxWidth = 0;
    let maxHeight = 0;
    for (let f of this.forms) {
      for (let segment of f.strokes) {
        const currentMaxX = Math.max(segment.x1, segment.x2);
        const currentMaxY = Math.max(segment.y1, segment.y2);
        if (currentMaxX > maxWidth) maxWidth = currentMaxX;
        if (currentMaxY > maxHeight) maxHeight = currentMaxY;
      }
    }
    this._canvas.setAttribute(
      "viewBox",
      `${(this.options && this.options.x) ?? -1} ${
        (this.options && this.options.x) ?? -1
      } ${((this.options && this.options.width) ?? maxWidth) + 2} ${
        ((this.options && this.options.height) ?? maxHeight) + 2
      }`
    );
  }

  _createForms() {
    for (let f of this._points) {
      this.forms.push(
        new Form({
          points: f,
          afterHtmlCreated: (html) => {
            this._canvas.appendChild(html);
          },
        })
      );
    }
  }
}
