import { useEffect, useState, useMemo, useRef, MouseEventHandler } from "react";
import { Cube, CubeContext } from "./Cube";
import { useCube, Move } from "./use-cube";

export function App() {
  const { cube, move } = useCube();

  const [minUnit, _setMinUnit] = useState(50);
  const [unit, setUnit] = useState(50);
  const [isPrime, setIsPrime] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      const notation = [
        /[xyz]/i.test(e.key) ? e.key.toLowerCase() : e.key.toUpperCase(),
        e.shiftKey ? "'" : "",
      ].join("");

      move(notation as Move);

      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleResizing = () => {
      if (!containerRef.current) return;

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

  const ControlButton = useMemo(
    () =>
      ({
        children,
        style,
      }: {
        children: string;
        style?: Record<string, any>;
      }) => {
        const handleClick: MouseEventHandler = () => {
          move(`${children.trim()}${isPrime ? "'" : ""}` as Move);
          if (!isLocked) setIsPrime(false);
        };

        return (
          <button
            onClick={handleClick}
            style={{
              border: `1px solid #222`,
              background: "#333",
              color: "white",
              fontSize: "1rem",
              padding: "1rem 1.5rem",
              minWidth: "4rem",

              ...style,
            }}
          >
            {children}
            {isPrime && "'"}
          </button>
        );
      },
    [move, setIsPrime, isPrime],
  );

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
        style={{ width: minUnit * 9, height: unit * 10, maxWidth: "100%" }}
      >
        <CubeContext.Provider value={{ unit }}>
          <Cube data={cube} />
        </CubeContext.Provider>
      </div>

      <div
        style={{
          maxWidth: minUnit * 9,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <ControlButton>F</ControlButton>
          <ControlButton>B</ControlButton>
          <ControlButton>U</ControlButton>
          <ControlButton>D</ControlButton>
          <ControlButton>L</ControlButton>
          <ControlButton>R</ControlButton>
        </div>
        <div style={{ display: "flex" }}>
          <ControlButton>x</ControlButton>
          <ControlButton>y</ControlButton>
          <ControlButton>z</ControlButton>
          <button
            onClick={() => {
              setIsLocked(!isLocked);
              setIsPrime(!isPrime);
            }}
            style={{
              border: `1px solid #222`,
              backgroundColor: isLocked ? "#222" : "#333",
              color: "white",
              fontSize: "1rem",
              padding: "1rem 1.5rem",
              flex: 1,
            }}
          >
            Lock'
          </button>
          <button
            disabled={isLocked}
            onClick={() => setIsPrime(!isPrime)}
            style={{
              border: `1px solid #222`,
              backgroundColor:
                isLocked ?
                  "#555" :
                  isPrime ?
                    "#222" :
                    "#333",
              color: "white",
              fontSize: "1rem",
              padding: "1rem 1.5rem",
              flex: 1,
            }}
          >
            '
          </button>
        </div>
      </div>
    </div>
  );
}
