import { useEffect } from "react";
import { Cube } from './Cube';
import { useCube } from "./use-cube";

export function App() {
  const { cube, move } = useCube();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }
      switch (e.key) {
        case 'u':
          move('U');
          break;
        case 'U':
          move("U'");
          break;
        case 'd':
          move('D');
          break;
        case 'D':
          move("D'");
          break;
        case 'l':
          move('L');
          break;
        case 'L':
          move("L'");
          break;
        case 'r':
          move('R');
          break;
        case 'R':
          move("R'");
          break;
        case 'f':
          move('F');
          break;
        case 'F':
          move("F'");
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

      <Cube data={cube} />
    </div>
  );
}
