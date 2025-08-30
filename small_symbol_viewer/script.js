function createStroke(segment) {
  const stroke = document.createElementNS("http://www.w3.org/2000/svg", "line");
  stroke.classList.add("stroke");
  stroke.setAttribute("x1", segment.points[0].x);
  stroke.setAttribute("y1", segment.points[0].y);
  stroke.setAttribute("x2", segment.points[1].x);
  stroke.setAttribute("y2", segment.points[1].y);
  return stroke;
}

function initCanvasViewPort(canvas, segments, props) {
  let maxWidth = 0;
  let maxHeight = 0;
  for (let segment of segments) {
    for (let point of segment.points) {
      if (point.x > maxWidth) maxWidth = point.x;
      if (point.y > maxHeight) maxHeight = point.y;
    }
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
    dontStopDrawingBetweenStrokes: false,
  },
});

const symbolCreator2 = new SymbolCreator({
  rows: 7,
  cols: 5,
  containerId: "symbol-creator2",
  options: {
    dontStopDrawingBetweenStrokes: true,
  },
});
