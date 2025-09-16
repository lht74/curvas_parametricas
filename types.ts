export interface ParametricCurveProps {
  a: number;
  b: number;
  h: number;
  width: number;
  height: number;
}

export interface ControlPanelProps {
  a: number;
  setA: (value: number) => void;
  b: number;
  setB: (value: number) => void;
  k: number;
  isAnimating: boolean;
  toggleAnimation: () => void;
  reset: () => void;
}

export interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
}
