import { useReducer, useCallback } from 'react';
import { Cube, Face } from './Cube';

type Move = |
  'F' | "F'" |
  'B' | "B'" |
  'U' | "U'" |
  'D' | "D'" |
  'L' | "L'" |
  'R' | "R'";

function createCube({ width, height }: { width: number; height: number }) {
  return {
    width,
    height,

    up: createFace({ width, height, color: "yellow" }),
    down: createFace({ width, height, color: "white" }),

    front: createFace({ width, height, color: "red" }),
    back: createFace({ width, height, color: "orange" }),

    left: createFace({ width, height, color: "green" }),
    right: createFace({ width, height, color: "blue" }),
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
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => color),
  );
}

function spinClockwise(face: Face) {
  return [
    [face[2][0], face[1][0], face[0][0]],
    [face[2][1], face[1][1], face[0][1]],
    [face[2][2], face[1][2], face[0][2]],
  ];
}

function spinCounterClockwise(face: Face) {
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
        left: spinClockwise(cube.left),
        up: [
          [cube.back[0][0], cube.up[0][1], cube.up[0][2]],
          [cube.back[1][0], cube.up[1][1], cube.up[1][2]],
          [cube.back[2][0], cube.up[2][1], cube.up[2][2]],
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
          [cube.down[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.down[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.down[2][0], cube.back[2][1], cube.back[2][2]],
        ],
      };
    case "L'":
      return {
        ...cube,
        left: spinCounterClockwise(cube.left),
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
          [cube.back[0][0], cube.down[0][1], cube.down[0][2]],
          [cube.back[1][0], cube.down[1][1], cube.down[1][2]],
          [cube.back[2][0], cube.down[2][1], cube.down[2][2]],
        ],
        back: [
          [cube.up[0][0], cube.back[0][1], cube.back[0][2]],
          [cube.up[1][0], cube.back[1][1], cube.back[1][2]],
          [cube.up[2][0], cube.back[2][1], cube.back[2][2]],
        ],
      };
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
    case "U'":
      return {
        ...cube,
        up: spinCounterClockwise(cube.up),
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
    case 'D':
      return {
        ...cube,
        down: spinClockwise(cube.down),
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
        down: spinCounterClockwise(cube.down),
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
    case 'F':
      return {
        ...cube,
        front: spinClockwise(cube.front),
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
        front: spinCounterClockwise(cube.front),
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
    default:
      return cube;
  }
};

export const useCube = () => {
  const [cube, dispatch] = useReducer(cubeReducer, { width: 3, height: 3 }, createCube);
  
  const move = useCallback((move: Move) => {
    dispatch({ type: move });
  }, []);

  return { cube, move };
};
