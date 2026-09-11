import { field, fromCell, nodes, projectedPath, projectSurface, routes, sampleRoute, type FieldPoint } from "./grid-surface";

const columns = Array.from({ length: field.columns + 1 }, (_, column) =>
  projectedPath(Array.from({ length: 81 }, (_, i): FieldPoint => [column * 0.5 - 9, i / 80 * 12 - 6])),
);
const rows = Array.from({ length: field.rows + 1 }, (_, row) =>
  projectedPath(Array.from({ length: 101 }, (_, i): FieldPoint => [i / 100 * 18 - 9, row * 0.5 - 6])),
);

export function GridFallback() {
  return (
    <svg aria-hidden="true" focusable="false" className="grid-fallback" viewBox="0 0 900 820" fill="none">
      <defs>
        <radialGradient id="terrain-line-fade" cx="55%" cy="47%" r="65%">
          <stop stopColor="var(--bone-soft)" stopOpacity="0.48" />
          <stop offset="0.55" stopColor="var(--muted)" stopOpacity="0.26" />
          <stop offset="1" stopColor="var(--muted-dark)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="grid-fallback-lines" stroke="url(#terrain-line-fade)" strokeWidth="0.7">
        <g>{columns.map((d, i) => <path d={d} key={i} />)}</g>
        <g>{rows.map((d, i) => <path d={d} key={i} />)}</g>
      </g>
      <g className="grid-fallback-routes">
        {routes.map((route, i) => <path key={i} d={projectedPath(sampleRoute(route))} />)}
      </g>
      <g className="grid-fallback-nodes">
        {nodes.map((node, i) => {
          const [x, y] = projectSurface(...fromCell(node));
          return <circle key={i} cx={x} cy={y} r={i === 0 ? 3 : 1.6} className={i < 2 ? "grid-node-copper" : undefined} />;
        })}
      </g>
    </svg>
  );
}
