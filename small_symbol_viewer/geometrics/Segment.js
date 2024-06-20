class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.points = [p1, p2];
  }

  distance() {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
}
