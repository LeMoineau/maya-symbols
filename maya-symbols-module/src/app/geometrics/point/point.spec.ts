import { Point } from './point';

describe('point', () => {
    it('should return true when compare two differents points with equals properties', () => {
        let p1 = new Point(0, 0);
        let p2 = new Point(0, 0);

        expect(p1.isEqualTo(p2)).toBeTruthy();
    });

    it('should return false when compare two differents points with equals properties', () => {
        let p1 = new Point(0, 0);
        let p2 = new Point(1, 0);

        expect(p1.isEqualTo(p2)).toBeFalsy();
    });
});
