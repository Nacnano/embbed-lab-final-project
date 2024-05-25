import { threshold } from "@/data/threshold";

export function validateDistance(distance: number) {
  return 2 <= distance && distance <= 800;
}

export function calculateLuminosity(distance: number, brightness: number) {
  const luminosty = brightness * (4 * Math.PI * (distance / 100) ** 2);
  return validateDistance(distance) ? luminosty : threshold.error;
}

export function calculateLux(resistance: number) {
  const exponent =
    -1.0128565 * Math.log10(resistance) + Math.log10(254267.4432);
  const lux = 10 ** exponent;
  return lux;
}
