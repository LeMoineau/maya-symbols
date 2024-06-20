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

show([
  new Segment(new Point(0, 0), new Point(0, 5)),
  new Segment(new Point(0, 5), new Point(5, 5)),
  new Segment(new Point(5, 5), new Point(5, 0)),
  new Segment(new Point(5, 0), new Point(0, 0)),
  new Segment(new Point(0, 5), new Point(0, 10)),
  new Segment(new Point(0, 10), new Point(5, 10)),
  new Segment(new Point(5, 10), new Point(5, 5)),
  new Segment(new Point(5, 5), new Point(0, 5)),
]);
show(
  [
    new Segment(new Point(0, 0), new Point(0, 5)),
    new Segment(new Point(0, 5), new Point(5, 5)),
    new Segment(new Point(5, 5), new Point(5, 0)),
    new Segment(new Point(5, 0), new Point(0, 0)),
  ],
  { width: 5, height: 10 }
);
show([
  new Segment(new Point(0, 5), new Point(0, 10)),
  new Segment(new Point(5, 5), new Point(0, 5)),
  new Segment(new Point(0, 10), new Point(5, 10)),
  new Segment(new Point(5, 10), new Point(5, 5)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 2)),
  new Segment(new Point(6, 2), new Point(0, 2)),
  new Segment(new Point(6, 2), new Point(6, 0)),
  new Segment(new Point(0, 0), new Point(6, 0)),
  new Segment(new Point(0, 4), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(6, 4)),
  new Segment(new Point(0, 4), new Point(6, 4)),
]);

show(
  [
    new Segment(new Point(0, 0), new Point(0, 2)),
    new Segment(new Point(6, 2), new Point(0, 2)),
    new Segment(new Point(6, 2), new Point(6, 0)),
    new Segment(new Point(0, 0), new Point(6, 0)),
  ],
  { width: 6, height: 6 }
);

show([
  new Segment(new Point(0, 4), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(6, 4)),
  new Segment(new Point(0, 4), new Point(6, 4)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 2)),
  new Segment(new Point(6, 4), new Point(0, 2)),
  new Segment(new Point(6, 2), new Point(6, 0)),
  new Segment(new Point(0, 0), new Point(6, 0)),
  new Segment(new Point(0, 4), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(6, 4)),
  new Segment(new Point(0, 4), new Point(6, 2)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 0)),
  new Segment(new Point(2, 2), new Point(4, 4)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 6)),
  new Segment(new Point(6, 6), new Point(0, 6)),
  new Segment(new Point(2, 2), new Point(6, 6)),
  new Segment(new Point(2, 2), new Point(0, 0)),
]);

show(
  [
    new Segment(new Point(0, 0), new Point(0, 5)),
    new Segment(new Point(0, 5), new Point(5, 5)),
    new Segment(new Point(5, 5), new Point(5, 0)),
    new Segment(new Point(5, 0), new Point(0, 0)),
    new Segment(new Point(-5, -5), new Point(-5, 0)),
    new Segment(new Point(-5, 0), new Point(0, 0)),
    new Segment(new Point(0, 0), new Point(0, -5)),
    new Segment(new Point(0, -5), new Point(-5, -5)),
  ],
  { x: -6, y: -6, width: 10, height: 10 }
);

show([
  new Segment(new Point(2, 0), new Point(2, 2)),
  new Segment(new Point(8, 2), new Point(2, 2)),
  new Segment(new Point(8, 2), new Point(8, 4)),
  new Segment(new Point(10, 4), new Point(8, 4)),
  new Segment(new Point(10, 4), new Point(10, 0)),
  new Segment(new Point(2, 0), new Point(10, 0)),
  new Segment(new Point(0, 2), new Point(2, 2)),
  new Segment(new Point(2, 4), new Point(2, 2)),
  new Segment(new Point(2, 4), new Point(8, 4)),
  new Segment(new Point(8, 6), new Point(8, 4)),
  new Segment(new Point(8, 6), new Point(0, 6)),
  new Segment(new Point(0, 2), new Point(0, 6)),
  new Segment(new Point(2.5, 2.5), new Point(7.5, 2.5)),
  new Segment(new Point(7.5, 3.5), new Point(7.5, 2.5)),
  new Segment(new Point(7.5, 3.5), new Point(2.5, 3.5)),
  new Segment(new Point(2.5, 2.5), new Point(2.5, 3.5)),
  new Segment(new Point(0, 0), new Point(10, 0)),
  new Segment(new Point(10, 6), new Point(10, 0)),
  new Segment(new Point(10, 6), new Point(0, 6)),
  new Segment(new Point(0, 0), new Point(0, 6)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 5)),
  new Segment(new Point(0, 5), new Point(5, 5)),
  new Segment(new Point(5, 5), new Point(5, 0)),
  new Segment(new Point(5, 0), new Point(0, 0)),
]);

show([
  new Segment(new Point(0, 1), new Point(0, 5)),
  new Segment(new Point(0, 5), new Point(5, 5)),
  new Segment(new Point(5, 5), new Point(5, 1)),
  new Segment(new Point(5, 1), new Point(0, 1)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 5)),
  new Segment(new Point(-1, 0), new Point(5, 6)),
]);

show([
  new Segment(new Point(0, 0), new Point(0, 5)),
  new Segment(new Point(0, 5), new Point(5, 5)),
  new Segment(new Point(6, 6), new Point(5, 0)),
  new Segment(new Point(5, 0), new Point(0, 0)),
  new Segment(new Point(1, 1), new Point(1, 4)),
  new Segment(new Point(1, 4), new Point(4, 4)),
  new Segment(new Point(4, 4), new Point(4, 1)),
  new Segment(new Point(4, 1), new Point(1, 1)),
  new Segment(new Point(4, 1), new Point(10, 10)),
]);

show([
  new Segment(new Point(2, 0), new Point(2, 2)),
  new Segment(new Point(8, 2), new Point(2, 2)),
  new Segment(new Point(8, 2), new Point(8, 4)),
  new Segment(new Point(10, 4), new Point(8, 4)),
  new Segment(new Point(10, 4), new Point(10, 0)),
  new Segment(new Point(2, 0), new Point(10, 0)),
  new Segment(new Point(0, 2), new Point(2, 2)),
  new Segment(new Point(2, 4), new Point(2, 2)),
  new Segment(new Point(2, 4), new Point(8, 4)),
  new Segment(new Point(8, 6), new Point(8, 4)),
  new Segment(new Point(8, 6), new Point(0, 6)),
  new Segment(new Point(0, 2), new Point(0, 6)),
  new Segment(new Point(2.5, 2.5), new Point(7.5, 2.5)),
  new Segment(new Point(7.5, 3.5), new Point(7.5, 2.5)),
  new Segment(new Point(7.5, 3.5), new Point(2.5, 3.5)),
  new Segment(new Point(2.5, 2.5), new Point(2.5, 3.5)),
  new Segment(new Point(0, 0), new Point(10, 0)),
  new Segment(new Point(10, 6), new Point(10, 0)),
  new Segment(new Point(10, 6), new Point(0, 6)),
  new Segment(new Point(0, 0), new Point(0, 6)),
]);

show(
  [
    new Segment(new Point(2, 0), new Point(2, 2)),
    new Segment(new Point(0, 0), new Point(2, 0)),
    new Segment(new Point(0, 0), new Point(0, 2)),
    new Segment(new Point(0, 2), new Point(2, 2)),
  ],
  { width: 11, height: 9 }
);
show(
  [
    //ok
    new Segment(new Point(2, 0), new Point(2, 2)),
    new Segment(new Point(2, 0), new Point(10, 0)),
    new Segment(new Point(10, 4), new Point(10, 0)),
    new Segment(new Point(10, 4), new Point(8, 4)),
    new Segment(new Point(8, 2), new Point(8, 4)),
    new Segment(new Point(8, 2), new Point(2, 2)),
  ],
  { width: 11, height: 9 }
);
show(
  [
    //ok
    new Segment(new Point(8, 2), new Point(2, 2)),
    new Segment(new Point(8, 2), new Point(8, 4)),
    new Segment(new Point(2, 4), new Point(8, 4)),
    new Segment(new Point(2, 4), new Point(2, 2)),
  ],
  { width: 11, height: 9 }
);
show(
  [
    //ok
    new Segment(new Point(10, 4), new Point(8, 4)),
    new Segment(new Point(10, 6), new Point(10, 4)),
    new Segment(new Point(10, 6), new Point(8, 6)),
    new Segment(new Point(8, 6), new Point(8, 4)),
  ],
  { width: 11, height: 9 }
);
show(
  [
    //ok
    new Segment(new Point(0, 2), new Point(2, 2)),
    new Segment(new Point(0, 2), new Point(0, 6)),
    new Segment(new Point(8, 6), new Point(0, 6)),
    new Segment(new Point(8, 6), new Point(8, 4)),
    new Segment(new Point(2, 4), new Point(8, 4)),
    new Segment(new Point(2, 4), new Point(2, 2)),
  ],
  { width: 11, height: 9 }
);

show(
  [
    new Segment(new Point(2.5, 2.5), new Point(7.5, 2.5)),
    new Segment(new Point(7.5, 3.5), new Point(7.5, 2.5)),
    new Segment(new Point(7.5, 3.5), new Point(2.5, 3.5)),
    new Segment(new Point(2.5, 2.5), new Point(2.5, 3.5)),
  ],
  { width: 11, height: 9 }
);
