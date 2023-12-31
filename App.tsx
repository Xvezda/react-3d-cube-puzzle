import { useEffect } from "react";
import { Cube } from './Cube';
import { useCube } from "./use-cube";

export function App() {
  const { cube, dispatch } = useCube();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }
      switch (e.key) {
        case 'u':
          dispatch({ type: 'U' });
          break;
        case 'U':
          dispatch({ type: "U'" });
          break;
        case 'r':
          dispatch({ type: 'R' });
          break;
        case 'R':
          dispatch({ type: "R'" });
          break;
      }
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'U' })}>U</button>
      <button onClick={() => dispatch({ type: "U'" })}>U'</button>
      <button onClick={() => dispatch({ type: 'R' })}>R</button>
      <button onClick={() => dispatch({ type: "R'" })}>R'</button>

      <Cube data={cube} />
    </div>
  );
}
