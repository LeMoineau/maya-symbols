const SNAP_POINT_SIZE = 0.1;

class SymbolCreator {
  /**
   * create a symbol creator
   *
   * @param {{
   * cols: number,
   * rows: number,
   * containerId?: string,
   * onStrokeClick?: (ev, stroke: Stroke) => void
   * options?: {
   *  dontStopDrawingBetweenStrokes: boolean,
   *  stopDrawAfterCompletingAForm: boolean
   * }
   * }} props
   */
  constructor({ cols, rows, containerId, onStrokeClick, options }) {
    this._div = document.getElementById(containerId ?? "symbol-creator");
    this.cols = cols ?? 5;
    this.rows = rows ?? 5;
    this.snapPoints = [];
    this.drawing = false;
    this._currentDrawing = undefined;
    this.strokes = [];
    this._onStrokeClick = onStrokeClick;
    this.options = options;
    this._init();
  }

  _init() {
    this._createCanvas();
    this._createBackgroundRectangle();
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this._createSnapPoint(x + 0.5, y + 0.5);
      }
    }
    this._createPins();
  }

  _createCanvas() {
    this._canvas = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this._canvas.setAttribute("viewBox", `0 0 ${this.rows} ${this.cols}`);
    this._canvas.classList.add("canvas");
    this._canvas.classList.add("symbol-creator");
    this._canvas.addEventListener("mousemove", (ev) => {
      if (this.drawing) {
        this._updateCurrentDrawingDisplay(ev, this._currentDrawing);
      }
    });
    this._canvas.addEventListener("mousedown", (ev) => {
      if (this.drawing && ev.button === 1) {
        this._cancelDraw();
      }
    });
    this._div.appendChild(this._canvas);
  }

  _createBackgroundRectangle() {
    this._backgroundRect = new Form({
      points: `0.5,0.5 0.5,${this.cols - 0.5} ${this.rows - 0.5},${
        this.cols - 0.5
      } ${this.rows - 0.5},0.5`,
      afterHtmlCreated: (html) => {
        html.classList.add("background-rect");
        this._canvas.appendChild(html);
      },
    });
  }

  _createSnapPoint(x, y) {
    const snapPoint = new SnapPoint({
      x,
      y,
      onClick: (pt) => {
        if (this.drawing) {
          this._finishDraw(pt);
        } else {
          this._startDraw(pt);
        }
      },
    });
    this._canvas.appendChild(snapPoint.html);
    this.snapPoints.push(snapPoint);
  }

  _createPins() {
    this._pinsManager = new PinsManager({ parentElement: this._div });
  }

  get pinsNumber() {
    return this._pinsManager.pinsNumber;
  }

  get numberOfStrokes() {
    return this.strokes.length;
  }

  /**
   * Start a draw by creating a new stroke and activate the current snapPoint
   * @param {SnapPoint} snapPoint starting draw point
   */
  _startDraw(snapPoint) {
    this.drawing = true;
    this._currentDrawing = new Segment(
      snapPoint.x,
      snapPoint.y,
      snapPoint.x,
      snapPoint.y
    );
    this._currentDrawing.onClick = this._onStrokeClick;
    snapPoint.activate();
    if (
      this.options.stopDrawAfterCompletingAForm &&
      !this._startingFormSnapPoint
    ) {
      this._startingFormSnapPoint = snapPoint;
    }
    this._canvas.appendChild(this._currentDrawing.html);
    this._canvas.toUpdateSegment = this._currentDrawing;
  }

  /**
   * update the current drawed segment from cursor position
   */
  _updateCurrentDrawingDisplay(ev, toUpdateSegment) {
    const rect = this._canvas.getBoundingClientRect();
    const scale = rect.width / 100 / Math.max(this.rows, this.cols);

    let offsetX = 0;
    let offsetY = 0;
    if (this.rows > this.cols) {
      offsetY = (this.cols - this.rows) / 2;
    } else {
      offsetX = (this.rows - this.cols) / 2;
    }

    toUpdateSegment.updateP2(
      (ev.clientX - rect.left) / (scale * 100) + offsetX,
      (ev.clientY - rect.top) / (scale * 100) + offsetY
    );
  }

  /**
   * Finish a draw and create a new segment
   */
  _finishDraw(snapPoint) {
    this.drawing = false;
    this._currentDrawing.updateP2(snapPoint.x, snapPoint.y);
    this.strokes.push(this._currentDrawing);
    snapPoint.activate();
    this._currentDrawing = undefined;
    if (this.options.dontStopDrawingBetweenStrokes) {
      if (
        this.options.stopDrawAfterCompletingAForm &&
        this._startingFormSnapPoint &&
        this._startingFormSnapPoint === snapPoint
      ) {
        this._startingFormSnapPoint = undefined;
      } else {
        this._startDraw(snapPoint);
      }
    }
  }

  /**
   * cancel a current drawing (dont create a new segment)
   */
  _cancelDraw() {
    this.drawing = false;
    const startingSnapPoint = this._findSnapPointAt(
      this._currentDrawing.x1,
      this._currentDrawing.y1
    );
    if (
      startingSnapPoint !== undefined &&
      !this._aStrokeIsUsingTheSnapPoint(startingSnapPoint)
    ) {
      startingSnapPoint.desactivate();
    }
    this._currentDrawing.destroy();
    this._currentDrawing = undefined;
    this._startingFormSnapPoint = undefined;
  }

  /**
   * find a snap point from its coordinates
   * @param {number} x
   * @param {number} y
   * @returns {SnapPoint} the found snap point or undefined
   */
  _findSnapPointAt(x, y) {
    return this.snapPoints.find((p) => p.x === x && p.y === y);
  }

  /**
   * check if a stroke of the current symbol is using the targeted snapPoint
   * @param {SnapPoint} snapPoint
   * @returns true if the snapPoint is used, else false
   */
  _aStrokeIsUsingTheSnapPoint(snapPoint) {
    return (
      this.strokes.find(
        (s) =>
          (s.x1 === snapPoint.x && s.y1 === snapPoint.y) ||
          (s.x2 === snapPoint.x && s.y2 === snapPoint.y)
      ) !== undefined
    );
  }

  hideSnapPoints() {
    for (let pt of this.snapPoints) {
      pt.hide();
    }
  }

  showSnapPoints() {
    for (let pt of this.snapPoints) {
      pt.show();
    }
  }

  enableStrokesPointerEvents() {
    for (let s of this.strokes) {
      s.enablePointerEvents();
    }
  }

  disableStrokesPointerEvents() {
    for (let s of this.strokes) {
      s.disablePointerEvents();
    }
  }
}
