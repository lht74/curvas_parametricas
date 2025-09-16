import React, { useMemo } from 'react';
import * as d3 from 'd3';
import type { ParametricCurveProps } from '../types';

// A helper component for the grid, defined within the same file for simplicity.
const Grid: React.FC = () => (
  <defs>
    <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="0.5"/>
    </pattern>
    <pattern id="grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#grid-small)"/>
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(107, 114, 128, 0.5)" strokeWidth="1"/>
    </pattern>
  </defs>
);

const ParametricCurve: React.FC<ParametricCurveProps> = ({ a, b, h, width, height }) => {
  const points = useMemo(() => {
    const data: [number, number][] = [];
    const dt = 0.01;
    const k = a / b;
    
    // Use a large enough range for t to close most curves. 64*PI is usually sufficient.
    const tMax = 64 * Math.PI;

    for (let t = 0; t <= tMax; t += dt) {
      // Standard hypocycloid equations with phase shift 'h'
      const x = (a - b) * Math.cos(t) + b * Math.cos(t * (k - 1) + h);
      const y = (a - b) * Math.sin(t) - b * Math.sin(t * (k - 1) + h);
      data.push([x, y]);
    }
    return data;
  }, [a, b, h]);

  const pathData = useMemo(() => {
    const lineGenerator = d3.line<[number, number]>().x(d => d[0]).y(d => d[1]);
    const generatedPath = lineGenerator(points);
    return generatedPath || '';
  }, [points]);

  // Determine the scale to fit the curve in the view
  const scale = useMemo(() => {
    // The maximum possible radius for a hypocycloid is `a`.
    const maxRadius = a;
    // Add 10% padding to avoid touching the edges.
    const padding = 1.1;
    return Math.min(width, height) / (2 * maxRadius * padding);
  }, [a, width, height]);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="bg-gray-900 rounded-lg">
      <Grid />
      <rect x="0" y="0" width={width} height={height} fill="url(#grid-large)" />
      <g transform={`translate(${width / 2}, ${height / 2}) scale(${scale}, ${-scale})`}>
        {/* X and Y axes */}
        <line x1={-width} y1="0" x2={width} y2="0" stroke="rgba(156, 163, 175, 0.3)" strokeWidth={1 / scale} />
        <line x1="0" y1={-height} x2="0" y2={height} stroke="rgba(156, 163, 175, 0.3)" strokeWidth={1 / scale} />

        <path
          d={pathData}
          stroke="#06b6d4" // cyan-500
          strokeWidth={2.5 / scale} // Keep stroke width visually constant regardless of scale
          fill="rgba(6, 182, 212, 0.1)"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default ParametricCurve;
