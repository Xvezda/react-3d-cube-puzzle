import { useEffect, useState, useRef } from "react";
import { Cube, CubeContext } from './Cube';
import { useCube } from "./use-cube";

export function App() {
  const { cube, move } = useCube();
  const [minUnit, setMinUnit] = useState(50);
  const [unit, setUnit] = useState(50);
  const containerRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }
      move(e.key.toUpperCase() + (e.shiftKey ? "'" : ''));

      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleResizing = () => {
      const { width } = containerRef.current.getBoundingClientRect();

      const newUnit = Math.floor(width / 9);
      if (newUnit > minUnit) return;

      setUnit(newUnit);
    };

    // TODO: apply some throttle
    window.addEventListener('resize', handleResizing);
    handleResizing();

    return () => {
      window.removeEventListener('resize', handleResizing);
    };
  }, [minUnit]);

  return (
    <div>
      <div ref={containerRef} style={{ width: minUnit * 9, height: minUnit * 10, maxWidth: '100%' }}>
        <CubeContext.Provider value={{ unit }}>
          <Cube data={cube} />
        </CubeContext.Provider>
      </div>

      <div>
        <button onClick={() => move('U')}>U</button>
        <button onClick={() => move("U'")}>U'</button>
        <button onClick={() => move('D')}>D</button>
        <button onClick={() => move("D'")}>D'</button>
        <button onClick={() => move('L')}>L</button>
        <button onClick={() => move("L'")}>L'</button>
        <button onClick={() => move('R')}>R</button>
        <button onClick={() => move("R'")}>R'</button>
        <button onClick={() => move('F')}>F</button>
        <button onClick={() => move("F'")}>F'</button>
        <button onClick={() => move('B')}>B</button>
        <button onClick={() => move("B'")}>B'</button>
        <button onClick={() => move("x")}>x</button>
        <button onClick={() => move("x'")}>x'</button>
        <button onClick={() => move("y")}>y</button>
        <button onClick={() => move("y'")}>y'</button>
        <button onClick={() => move("z")}>z</button>
        <button onClick={() => move("z'")}>z'</button>
      </div>
    </div>
  );

