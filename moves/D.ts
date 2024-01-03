import { Cube } from '../Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "D"(cube: Cube) {
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
  },
  "D'"(cube: Cube) {
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
  },
  "D2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["D"](cube), cube);
  },
};
