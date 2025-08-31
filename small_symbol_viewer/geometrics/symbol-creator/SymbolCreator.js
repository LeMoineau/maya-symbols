const SNAP_POINT_SIZE = 0.1;

class SymbolCreator {
  constructor({ cols, rows, containerId, options }) {
    this._div = document.getElementById(containerId ?? "symbol-creator");
    this._cols = cols ?? 5;
    this._rows = rows ?? 5;
    this._snapPoints = [];
    this._init();
    this._drawing = false;
    this._currentDrawing = undefined;
    this._strokes = [];
    this.options = options;
  }

  _init() {
    this._createCanvas();
    this._createBackgroundRectangle();
    for (let x = 0; x < this._rows; x++) {
      for (let y = 0; y < this._cols; y++) {
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
    this._canvas.setAttribute("viewBox", `0 0 ${this._rows} ${this._cols}`);
    this._canvas.classList.add("canvas");
    this._canvas.classList.add("symbol-creator");
    this._canvas.addEventListener("mousemove", (ev) => {
      if (this._drawing) {
        this._updateCurrentDrawingDisplay(ev, this._currentDrawing);
      }
    });
    this._canvas.addEventListener("mousedown", (ev) => {
      if (this._drawing && ev.button === 1) {
        this._cancelDraw();
      }
    });
    this._div.appendChild(this._canvas);
  }

  _createBackgroundRectangle() {
    this._backgroundRect = new Form({
      points: `0.5,0.5 0.5,${this._cols - 0.5} ${this._rows - 0.5},${
        this._cols - 0.5
      } ${this._rows - 0.5},0.5`,
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
        if (this._drawing) {
          this._finishDraw(pt);
        } else {
          this._startDraw(pt);
        }
      },
    });
    this._canvas.appendChild(snapPoint.html);
    this._snapPoints.push(snapPoint);
  }

  _createPins() {
    // this._canvas = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "svg"
    // );
    // this._canvas.setAttribute("viewBox", `0 0 ${this._rows} ${this._cols}`);
  }

  hideSnapPoints() {
    for (let pt of this._snapPoints) {
      pt.hide();
    }
  }

  showSnapPoints() {
    for (let pt of this._snapPoints) {
      pt.show();
    }
  }

  _startDraw(snapPoint) {
    this._drawing = true;
    this._currentDrawing = new Segment(
      snapPoint.x,
      snapPoint.y,
      snapPoint.x,
      snapPoint.y
    );
    snapPoint.activate();
    this._currentDrawing.disablePointersEvents();
    this._canvas.appendChild(this._currentDrawing.html);
    this._canvas.toUpdateSegment = this._currentDrawing;
  }

  /**
   * update the current drawed segment from cursor position
   */
  _updateCurrentDrawingDisplay(ev, toUpdateSegment) {
    const rect = this._canvas.getBoundingClientRect();
    const scale = rect.width / 100 / Math.max(this._rows, this._cols);

    let offsetX = 0;
    let offsetY = 0;
    if (this._rows > this._cols) {
      offsetY = (this._cols - this._rows) / 2;
    } else {
      offsetX = (this._rows - this._cols) / 2;
    }

    toUpdateSegment.updateP2(
      (ev.clientX - rect.left) / (scale * 100) + offsetX,
      (ev.clientY - rect.top) / (scale * 100) + offsetY
    );
  }

  _cancelDrawingHandler(ev) {
    if (ev.button === 1) {
      ev.currentTarget.cancelDraw();
    }
  }

  /**
   * Finish a draw and create a new segment
   */
  _finishDraw(snapPoint) {
    this._drawing = false;
    this._currentDrawing.updateP2(snapPoint.x, snapPoint.y);
    this._strokes.push(this._currentDrawing);
    snapPoint.activate();
    this._currentDrawing = undefined;
    if (this.options.dontStopDrawingBetweenStrokes) {
      this._startDraw(snapPoint);
    }
  }

  /**
   * cancel a current drawing (dont create a new segment)
   */
  _cancelDraw() {
    this._drawing = false;
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
  }

  /**
   * find a snap point from its coordinates
   * @param {number} x
   * @param {number} y
   * @returns {SnapPoint} the found snap point or undefined
   */
  _findSnapPointAt(x, y) {
    return this._snapPoints.find((p) => p.x === x && p.y === y);
  }

  /**
   * check if a stroke of the current symbol is using the targeted snapPoint
   * @param {SnapPoint} snapPoint
   * @returns true if the snapPoint is used, else false
   */
  _aStrokeIsUsingTheSnapPoint(snapPoint) {
    return (
      this._strokes.find(
        (s) =>
          (s.x1 === snapPoint.x && s.y1 === snapPoint.y) ||
          (s.x2 === snapPoint.x && s.y2 === snapPoint.y)
      ) !== undefined
    );
  }
}
