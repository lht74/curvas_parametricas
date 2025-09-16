import React from 'react';
import type { ControlPanelProps } from '../types';
import Slider from './Slider';

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
  </svg>
);


const ControlPanel: React.FC<ControlPanelProps> = ({
  a,
  setA,
  b,
  setB,
  k,
  isAnimating,
  toggleAnimation,
  reset,
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-cyan-400 border-b-2 border-gray-700 pb-4">Controles</h2>
      
      <Slider
        label="Radio Mayor (a)"
        min={1}
        max={20}
        step={0.1}
        value={a}
        onChange={(e) => setA(parseFloat(e.target.value))}
      />

      <Slider
        label="Radio Menor (b)"
        min={0.1}
        max={10}
        step={0.1}
        value={b}
        onChange={(e) => setB(parseFloat(e.target.value))}
      />

      <div className="bg-gray-900 p-4 rounded-lg text-center space-y-2">
        <p className="text-gray-400 text-sm">Relación (k)</p>
        <p className="text-3xl font-mono text-white">
          k = a/b = <span className="text-cyan-400">{k.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4 pt-4 border-t-2 border-gray-700">
        <button
          onClick={toggleAnimation}
          className="w-16 h-16 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          aria-label={isAnimating ? 'Pausar animación' : 'Iniciar animación'}
        >
          {isAnimating ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
