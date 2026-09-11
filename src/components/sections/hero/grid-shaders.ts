import { field, terrainGLSL } from "./grid-surface";

const surface = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uStrength;
uniform float uRadius;
${terrainGLSL}
float heightAt(vec2 p) {
  vec2 offset = p - uPointer;
  return terrainHeight(p, uTime) + uStrength * exp(-dot(offset, offset) / (uRadius * uRadius));
}
`;

export const gridVertex = `
${surface}
varying vec2 vUv;
varying float vHeight;
varying float vDepth;
void main() {
  vUv = uv;
  vHeight = heightAt(position.xy);
  vec4 view = modelViewMatrix * vec4(position.x, vHeight, position.y, 1.0);
  vDepth = -view.z;
  gl_Position = projectionMatrix * view;
}
`;

export const gridFragment = `
uniform vec3 uBone;
uniform vec3 uGraphite;
varying vec2 vUv;
varying float vHeight;
varying float vDepth;
void main() {
  vec2 cells = vUv * vec2(${field.columns.toFixed(1)}, ${field.rows.toFixed(1)});
  vec2 distanceToLine = abs(fract(cells - 0.5) - 0.5) / max(fwidth(cells), vec2(0.0001));
  float line = 1.0 - smoothstep(0.15, 1.0, min(distanceToLine.x, distanceToLine.y));
  vec2 edges = smoothstep(vec2(0.0), vec2(0.13), vUv) * smoothstep(vec2(0.0), vec2(0.13), 1.0 - vUv);
  float depthFade = 1.0 - smoothstep(17.0, 35.0, vDepth);
  float ridge = smoothstep(-0.3, 1.6, vHeight);
  vec3 color = mix(uGraphite, uBone, 0.25 + ridge * 0.42);
  float alpha = line * (0.2 + ridge * 0.22) * edges.x * edges.y * depthFade;
  if (alpha < 0.005) discard;
  gl_FragColor = vec4(color, alpha);
  #include <colorspace_fragment>
}
`;

export const routeVertex = `
${surface}
attribute float aProgress;
attribute float aRoute;
varying float vProgress;
varying float vRoute;
void main() {
  vProgress = aProgress;
  vRoute = aRoute;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, heightAt(position.xy) + 0.012, position.y, 1.0);
}
`;
export const routeFragment = `
uniform vec3 uCopper;
uniform float uTime;
uniform float uScroll;
varying float vProgress;
varying float vRoute;
void main() {
  // Only the primary route carries a slow signal; the other two stay quiet.
  float head = fract(uTime / 9.0);
  float pulse = exp(-pow((vProgress - head) / 0.065, 2.0)) * (1.0 - step(0.5, vRoute));
  float ends = smoothstep(0.0, 0.08, vProgress) * smoothstep(0.0, 0.08, 1.0 - vProgress);
  gl_FragColor = vec4(uCopper, (0.32 + pulse * 0.32) * ends * (1.0 - uScroll * 0.35));
  #include <colorspace_fragment>
}
`;
export const nodeVertex = `
${surface}
uniform float uDpr;
attribute float aPrimary;
varying float vPrimary;
void main() {
  vPrimary = aPrimary;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, heightAt(position.xy) + 0.025, position.y, 1.0);
  gl_PointSize = (aPrimary > 1.5 ? 7.0 : 3.5) * uDpr;
}
`;
export const nodeFragment = `
uniform vec3 uCopper;
uniform vec3 uBone;
varying float vPrimary;
void main() {
  float radius = length(gl_PointCoord - 0.5);
  float alpha = (1.0 - smoothstep(0.16, 0.5, radius)) * 0.8;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(mix(uBone, uCopper, step(0.5, vPrimary)), alpha);
  #include <colorspace_fragment>
}
`;
