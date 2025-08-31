function createStroke(segment) {
  const stroke = document.createElementNS("http://www.w3.org/2000/svg", "line");
  stroke.classList.add("stroke");
  stroke.setAttribute("x1", segment.x1);
  stroke.setAttribute("y1", segment.y1);
  stroke.setAttribute("x2", segment.x2);
  stroke.setAttribute("y2", segment.y2);
  return stroke;
}

function initCanvasViewPort(canvas, segments, props) {
  let maxWidth = 0;
  let maxHeight = 0;
  for (let segment of segments) {
    const currentMaxX = Math.max(segment.x1, segment.x2);
    const currentMaxY = Math.max(segment.y1, segment.y2);
    if (currentMaxX > maxWidth) maxWidth = currentMaxX;
    if (currentMaxY > maxHeight) maxHeight = currentMaxY;
  }
  canvas.setAttribute(
    "viewBox",
    `${(props && props.x) ?? -1} ${(props && props.x) ?? -1} ${
      ((props && props.width) ?? maxWidth) + 2
    } ${((props && props.height) ?? maxHeight) + 2}`
  );
}

function createCanvas() {
  const canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  canvas.classList.add("canvas");
  return canvas;
}

function show(segments, props) {
  console.log("showing: ", segments, "with props: ", props);
  const canvas = createCanvas();
  initCanvasViewPort(canvas, segments, props);
  for (let segment of segments) {
    const stroke = createStroke(segment);
    canvas.appendChild(stroke);
  }
  document.getElementById("container").appendChild(canvas);
}

const symbolCreator = new SymbolCreator({
  rows: 5,
  cols: 5,
  options: {
    dontStopDrawingBetweenStrokes: true,
  },
});

const symbolCreator2 = new SymbolCreator({
  rows: 13,
  cols: 9,
  containerId: "symbol-creator2",
  options: {
    dontStopDrawingBetweenStrokes: false,
  },
});
