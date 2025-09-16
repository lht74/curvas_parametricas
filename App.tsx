import React, { useState, useCallback, useEffect, useRef } from 'react';
import ParametricCurve from './components/ParametricCurve';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [a, setA] = useState<number>(8);
  const [b, setB] = useState<number>(3);
  const [h, setH] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const animationFrameId = useRef<number>(0);

  const k = a / b;

  const animate = useCallback(() => {
    setH(prevH => (prevH + 0.01) % (2 * Math.PI));
    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isAnimating, animate]);

  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };

  const resetParams = () => {
    setA(8);
    setB(3);
    setH(0);
    if (!isAnimating) setIsAnimating(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <header className="w-full max-w-7xl text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-wide">Visualizador de Curvas Paramétricas</h1>
        <p className="text-lg text-gray-400 mt-2">Explora la belleza de las hipocicloides</p>
      </header>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <main className="flex-grow bg-gray-800/50 rounded-2xl shadow-2xl p-4 flex items-center justify-center aspect-square lg:aspect-auto">
          <ParametricCurve a={a} b={b} h={h} width={800} height={800} />
        </main>
        <aside className="w-full lg:w-96 flex-shrink-0">
          <ControlPanel
            a={a}
            setA={val => setA(Number(val))}
            b={b}
            setB={val => setB(Number(val))}
            k={k}
            isAnimating={isAnimating}
            toggleAnimation={toggleAnimation}
            reset={resetParams}
          />
        </aside>
      </div>
      <footer className="w-full max-w-7xl mt-8 text-center text-gray-500">
        <p>Inspirado en la belleza matemática de las curvas paramétricas.</p>
        <p className="mt-2 text-sm">
          Fórmula: 
          <code className="bg-gray-800 p-1 rounded-md">x(t) = (a-b)cos(t) + b cos((a/b-1)t + h)</code>, 
          <code className="bg-gray-800 p-1 rounded-md">y(t) = (a-b)sin(t) - b sin((a/b-1)t + h)</code>
        </p>
      </footer>
    </div>
  );
};

export default App;
