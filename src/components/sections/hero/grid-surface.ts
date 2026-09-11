// Art direction and projection shared by the static SVG and the GPU scene.
// No Three.js imports: fallback clients never need the 3D runtime.
export const field = {
  width: 18, depth: 12, columns: 36, rows: 24,
  segmentsX: 80, segmentsZ: 50,
  viewWidth: 900, viewHeight: 820, fov: 38,
  camera: [10, 10.5, 15] as const,
  pointerRadius: 2.2, pointerStrength: 0.4,
};
export type FieldPoint = readonly [number, number];

export function terrainHeight(x: number, z: number, time = 0) {
  const ridge = (z + x * 0.34 - 0.3) / 2.1;
  const shoulder = (x - 1.2) / 7;
  const valleyX = (x + 3.2) / 4.5;
  const valleyZ = (z + 3) / 1.9;
  const farX = (x - 3.8) / 4.2;
  const farZ = (z + 4.3) / 1.5;
  return 1.65 * Math.exp(-ridge * ridge - shoulder * shoulder)
    - 0.65 * Math.exp(-valleyX * valleyX - valleyZ * valleyZ)
    + 0.6 * Math.exp(-farX * farX - farZ * farZ)
    + 0.14 * Math.sin(x * 0.32 + z * 0.21 + time * 0.055)
    + 0.07 * Math.cos(z * 0.46 - x * 0.18 - time * 0.035);
}

// The same expression as terrainHeight; only the low-amplitude terms drift.
export const terrainGLSL = `
float terrainHeight(vec2 p, float time) {
  float ridge = (p.y + p.x * 0.34 - 0.3) / 2.1;
  float shoulder = (p.x - 1.2) / 7.0;
  vec2 valley = (p + vec2(3.2, 3.0)) / vec2(4.5, 1.9);
  vec2 farRidge = (p - vec2(3.8, -4.3)) / vec2(4.2, 1.5);
  return 1.65 * exp(-ridge * ridge - shoulder * shoulder)
    - 0.65 * exp(-dot(valley, valley))
    + 0.6 * exp(-dot(farRidge, farRidge))
    + 0.14 * sin(p.x * 0.32 + p.y * 0.21 + time * 0.055)
    + 0.07 * cos(p.y * 0.46 - p.x * 0.18 - time * 0.035);
}
`;

// Perspective look-at projection, matching the camera aimed at the origin.
const [cx, cy, cz] = field.camera;
const distance = Math.hypot(cx, cy, cz);
const horizontal = Math.hypot(cx, cz);
const right = [cz / horizontal, 0, -cx / horizontal];
const up = [-cx * cy / (distance * horizontal), horizontal / distance, -cz * cy / (distance * horizontal)];
const forward = [-cx / distance, -cy / distance, -cz / distance];
const focal = field.viewHeight / (2 * Math.tan(field.fov * Math.PI / 360));

export function projectSurface(x: number, z: number): FieldPoint {
  const dx = x - cx, dy = terrainHeight(x, z) - cy, dz = z - cz;
  const depth = dx * forward[0] + dy * forward[1] + dz * forward[2];
  return [
    field.viewWidth / 2 + focal * (dx * right[0] + dz * right[2]) / depth,
    field.viewHeight / 2 - focal * (dx * up[0] + dy * up[1] + dz * up[2]) / depth,
  ];
}

// Routes use grid-index coordinates, so they follow real cell edges.
export const routes: FieldPoint[][] = [
  [[12, 24], [12, 17], [18, 17], [18, 11], [27, 11], [27, 5], [34, 5]],
  [[18, 11], [18, 6], [11, 6], [11, 2]],
  [[27, 11], [32, 11], [32, 16], [36, 16]],
];
export const nodes: FieldPoint[] = [[18, 11], [27, 11], [12, 17], [18, 6], [32, 16], [27, 5]];

export function fromCell([column, row]: FieldPoint): FieldPoint {
  return [column * field.width / field.columns - field.width / 2, row * field.depth / field.rows - field.depth / 2];
}

export function sampleRoute(route: FieldPoint[]) {
  const points: FieldPoint[] = [];
  for (let segment = 1; segment < route.length; segment++) {
    const a = fromCell(route[segment - 1]), b = fromCell(route[segment]);
    const steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.12);
    for (let step = 0; step < steps; step++) {
      const t = step / steps;
      points.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  points.push(fromCell(route[route.length - 1]));
  return points;
}

export function projectedPath(points: FieldPoint[]) {
  return points.map(([x, z], i) => {
    const [px, py] = projectSurface(x, z);
    return `${i ? "L" : "M"}${px.toFixed(2)},${py.toFixed(2)}`;
  }).join(" ");
}
