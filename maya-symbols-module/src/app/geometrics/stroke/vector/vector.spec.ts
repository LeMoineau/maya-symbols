import { Vector } from './vector';

describe('Vector', () => {
  it('should return true when two vector are collinear', () => {
    const A_VECTOR = new Vector(-3, 9);
    const ANOTHER_VECTOR = new Vector(1, -3);

    expect(A_VECTOR.isCollinearWith(ANOTHER_VECTOR)).toBeTruthy();
  });

  it('should return false when two vector are not collinear', () => {
    const A_VECTOR = new Vector(-3, 9);
    const ANOTHER_VECTOR = new Vector(2, -3);

    expect(A_VECTOR.isCollinearWith(ANOTHER_VECTOR)).toBeFalsy();
  });

  it('should return false when two vector are not equals', () => {
    const A_VECTOR = new Vector(-3, 9);
    const ANOTHER_VECTOR = new Vector(2, -3);

    expect(A_VECTOR.isEqualTo(ANOTHER_VECTOR)).toBeFalsy();
  });

  it('should return false when two vector are equals', () => {
    const A_VECTOR = new Vector(1, 1);
    const ANOTHER_VECTOR = new Vector(1, 1);

    expect(A_VECTOR.isEqualTo(ANOTHER_VECTOR)).toBeTruthy();
  });
});
