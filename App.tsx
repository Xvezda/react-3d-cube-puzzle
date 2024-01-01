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
    <>
      <CornerLink />
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
    </>
  );
}

function CornerLink() {
  return (
    <a href="https://github.com/Xvezda/react-3d-cube-puzzle" target="_blank" rel="noopener noreferrer">
      <svg
        width={80}
        height={80}
        aria-hidden="true"
        style={{
          fill: "#151513",
          color: "#fff",
          position: "absolute",
          top: 0,
          border: 0,
          right: 0,
        }}
        viewBox="0 0 250 250"
      >
        <path d="m0 0 115 115h15l12 27 108 108V0Z" />
        <path
          fill="currentColor"
          d="M128.3 109c-14.5-9.3-9.3-19.4-9.3-19.4 3-6.9 1.5-11 1.5-11-1.3-6.6 2.9-2.3 2.9-2.3 3.9 4.6 2.1 11 2.1 11-2.6 10.3 5.1 14.6 8.9 15.9"
          className="octo-arm"
          style={{
            transformOrigin: "130px 106px",
          }}
        />
        <path
          fill="currentColor"
          d="M115 115c-.1.1 3.7 1.5 4.8.4l13.9-13.8c3.2-2.4 6.2-3.2 8.5-3-8.4-10.6-14.7-24.2 1.6-40.6 4.7-4.6 10.2-6.8 15.9-7 .6-1.6 3.5-7.4 11.7-10.9 0 0 4.7 2.4 7.4 16.1 4.3 2.4 8.4 5.6 12.1 9.2 3.6 3.6 6.8 7.8 9.2 12.2 13.7 2.6 16.2 7.3 16.2 7.3-3.6 8.2-9.4 11.1-10.9 11.7-.3 5.8-2.4 11.2-7.1 15.9-16.4 16.4-30 10-40.6 1.6.2 2.8-1 6.8-5 10.8L141 136.5c-1.2 1.2.6 5.4.8 5.3Z"
          className="octo-body"
        />
      </svg>
    </a>
  );
}
