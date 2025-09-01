class SnapPoint {
  /**
   * snap point of symbol creator
   * @param {{x: number, y: number, size: number, fill: string, onClick: (pt: SnapPoint) => void}} props
   */
  constructor({ x, y, size, fill, onClick }) {
    this.x = x;
    this.y = y;
    this.size = size ?? 0.1;
    this.fill = fill ?? "red";
    this._initHtml({ onClick });
    this._activate = false;
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
    if (this.isActivated()) {
      this.activate();
    } else {
      this.html.setAttribute("fill", "red");
    }
  }

  isActivated() {
    return this._activate;
  }

  /**
   * change the color of the point for being start/end of
   * the symbol strokes
   */
  activate() {
    this._activate = true;
    this._html.setAttribute("fill", "var(--stroke-color)");
    this.html.classList.add("snappoint-activate");
  }

  desactivate() {
    this._activate = false;
    this._html.setAttribute("fill", this.fill);
  }
}
