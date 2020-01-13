/** 按照区间随机产生一个整数 */
export function randomInt(low: number, high: number = 0): number {
  const [l, h] = low < high ? [low, high] : [high, low];
  return Math.floor(l + Math.random() * (h - l + 1));
}
