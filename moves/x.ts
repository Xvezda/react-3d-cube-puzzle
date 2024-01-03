import { Cube } from '../Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "x"(cube: Cube) {
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
  },
  "x'"(cube: Cube) {
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
  },
  "x2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["x"](cube), cube);
  },
};
