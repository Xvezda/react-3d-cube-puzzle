import { Cube } from '../components/Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "B"(cube: Cube) {
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
  },
  "B'"(cube: Cube) {
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
  },
  "B2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["B"](cube), cube);
  },
};
