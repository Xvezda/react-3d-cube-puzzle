import { useEffect, useState, useRef } from "react";
import { Cube, CubeContext } from "./Cube";
import { useCube } from "./use-cube";

export function App() {
  const { cube, move } = useCube();

  const [minUnit, setMinUnit] = useState(50);
  const [unit, setUnit] = useState(50);
  const [isPrime, setIsPrime] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      const notation = [
        /[xyz]/i.test(e.key) ? e.key.toLowerCase() : e.key.toUpperCase(),
        e.shiftKey ? "'" : "",
      ].join("");

      move(notation);

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
    window.addEventListener("resize", handleResizing);
    handleResizing();

    return () => {
      window.removeEventListener("resize", handleResizing);
    };
  }, [minUnit]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        ref={containerRef}
        style={{ width: minUnit * 9, height: minUnit * 10, maxWidth: "100%" }}
      >
        <CubeContext.Provider value={{ unit }}>
          <Cube data={cube} />
        </CubeContext.Provider>
      </div>

      <div style={{ maxWidth: "100%" }}>
        <div style={{ display: "flex", width: "100%" }}>
          <ControlButton onClick={() => isPrime ? move("F'") : move("F")}>F</ControlButton>
          <ControlButton onClick={() => isPrime ? move("B'") : move("B")}>B</ControlButton>
          <ControlButton onClick={() => isPrime ? move("U'") : move("U")}>U</ControlButton>
          <ControlButton onClick={() => isPrime ? move("D'") : move("D")}>D</ControlButton>
          <ControlButton onClick={() => isPrime ? move("L'") : move("L")}>L</ControlButton>
          <ControlButton onClick={() => isPrime ? move("R'") : move("R")}>R</ControlButton>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <ControlButton onClick={() => isPrime ? move("x'") : move("x")}>x</ControlButton>
          <ControlButton onClick={() => isPrime ? move("y'") : move("y")}>y</ControlButton>
          <ControlButton onClick={() => isPrime ? move("z'") : move("z")}>z</ControlButton>
          <ControlButton
            onClick={() => setIsPrime(!isPrime)}
            style={{ flex: 1, backgroundColor: isPrime ? '#222' : '#333' }}
          >
            '
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  children,
  style,
}: {
  onClick: () => void;
  children: string;
  style?: Record<string, any>;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `1px solid #222`,
        background: "#333",
        color: "white",
        padding: "1rem 1.5rem",

        ...style,
      }}
    >
      {children}
    </button>
  );
}
