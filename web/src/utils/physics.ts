export function calculateLuminosity(distance: number, brightness: number) {
  const luminosty = brightness * (4 * Math.PI * (distance / 100) ** 2);
  return luminosty;
}

export function calculateLux(adc: number) {
  return adc;
}
