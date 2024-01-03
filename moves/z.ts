import { Cube } from '../Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "z"(cube: Cube) {
    return {
      ...cube,
      front: turnClockwise(cube.front),
      up: turnClockwise(cube.left),
      left: turnClockwise(cube.down),
      down: turnClockwise(cube.right),
      right: turnClockwise(cube.up),
      back: turnCounterClockwise(cube.back),
    };
  },
  "z'"(cube: Cube) {
    return {
      ...cube,
      front: turnCounterClockwise(cube.front),
      up: turnCounterClockwise(cube.right),
      left: turnCounterClockwise(cube.up),
      down: turnCounterClockwise(cube.left),
      right: turnCounterClockwise(cube.down),
      back: turnClockwise(cube.back),
    };
  },
  "z2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["z"](cube), cube);
  },
};
