"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, DoubleSide, Raycaster, Vector2, Vector3 } from "three";
import { field, fromCell, nodes, routes, sampleRoute, terrainHeight } from "./grid-surface";
import { gridFragment, gridVertex, nodeFragment, nodeVertex, routeFragment, routeVertex } from "./grid-shaders";

export type GridMotion = { clientX: number; clientY: number; pointerActive: boolean; revision: number; scroll: number };
export type GenerativeGridProps = {
  active: boolean;
  motionRef: RefObject<GridMotion>;
  onFailure: () => void;
  onReady: () => void;
};

function GenerativeGrid({ motionRef, onFailure, onReady }: GenerativeGridProps) {
  const { camera, gl } = useThree();
  const painted = useRef(false);
  const controlsRef = useRef({
    ray: new Raycaster(),
    ndc: new Vector2(), hit: new Vector3(), target: new Vector2(),
    revision: -1, strength: 0,
  });
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uPointer: { value: new Vector2() },
    uStrength: { value: 0 }, uRadius: { value: field.pointerRadius },
    uScroll: { value: 0 }, uDpr: { value: 1 },
    uBone: { value: new Color("#d8d3ca") },
    uGraphite: { value: new Color("#686d73") },
    uCopper: { value: new Color("#b87952") },
  }), []);
  const materialRef = useRef(uniforms);
  // Pass uniforms through the constructor: Fiber's uniforms prop copies scalar
  // containers. These three materials intentionally share the live containers.
  const materialOptions = useMemo(() => ({
    grid: { uniforms, vertexShader: gridVertex, fragmentShader: gridFragment, transparent: true, depthWrite: false, side: DoubleSide },
    routes: { uniforms, vertexShader: routeVertex, fragmentShader: routeFragment, transparent: true, depthWrite: false },
    nodes: { uniforms, vertexShader: nodeVertex, fragmentShader: nodeFragment, transparent: true, depthWrite: false },
  }), [uniforms]);
  const buffers = useMemo(() => {
    const positions: number[] = [], progress: number[] = [], routeIds: number[] = [];
    routes.forEach((route, id) => {
      const points = sampleRoute(route);
      for (let i = 1; i < points.length; i++) {
        for (const j of [i - 1, i]) {
          positions.push(points[j][0], points[j][1], 0);
          progress.push(j / (points.length - 1));
          routeIds.push(id);
        }
      }
    });
    return {
      routes: new Float32Array(positions), progress: new Float32Array(progress), ids: new Float32Array(routeIds),
      nodes: new Float32Array(nodes.flatMap(node => [...fromCell(node), 0])),
      primary: new Float32Array(nodes.map((_, i) => i === 0 ? 2 : i === 1 ? 1 : 0)),
    };
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    const style = getComputedStyle(canvas);
    const values = materialRef.current;
    values.uBone.value.set(style.getPropertyValue("--bone-soft").trim() || "#d8d3ca");
    values.uGraphite.value.set(style.getPropertyValue("--muted-dark").trim() || "#686d73");
    values.uCopper.value.set(style.getPropertyValue("--copper").trim() || "#b87952");
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
    };
  }, [gl, onFailure]);

  useFrame((_, delta) => {
    const values = materialRef.current;
    const controls = controlsRef.current;
    const motion = motionRef.current;
    const dt = Math.min(delta, 0.05); // Never jump after a hidden/offscreen pause.
    values.uTime.value += dt;
    values.uScroll.value = motion.scroll;
    values.uDpr.value = gl.getPixelRatio();

    if (motion.revision !== controls.revision) {
      controls.revision = motion.revision;
      controls.strength = 0;
      if (motion.pointerActive) {
        const rect = gl.domElement.getBoundingClientRect();
        const x = (motion.clientX - rect.left) / rect.width;
        const y = (motion.clientY - rect.top) / rect.height;
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          controls.ndc.set(x * 2 - 1, 1 - y * 2);
          controls.ray.setFromCamera(controls.ndc, camera);
          const ray = controls.ray.ray;
          if (Math.abs(ray.direction.y) > 0.01) {
            // Find the FRONT surface crossing. A flat-plane hit can land behind
            // the ridge, so bracket within known terrain heights, then bisect.
            const start = (3 - ray.origin.y) / ray.direction.y;
            const end = (-1 - ray.origin.y) / ray.direction.y;
            let previous = start;
            for (let step = 1; step <= 20; step++) {
              const t = start + (end - start) * step / 20;
              ray.at(t, controls.hit);
              if (controls.hit.y <= terrainHeight(controls.hit.x, controls.hit.z, values.uTime.value)) {
                let lo = previous, hi = t;
                for (let i = 0; i < 9; i++) {
                  const mid = (lo + hi) / 2;
                  ray.at(mid, controls.hit);
                  if (controls.hit.y > terrainHeight(controls.hit.x, controls.hit.z, values.uTime.value)) lo = mid;
                  else hi = mid;
                }
                ray.at((lo + hi) / 2, controls.hit);
                if (Math.abs(controls.hit.x) < 9 && Math.abs(controls.hit.z) < 6) {
                  controls.target.set(controls.hit.x, controls.hit.z);
                  controls.strength = field.pointerStrength;
                }
                break;
              }
              previous = t;
            }
          }
        }
      }
    }
    const damping = 1 - Math.exp(-dt * 4);
    values.uPointer.value.lerp(controls.target, damping);
    values.uStrength.value += (controls.strength - values.uStrength.value) * damping;
    if (!painted.current) { painted.current = true; onReady(); }
  });

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[field.width, field.depth, field.segmentsX, field.segmentsZ]} />
        <shaderMaterial args={[materialOptions.grid]} />
      </mesh>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[buffers.routes, 3]} />
          <bufferAttribute attach="attributes-aProgress" args={[buffers.progress, 1]} />
          <bufferAttribute attach="attributes-aRoute" args={[buffers.ids, 1]} />
        </bufferGeometry>
        <shaderMaterial args={[materialOptions.routes]} />
      </lineSegments>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[buffers.nodes, 3]} />
          <bufferAttribute attach="attributes-aPrimary" args={[buffers.primary, 1]} />
        </bufferGeometry>
        <shaderMaterial args={[materialOptions.nodes]} />
      </points>
    </>
  );
}

export function GenerativeGridCanvas(props: GenerativeGridProps) {
  return (
    <div className="grid-canvas" data-render-loop={props.active ? "always" : "never"}>
      <Canvas
        aria-hidden="true"
        camera={{ position: [...field.camera], fov: field.fov, near: 0.1, far: 80 }}
        dpr={[1, 1.5]}
        frameloop={props.active ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => { gl.debug.onShaderError = props.onFailure; }}
        fallback={null}
        style={{ pointerEvents: "none" }}
      >
        <GenerativeGrid {...props} />
      </Canvas>
    </div>
  );
}
