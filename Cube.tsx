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
    <div>
      <Face data={data.up} />
      <Face data={data.front} />
      <Face data={data.left} />
      <Face data={data.back} />
      <Face data={data.right} />
      <Face data={data.down} />
    </div>
  );
}

export function Face({ data }: { data: Face }) {
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
