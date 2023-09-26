export function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const Y = 0.299 * r + 0.587 * g + 0.114 * b;

  return Y >= 128 ? "#000000" : "#ffffff";
}
