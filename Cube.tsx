export type Piece = string;
export type Plane = Piece[][];

export interface Cube {
  width: number;
  height: number;

  up: Plane;
  down: Plane;

  front: Plane;
  back: Plane;

  left: Plane;
  right: Plane;
}

export function Cube({ data }: { data: Cube }) {
  return (
    <div>
      <Plane data={data.up} />
      <Plane data={data.front} />
      <Plane data={data.left} />
      <Plane data={data.back} />
      <Plane data={data.right} />
      <Plane data={data.down} />
    </div>
  );
}

export function Plane({ data }: { data: Plane }) {
  return (
    <div style={{ marginTop: 10 }}>
      {data.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((color, j) => (
            <div
              key={[i, j, color].join(':')}
              style={{
                display: "flex",
                width: 50,
                height: 50,
                border: "1px solid black",
                backgroundColor: color,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
