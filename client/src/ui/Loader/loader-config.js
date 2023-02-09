export const STEP = 8

export const COLORS = {
  purple: '#be7cff',
  white: '#ffffff',
}

export function getShadow(size) {
  return size >= 7 ? size : size / 2 + 0.5
}
