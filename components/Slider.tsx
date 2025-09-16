import React from 'react';
import type { SliderProps } from '../types';

const Slider: React.FC<SliderProps> = ({ label, min, max, step, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-md font-medium text-gray-300">{label}</label>
        <span className="text-lg font-mono bg-gray-700 text-cyan-400 px-3 py-1 rounded-md w-20 text-center">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );
};

export default Slider;
