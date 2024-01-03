import { useEffect, useState, useMemo, useRef, MouseEventHandler } from "react";
import { Cube, CubeContext } from "./Cube";
import { useCube, Move, MOVES, ROTATIONS } from "./use-cube";

export function App() {
  const { cube, move } = useCube();

  const [minUnit, _setMinUnit] = useState(50);
  const [unit, setUnit] = useState(50);
  const [isPrime, setIsPrime] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isSquare, setIsSquare] = useState(false);

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

      const newUnit = Math.floor(width / 10);
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
      (props: { children: React.ReactNode } & Record<string, any>) => {
        const handleClick: MouseEventHandler = () => {
          move(`${children.trim()}${isPrime ? "'" : ""}` as Move);
          // FIXME: hacky
          if (isSquare) {
            move(`${children.trim()}${isPrime ? "'" : ""}` as Move);
          }

          setIsSquare(false);

          if (!isLocked) setIsPrime(false);
        };

        const { children, ...restProps } = props;

        return (
          <button
            onClick={handleClick}
            css={{
              border: `1px solid #222`,
              borderRadius: 0,
              background: "#333",
              color: "white",
              fontSize: "1em",
              padding: "1em",
              minWidth: "4em",
              flex: 1,
            }}
            {...restProps}
          >
            {children}
            {isPrime && "'"}
          </button>
        );
      },
    [move, setIsPrime, isPrime, setIsSquare, isSquare, isLocked],
  );

  return (
    <>
      <CornerLink />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          ref={containerRef}
          css={{ width: minUnit * 10, height: unit * 10, maxWidth: "100%" }}
        >
          <CubeContext.Provider value={{ unit }}>
            <Cube data={cube} />
          </CubeContext.Provider>
        </div>

        <div
          css={{
            maxWidth: minUnit * 9,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div css={{ display: "flex" }}>
            {MOVES.map((move) => (
              <ControlButton key={move}>{move}</ControlButton>
            ))}
          </div>
          <div css={{ display: "flex" }}>
            <button
              onClick={() => setIsSquare(!isSquare)}
              css={{
                border: `1px solid #222`,
                borderRadius: 0,
                backgroundColor: isSquare ? "#222" : "#333",
                color: "white",
                fontSize: "1rem",
                padding: "1rem 1.5rem",
                flex: 1,
              }}
            >
              2
            </button>
            {ROTATIONS.map((rotation) => (
              <ControlButton key={rotation}>{rotation}</ControlButton>
            ))}
            <button
              onClick={() => {
                setIsLocked(!isLocked);

                if (isLocked && isPrime) {
                  setIsPrime(false);
                } else {
                  setIsPrime(true);
                }
              }}
              css={{
                border: `1px solid #222`,
                borderRadius: 0,
                backgroundColor: isLocked ? "#222" : "#333",
                color: "white",
                fontSize: "1em",
                padding: "0.75em 1.25em",
                flex: 1,
              }}
            >
              Lock'
            </button>
            <button
              disabled={isLocked}
              onClick={() => setIsPrime(!isPrime)}
              css={{
                border: `1px solid #222`,
                borderRadius: 0,
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
        css={{
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
          css={{
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
