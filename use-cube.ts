import { useReducer, useCallback } from "react";
import { Cube, Face } from "./Cube";

export type Move =
  | "F"
  | "F'"
  | "B"
  | "B'"
  | "U"
  | "U'"
  | "D"
  | "D'"
  | "L"
  | "L'"
  | "R"
  | "R'"
  | "x"
  | "x'"
  | "y"
  | "y'"
  | "z"
  | "z'";

function createCube({ width, height }: { width: number; height: number }) {
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
  color: string;
}) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => color),
  );
}

function turnClockwise(face: Face) {
  return [
    [face[2][0], face[1][0], face[0][0]],
    [face[2][1], face[1][1], face[0][1]],
    [face[2][2], face[1][2], face[0][2]],
  ];
}

function turnCounterClockwise(face: Face) {
  return [
    [face[0][2], face[1][2], face[2][2]],
    [face[0][1], face[1][1], face[2][1]],
    [face[0][0], face[1][0], face[2][0]],
  ];
}

const cubeReducer = (cube: Cube, action: { type: Move }) => {
  switch (action.type) {
    case "L":
      return {
        ...cube,
        left: turnClockwise(cube.left),
        up: [
          [cube.back[2][2], cube.up[0][1], cube.up[0][2]],
          [cube.back[1][2], cube.up[1][1], cube.up[1][2]],
          [cube.back[0][2], cube.up[2][1], cube.up[2][2]],
        ],
        front: [
          [cube.up[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.up[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.up[2][0], cube.front[2][1], cube.front[2][2]],
        ],
        down: [
          [cube.front[0][0], cube.down[0][1], cube.down[0][2]],
          [cube.front[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.front[2][0], cube.down[2][1], cube.down[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.down[2][0]],
          [cube.back[1][0], cube.back[1][1], cube.down[1][0]],
          [cube.back[2][0], cube.back[2][1], cube.down[0][0]],
        ],
      };
    case "L'":
      return {
        ...cube,
        left: turnCounterClockwise(cube.left),
        up: [
          [cube.front[0][0], cube.up[0][1], cube.up[0][2]],
          [cube.front[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.front[2][0], cube.up[2][1], cube.up[2][2]],
        ],
        front: [
          [cube.down[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.down[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.down[2][0], cube.front[2][1], cube.front[2][2]],
        ],
        down: [
          [cube.back[0][2], cube.down[0][1], cube.down[0][2]],
          [cube.back[1][2], cube.down[1][1], cube.down[1][2]],
          [cube.back[2][2], cube.down[2][1], cube.down[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.up[2][0]],
          [cube.back[1][0], cube.back[1][1], cube.up[1][0]],
          [cube.back[2][0], cube.back[2][1], cube.up[0][0]],
        ],
      };
    case "R":
      return {
        ...cube,
        right: turnClockwise(cube.right),
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
          [cube.down[0][0], cube.down[0][1], cube.back[2][0]],
          [cube.down[1][0], cube.down[1][1], cube.back[1][0]],
          [cube.down[2][0], cube.down[2][1], cube.back[0][0]],
        ],
        back: [
          [cube.up[2][2], cube.back[0][1], cube.back[0][2]],
          [cube.up[1][2], cube.back[1][1], cube.back[1][2]],
          [cube.up[0][2], cube.back[2][1], cube.back[2][2]],
        ],
      };
    case "R'":
      return {
        ...cube,
        right: turnCounterClockwise(cube.right),
        up: [
          [cube.up[0][0], cube.up[0][1], cube.back[2][0]],
          [cube.up[1][0], cube.up[1][1], cube.back[1][0]],
          [cube.up[2][0], cube.up[2][1], cube.back[0][0]],
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
          [cube.down[2][2], cube.back[0][1], cube.back[0][2]],
          [cube.down[1][2], cube.back[1][1], cube.back[1][2]],
          [cube.down[0][2], cube.back[2][1], cube.back[2][2]],
        ],
      };
    case "U":
      return {
        ...cube,
        up: turnClockwise(cube.up),
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
    case "U'":
      return {
        ...cube,
        up: turnCounterClockwise(cube.up),
        front: [
          [cube.left[0][0], cube.left[0][1], cube.left[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.front[2][2]],
        ],
        left: [
          [cube.back[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.left[1][0], cube.left[1][1], cube.left[1][2]],
          [cube.left[2][0], cube.left[2][1], cube.left[2][2]],
        ],
        back: [
          [cube.right[0][0], cube.right[0][1], cube.right[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.back[2][2]],
        ],
        right: [
          [cube.front[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.right[1][0], cube.right[1][1], cube.right[1][2]],
          [cube.right[2][0], cube.right[2][1], cube.right[2][2]],
        ],
      };
    case "D":
      return {
        ...cube,
        down: turnClockwise(cube.down),
        front: [
          [cube.front[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.left[2][0], cube.left[2][1], cube.left[2][2]],
        ],
        left: [
          [cube.left[0][0], cube.left[0][1], cube.left[0][2]],
          [cube.left[1][0], cube.left[1][1], cube.left[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.back[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.right[2][0], cube.right[2][1], cube.right[2][2]],
        ],
        right: [
          [cube.right[0][0], cube.right[0][1], cube.right[0][2]],
          [cube.right[1][0], cube.right[1][1], cube.right[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.front[2][2]],
        ],
      };
    case "D'":
      return {
        ...cube,
        down: turnCounterClockwise(cube.down),
        front: [
          [cube.front[0][0], cube.front[0][1], cube.front[0][2]],
          [cube.front[1][0], cube.front[1][1], cube.front[1][2]],
          [cube.right[2][0], cube.right[2][1], cube.right[2][2]],
        ],
        left: [
          [cube.left[0][0], cube.left[0][1], cube.left[0][2]],
          [cube.left[1][0], cube.left[1][1], cube.left[1][2]],
          [cube.front[2][0], cube.front[2][1], cube.front[2][2]],
        ],
        back: [
          [cube.back[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.back[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.left[2][0], cube.left[2][1], cube.left[2][2]],
        ],
        right: [
          [cube.right[0][0], cube.right[0][1], cube.right[0][2]],
          [cube.right[1][0], cube.right[1][1], cube.right[1][2]],
          [cube.back[2][0], cube.back[2][1], cube.back[2][2]],
        ],
      };
    case "F":
      return {
        ...cube,
        front: turnClockwise(cube.front),
        up: [
          [cube.up[0][0], cube.up[0][1], cube.up[0][2]],
          [cube.up[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.left[2][2], cube.left[1][2], cube.left[0][2]],
        ],
        right: [
          [cube.up[2][0], cube.right[0][1], cube.right[0][2]],
          [cube.up[2][1], cube.right[1][1], cube.right[1][2]],
          [cube.up[2][2], cube.right[2][1], cube.right[2][2]],
        ],
        down: [
          [cube.right[2][0], cube.right[1][0], cube.right[0][0]],
          [cube.down[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.down[2][0], cube.down[2][1], cube.down[2][2]],
        ],
        left: [
          [cube.left[0][0], cube.left[0][1], cube.down[0][0]],
          [cube.left[1][0], cube.left[1][1], cube.down[0][1]],
          [cube.left[2][0], cube.left[2][1], cube.down[0][2]],
        ],
      };
    case "F'":
      return {
        ...cube,
        front: turnCounterClockwise(cube.front),
        up: [
          [cube.up[0][0], cube.up[0][1], cube.up[0][2]],
          [cube.up[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.right[0][0], cube.right[1][0], cube.right[2][0]],
        ],
        right: [
          [cube.down[0][2], cube.right[0][1], cube.right[0][2]],
          [cube.down[0][1], cube.right[1][1], cube.right[1][2]],
          [cube.down[0][0], cube.right[2][1], cube.right[2][2]],
        ],
        down: [
          [cube.left[0][2], cube.left[1][2], cube.left[2][2]],
          [cube.down[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.down[2][0], cube.down[2][1], cube.down[2][2]],
        ],
        left: [
          [cube.left[0][0], cube.left[0][1], cube.up[2][2]],
          [cube.left[1][0], cube.left[1][1], cube.up[2][1]],
          [cube.left[2][0], cube.left[2][1], cube.up[2][0]],
        ],
      };
    case "B":
      return {
        ...cube,
        back: turnClockwise(cube.back),
        up: [
          [cube.right[0][2], cube.right[1][2], cube.right[2][2]],
          [cube.up[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.up[2][0], cube.up[2][1], cube.up[2][2]],
        ],
        right: [
          [cube.right[0][0], cube.right[0][1], cube.down[2][2]],
          [cube.right[1][0], cube.right[1][1], cube.down[2][1]],
          [cube.right[2][0], cube.right[2][1], cube.down[2][0]],
        ],
        down: [
          [cube.down[0][0], cube.down[0][1], cube.down[0][2]],
          [cube.down[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.left[0][0], cube.left[1][0], cube.left[2][0]],
        ],
        left: [
          [cube.up[0][2], cube.left[0][1], cube.left[0][2]],
          [cube.up[0][1], cube.left[1][1], cube.left[1][2]],
          [cube.up[0][0], cube.left[2][1], cube.left[2][2]],
        ],
      };
    case "B'":
      return {
        ...cube,
        back: turnCounterClockwise(cube.back),
        up: [
          [cube.left[2][0], cube.left[1][0], cube.left[0][0]],
          [cube.up[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.up[2][0], cube.up[2][1], cube.up[2][2]],
        ],
        right: [
          [cube.right[0][0], cube.right[0][1], cube.up[0][0]],
          [cube.right[1][0], cube.right[1][1], cube.up[0][1]],
          [cube.right[2][0], cube.right[2][1], cube.up[0][2]],
        ],
        down: [
          [cube.down[0][0], cube.down[0][1], cube.down[0][2]],
          [cube.down[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.right[2][2], cube.right[1][2], cube.right[0][2]],
        ],
        left: [
          [cube.down[2][0], cube.left[0][1], cube.left[0][2]],
          [cube.down[2][1], cube.left[1][1], cube.left[1][2]],
          [cube.down[2][2], cube.left[2][1], cube.left[2][2]],
        ],
      };
    case "x":
      return {
        ...cube,
        left: turnCounterClockwise(cube.left),
        up: [...cube.front],
        front: [...cube.down],
        down: [
          [cube.back[2][2], cube.back[2][1], cube.back[2][0]],
          [cube.back[1][2], cube.back[1][1], cube.back[1][0]],
          [cube.back[0][2], cube.back[0][1], cube.back[0][0]],
        ],
        back: [
          [cube.up[2][2], cube.up[2][1], cube.up[2][0]],
          [cube.up[1][2], cube.up[1][1], cube.up[1][0]],
          [cube.up[0][2], cube.up[0][1], cube.up[0][0]],
        ],
        right: turnClockwise(cube.right),
      };
    case "x'":
      return {
        ...cube,
        left: turnClockwise(cube.left),
        up: [
          [cube.back[2][2], cube.back[2][1], cube.back[2][0]],
          [cube.back[1][2], cube.back[1][1], cube.back[1][0]],
          [cube.back[0][2], cube.back[0][1], cube.back[0][0]],
        ],
        front: [...cube.up],
        down: [...cube.front],
        back: [
          [cube.down[2][2], cube.down[2][1], cube.down[2][0]],
          [cube.down[1][2], cube.down[1][1], cube.down[1][0]],
          [cube.down[0][2], cube.down[0][1], cube.down[0][0]],
        ],
        right: turnCounterClockwise(cube.right),
      };
    case "y":
      return {
        ...cube,
        up: turnClockwise(cube.up),
        right: [...cube.back],
        front: [...cube.right],
        left: [...cube.front],
        back: [...cube.left],
        down: turnCounterClockwise(cube.down),
      };
    case "y'":
      return {
        ...cube,
        up: turnCounterClockwise(cube.up),
        right: [...cube.front],
        front: [...cube.left],
        left: [...cube.back],
        back: [...cube.right],
        down: turnClockwise(cube.down),
      };
    case "z":
      return {
        ...cube,
        front: turnClockwise(cube.front),
        up: turnClockwise(cube.left),
        left: turnClockwise(cube.down),
        down: turnClockwise(cube.right),
        right: turnClockwise(cube.up),
        back: turnCounterClockwise(cube.back),
      };
    case "z'":
      return {
        ...cube,
        front: turnCounterClockwise(cube.front),
        up: turnCounterClockwise(cube.right),
        left: turnCounterClockwise(cube.up),
        down: turnCounterClockwise(cube.left),
        right: turnCounterClockwise(cube.down),
        back: turnClockwise(cube.back),
      };
    default:
      return cube;
  }
};

export const useCube = () => {
  const [cube, dispatch] = useReducer(
    cubeReducer,
    { width: 3, height: 3 },
    createCube,
  );

  const move = useCallback((move: Move) => {
    dispatch({ type: move });
  }, []);

  return { cube, move };
};
