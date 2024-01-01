import { createContext, useContext, useMemo } from "react";

export type Piece = string;
export type Face = Piece[][];

export interface Cube {
  width: number;
  height: number;

  up: Face;
  down: Face;

  front: Face;
  back: Face;

  left: Face;
  right: Face;
}

class BidirectionalMap<K, V> {
  private map = new Map<K | V, V | K>();

  constructor(entries: [K, V][]) {
    entries.forEach(([key, value]) => this.set(key, value));
  }

  set(key: K, value: V) {
    this.map.set(key, value);
    this.map.set(value, key);
  }

  get(key: K) {
    return this.map.get(key);
  }
}

const COLORS = {
  white: "W",
  yellow: "Y",
  green: "G",
  blue: "B",
  orange: "O",
  red: "R",
} as const;

export const colorTable = new BidirectionalMap(Object.entries(COLORS));

export const CubeContext = createContext({ unit: 50 });

export function Cube({ data }: { data: Cube }) {
  const { unit } = useContext(CubeContext);

  const faceZ = useMemo(() => Math.floor((unit * 3) / 2), [unit]);
  const hiddenFaceZ = useMemo(() => Math.floor(unit * 4), [unit]);

  return (
    <div
      style={{
        width: unit * 3,
        height: unit * 3,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `translateX(${
          unit * 3 + Math.floor(unit / 2)
        }px) translateY(${unit * 3}px) rotateX(-30deg) rotateY(-45deg)`,
      }}
    >
      <Face
        data={data.up}
        style={{ transform: `rotateX(90deg) translateZ(${faceZ}px)` }}
      />
      <Face data={data.front} style={{ transform: `translateZ(${faceZ}px)` }} />
      <Face
        data={data.left}
        style={{ transform: `rotateY(-90deg) translateZ(${faceZ}px)` }}
      />
      <Face
        data={data.back}
        style={{ transform: `rotateY(180deg) translateZ(${faceZ}px)` }}
      />
      <Face
        data={data.right}
        style={{ transform: `rotateY(90deg) translateZ(${faceZ}px)` }}
      />
      <Face
        data={data.down}
        style={{ transform: `rotateX(-90deg) translateZ(${faceZ}px)` }}
      />

      {/** hidden faces clone */}
      <Face
        data={data.left}
        style={{ transform: `rotateY(-90deg) translateZ(${hiddenFaceZ}px)` }}
      />
      <Face
        data={data.back}
        style={{ transform: `rotateY(180deg) translateZ(${hiddenFaceZ}px)` }}
      />
      <Face
        data={data.down}
        style={{
          transform: `rotateX(-90deg) translateZ(${hiddenFaceZ - 20}px)`,
        }}
      />
    </div>
  );
}

export function Face({ data, style }: { data: Face; style?: any }) {
  const { unit } = useContext(CubeContext);

  return (
    <div
      style={{ position: "absolute", backfaceVisibility: "visible", ...style }}
    >
      {data.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((color, j) => (
            <div
              key={[i, j, color].join(":")}
              style={{
                display: "flex",
                width: unit,
                height: unit,
                border: "1px solid black",
                backgroundColor: colorTable.get(color),
                boxSizing: "border-box",
                opacity: 0.9,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function createCube({ width, height }: { width: number; height: number }) {
  return {
    width,
    height,

    up: createFace({ width, height, color: "white" }),
    down: createFace({ width, height, color: "yellow" }),

    front: createFace({ width, height, color: "green" }),
    back: createFace({ width, height, color: "blue" }),

    left: createFace({ width, height, color: "orange" }),
    right: createFace({ width, height, color: "red" }),
  };
}

function createFace({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: keyof typeof COLORS;
}) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => colorTable.get(color)),
  );
}


