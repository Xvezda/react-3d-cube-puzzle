import { Cube } from '../components/Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "L"(cube: Cube) {
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
  },
  "L'"(cube: Cube) {
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
        [cube.back[2][2], cube.down[0][1], cube.down[0][2]],
        [cube.back[1][2], cube.down[1][1], cube.down[1][2]],
        [cube.back[0][2], cube.down[2][1], cube.down[2][2]],
      ],
      back: [
        [cube.back[0][0], cube.back[0][1], cube.up[2][0]],
        [cube.back[1][0], cube.back[1][1], cube.up[1][0]],
        [cube.back[2][0], cube.back[2][1], cube.up[0][0]],
      ],
    };
  },
  "L2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["L"](cube), cube);
  },
};
