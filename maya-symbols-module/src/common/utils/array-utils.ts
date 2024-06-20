export namespace ArrayUtils {
  export function removeFrom<T>(array: T[], item: T) {
    const index = array.findIndex(i => i === item);
    if (index === -1) {
      return;
    }
    array.splice(index, 1);
  }

  export function consoleLogAllFrom<T>(array: T[]) {
    if (array.length <= 0) {
      console.log('[]');
      return;
    }
    console.log(`[ \n${array.map(a => `  ${(a as any).toString()}`).join(', \n')} \n]`);
  }

  export function getMaxOf<T>(array: T[], valueToCompare: (t: T) => number): T {
    if (array.length <= 0) throw new Error('list empty');
    let maxVal = array[0];
    for (let t of array) {
      if (valueToCompare(t) > valueToCompare(maxVal)) {
        maxVal = t;
      }
    }
    return maxVal;
  }
}
