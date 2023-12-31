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

export function Cube({ data }: { data: Cube }) {
  return (
    <div
      style={{
        width: 150,
        height: 150,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: "translateX(150px) translateY(150px) rotateX(-45deg) rotateY(-45deg)",
      }}
    >
      <Face
        data={data.up}
        style={{ transform: `rotateX(90deg) translateZ(75px)` }}
      />
      <Face data={data.front} style={{ transform: `translateZ(75px)` }} />
      <Face
        data={data.left}
        style={{ transform: `rotateY(-90deg) translateZ(75px)` }}
      />
      <Face
        data={data.back}
        style={{ transform: `rotateY(180deg) translateZ(75px)` }}
      />
      <Face
        data={data.right}
        style={{ transform: `rotateY(90deg) translateZ(75px)` }}
      />
      <Face
        data={data.down}
        style={{ transform: `rotateX(-90deg) translateZ(75px)` }}
      />

      {/** hidden faces clone */}
      <Face
        data={data.left}
        style={{ transform: `rotateY(-90deg) translateZ(225px)` }}
      />
      <Face
        data={data.back}
        style={{ transform: `rotateY(180deg) translateZ(225px)` }}
      />
      <Face
        data={data.down}
        style={{ transform: `rotateX(-90deg) translateZ(300px)` }}
      />
    </div>
  );
}

export function Face({ data, style }: { data: Face; style?: any }) {
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
                width: 50,
                height: 50,
                border: "1px solid black",
                backgroundColor: color,
                boxSizing: 'border-box',
                opacity: 0.9,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
