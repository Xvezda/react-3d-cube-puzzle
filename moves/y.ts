import { Cube } from '../components/Cube';
import { turnClockwise, turnCounterClockwise } from "./turn";

export default {
  "y"(cube: Cube) {
    return {
      ...cube,
      up: turnClockwise(cube.up),
      right: [...cube.back],
      front: [...cube.right],
      left: [...cube.front],
      back: [...cube.left],
      down: turnCounterClockwise(cube.down),
    };
  },
  "y'"(cube: Cube) {
    return {
      ...cube,
      up: turnCounterClockwise(cube.up),
      right: [...cube.front],
      front: [...cube.left],
      left: [...cube.back],
      back: [...cube.right],
      down: turnClockwise(cube.down),
    };
  },
  "y2"(cube: Cube) {
    return Array.from({ length: 2 }).reduce<Cube>((cube) => this["y"](cube), cube);
  },
};
