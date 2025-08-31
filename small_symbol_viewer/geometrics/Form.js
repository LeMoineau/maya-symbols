class Form {
  /**
   * create a form from a string of points ("0,0 0,5 5,5 5,0") or a list of Point
   * @param {{points?: string | Point[], afterHtmlCreated?: (html) => void}} props
   */
  constructor({ points, afterHtmlCreated }) {
    this.strokes = [];
    this._afterHtmlCreated = afterHtmlCreated;
    if (points) {
      if (typeof points === "string") {
        this._createFormFromString(points);
      } else if (Array.isArray(points)) {
        this._createFormFromString(
          points.map((p) => `${p.x},${p.y}`).join(" ")
        );
      }
    }
  }

  _createFormFromString(ptsStr) {
    const splittedPtsStr = ptsStr.split(" ");
    for (let i = 0; i < splittedPtsStr.length; i++) {
      const line = new Segment(
        splittedPtsStr[i].split(",")[0],
        splittedPtsStr[i].split(",")[1],
        splittedPtsStr[(i + 1) % splittedPtsStr.length].split(",")[0],
        splittedPtsStr[(i + 1) % splittedPtsStr.length].split(",")[1]
      );
      this._afterHtmlCreated && this._afterHtmlCreated(line.html);
      this.strokes.push(line);
    }
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
}
