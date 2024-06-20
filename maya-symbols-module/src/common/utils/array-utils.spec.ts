import { Point } from '../../app/geometrics/point/point';
import { ArrayUtils } from './array-utils';

describe('array-utils', () => {
  it('should remove item from array', () => {
    let A_TARGET_ITEM = 'c';
    let AN_ARRAY = ['a', 'b', A_TARGET_ITEM];
    let A_DESIRE_ARRAY = ['a', 'b'];

    ArrayUtils.removeFrom(AN_ARRAY, A_TARGET_ITEM);

    expect(AN_ARRAY).toStrictEqual(A_DESIRE_ARRAY);
  });

  it('should remove item from array when class array', () => {
    let A_TARGET_ITEM = new Point(0, 0);
    let AN_ARRAY = [new Point(1, 0), new Point(0, 1), A_TARGET_ITEM];
    let A_DESIRE_ARRAY = [new Point(1, 0), new Point(0, 1)];

    ArrayUtils.removeFrom(AN_ARRAY, A_TARGET_ITEM);

    expect(AN_ARRAY).toStrictEqual(A_DESIRE_ARRAY);
  });

  it('should return max value from array', () => {
    const AN_ARRAY = [{ a: 1 }, { a: 2 }];

    const maxVal = ArrayUtils.getMaxOf(AN_ARRAY, item => item.a);

    expect(maxVal).toStrictEqual({ a: 2 });
  });
});
