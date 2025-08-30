class SnapPoint {
  /**
   * snap point of symbol creator
   * @param {{x: number, y: number, size: number, fill: string, onClick: (pt: SnapPoint) => void}} props
   */
  constructor({ x, y, size, fill, onClick }) {
    this.x = x;
    this.y = y;
    this.size = size ?? SNAP_POINT_SIZE;
    this.fill = fill ?? "red";
    this._initHtml({ onClick });
  }

  _initHtml({ onClick }) {
    this._html = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this._html.setAttribute("r", this.size);
    this._html.setAttribute("cx", this.x);
    this._html.setAttribute("cy", this.y);
    this._html.setAttribute("fill", this.fill);
    onClick && this._html.addEventListener("click", () => onClick(this));
  }

  get html() {
    return this._html;
  }

  hide() {
    this.html.setAttribute("fill", "transparent");
  }

  show() {
    this.html.setAttribute("fill", "red");
  }
}
