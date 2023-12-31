import { useReducer } from "react";

export function App() {
  return (
    <div>
      <Cube />
    </div>
  );
}

function createCube({ width, height }: { width: number; height: number }) {
  return {
    width,
    height,

    up: createPlane({ width, height, color: "yellow" }),
    down: createPlane({ width, height, color: "white" }),

    front: createPlane({ width, height, color: "red" }),
    back: createPlane({ width, height, color: "orange" }),

    left: createPlane({ width, height, color: "green" }),
    right: createPlane({ width, height, color: "blue" }),
  };
}

function createPlane({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => color),
  );
}

type Plane = string[][];
interface Cube {
  width: number;
  height: number;

  up: Plane;
  down: Plane;

  front: Plane;
  back: Plane;

  left: Plane;
  right: Plane;
}

type Command = 'R' | "R'" | 'U';

function spinClockwise(plane: Plane) {
  return [
    [plane[2][0], plane[1][0], plane[0][0]],
    [plane[2][1], plane[1][1], plane[0][1]],
    [plane[2][2], plane[1][2], plane[0][2]],
  ];
}

function spinCounterClockwise(plane: Plane) {
  return [
    [plane[0][2], plane[1][2], plane[2][2]],
    [plane[0][1], plane[1][1], plane[2][1]],
    [plane[0][0], plane[1][0], plane[2][0]],
  ];
}

const cubeReducer = (cube: Cube, action: { type: Command }) => {
  switch (action.type) {
    case 'R':
      return {
        ...cube,
        right: spinClockwise(cube.right),
        up: [
          [cube.up[0][0], cube.up[0][1], cube.front[0][2]],
          [cube.up[1][0], cube.up[1][1], cube.front[1][2]],
          [cube.up[2][0], cube.up[2][1], cube.front[2][2]],
        ],
        front: [
          [cube.front[0][0], cube.front[0][1], cube.down[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.down[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.down[2][2]],
        ],
        down: [
          [cube.down[0][0], cube.down[0][1], cube.back[0][2]],
          [cube.down[1][0], cube.down[1][1], cube.back[1][2]],
          [cube.down[2][0], cube.down[2][1], cube.back[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.up[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.up[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.up[2][2]],
        ],
      };
    case "R'":
      return {
        ...cube,
        right: spinCounterClockwise(cube.right),
        up: [
          [cube.up[0][0], cube.up[0][1], cube.back[0][2]],
          [cube.up[1][0], cube.up[1][1], cube.back[1][2]],
          [cube.up[2][0], cube.up[2][1], cube.back[2][2]],
        ],
        front: [
          [cube.front[0][0], cube.front[0][1], cube.up[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.up[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.up[2][2]],
        ],
        down: [
          [cube.down[0][0], cube.down[0][1], cube.front[0][2]],
          [cube.down[1][0], cube.down[1][1], cube.front[1][2]],
          [cube.down[2][0], cube.down[2][1], cube.front[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.down[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.down[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.down[2][2]],
        ],
      };
    case 'U':
      return {
        ...cube,
        up: spinClockwise(cube.up),
        front: [
          [cube.right[0][0], cube.right[0][1], cube.right[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.front[2][2]],
        ],
        left: [
          [cube.front[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.left[1][0], cube.left[1][1], cube.left[1][2]],
          [cube.left[2][0], cube.left[2][1], cube.left[2][2]],
        ],
        back: [
          [cube.left[0][0], cube.left[0][1], cube.left[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.back[2][2]],
        ],
        right: [
          [cube.back[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.right[1][0], cube.right[1][1], cube.right[1][2]],
          [cube.right[2][0], cube.right[2][1], cube.right[2][2]],
        ],
      };
    default:
      throw new Error(`Unknown command ${action.type}`);
  }
};

function Cube() {
  const [cube, dispatch] = useReducer(cubeReducer, { width: 3, height: 3 }, createCube);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'U' })}>U</button>
      <button onClick={() => dispatch({ type: 'R' })}>R</button>
      <button onClick={() => dispatch({ type: "R'" })}>R'</button>

      <Plane data={cube.up} />
      <Plane data={cube.front} />
      <Plane data={cube.left} />
      <Plane data={cube.back} />
      <Plane data={cube.right} />
      <Plane data={cube.down} />
    </div>
  );
}

function Plane({ data }: { data: Plane }) {
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
