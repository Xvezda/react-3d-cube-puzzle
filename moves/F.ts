import { Cube } from '../Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "F"(cube: Cube) {
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
  },
  "F'"(cube: Cube) {
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
  },
  "F2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["F"](cube), cube);
  },
};
