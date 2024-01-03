import { test, describe, expect } from "vitest";
import { createCube, type Cube } from "../components/Cube";
import { cubeReducer } from "./use-cube";
import { parseMoves } from '../utils';

function solve(cube: Cube, moves: string) {
  return parseMoves(moves).reduce((cube, move) => {
    return cubeReducer(cube, { type: move });
  }, cube);
}

describe("solves", () => {
  test("case 1", () => {
    const cube: Cube = {
      width: 3,
      height: 3,

      front: [
        ["R", "W", "B"],
        ["B", "G", "G"],
        ["Y", "B", "W"],
      ],

      back: [
        ["R", "G", "B"],
        ["Y", "B", "R"],
        ["R", "W", "G"],
      ],

      left: [
        ["W", "R", "Y"],
        ["Y", "O", "R"],
        ["Y", "W", "O"],
      ],

      right: [
        ["O", "W", "G"],
        ["O", "R", "O"],
        ["G", "B", "Y"],
      ],

      up: [
        ["R", "Y", "W"],
        ["G", "W", "G"],
        ["G", "B", "W"],
      ],

      down: [
        ["B", "Y", "O"],
        ["R", "Y", "O"],
        ["O", "O", "B"],
      ],
    };

    const moves = "B'U2L2B'LD'L'D2L'F2R'BU2L2F2D'L2U'B2R2";
    expect(solve(cube, moves)).toStrictEqual(createCube({ width: 3, height: 3 }));
  });

  test("case 2", () => {
    const cube: Cube = {
      width: 3,
      height: 3,

      front: [
        ["Y", "R", "G"],
        ["B", "G", "Y"],
        ["G", "G", "B"],
      ],

      back: [
        ["R", "O", "W"],
        ["Y", "B", "O"],
        ["R", "R", "B"],
      ],

      left: [
        ["G", "W", "B"],
        ["W", "O", "O"],
        ["R", "R", "O"],
      ],

      right: [
        ["W", "R", "B"],
        ["B", "R", "G"],
        ["W", "O", "G"],
      ],

      up: [
        ["R", "G", "Y"],
        ["B", "W", "G"],
        ["O", "Y", "O"],
      ],

      down: [
        ["Y", "W", "O"],
        ["W", "Y", "Y"],
        ["W", "B", "Y"],
      ],
    };

    const moves = "U2R'DLUD2F2UFUFRF2B2R2U'R2U'L2U'";
    expect(solve(cube, moves)).toStrictEqual(createCube({ width: 3, height: 3 }));
  });

  test("case 3", () => {
    const cube: Cube = {
      width: 3,
      height: 3,

      front: [
        ["B", "Y", "O"],
        ["B", "G", "Y"],
        ["O", "W", "Y"],
      ],

      back: [
        ["G", "B", "Y"],
        ["W", "B", "B"],
        ["B", "W", "B"],
      ],

      left: [
        ["R", "R", "Y"],
        ["Y", "O", "R"],
        ["O", "G", "G"],
      ],

      right: [
        ["W", "O", "W"],
        ["R", "R", "G"],
        ["O", "G", "W"],
      ],

      up: [
        ["G", "O", "R"],
        ["W", "W", "G"],
        ["R", "O", "B"],
      ],

      down: [
        ["W", "O", "G"],
        ["R", "Y", "Y"],
        ["Y", "B", "R"],
      ],
    };

    const moves = "BD'FL2B'D'R'DR2LFL'B2R2B2D'B2L2UD2";
    expect(solve(cube, moves)).toStrictEqual(createCube({ width: 3, height: 3 }));
  });

  test("case 4", () => {
    const cube: Cube = {
      width: 3,
      height: 3,

      front: [
        ["W", "O", "G"],
        ["O", "G", "W"],
        ["O", "O", "Y"],
      ],

      back: [
        ["R", "R", "B"],
        ["Y", "B", "O"],
        ["R", "R", "B"],
      ],

      left: [
        ["O", "G", "R"],
        ["G", "O", "Y"],
        ["Y", "R", "G"],
      ],

      right: [
        ["O", "W", "W"],
        ["R", "R", "B"],
        ["B", "W", "G"],
      ],

      up: [
        ["W", "B", "B"],
        ["Y", "W", "G"],
        ["G", "B", "Y"],
      ],

      down: [
        ["W", "W", "O"],
        ["Y", "Y", "B"],
        ["R", "G", "Y"],
      ],
    };

    const moves = "D'B2L2BU'D2B'L'D'RB2D2R2B2U2L2F2U'B2R2";
    expect(solve(cube, moves)).toStrictEqual(createCube({ width: 3, height: 3 }));
  });

  test("case 5", () => {
    const cube: Cube = {
      width: 3,
      height: 3,

      front: [
        ["B", "W", "B"],
        ["R", "G", "R"],
        ["Y", "R", "G"],
      ],

      back: [
        ["O", "O", "G"],
        ["Y", "B", "O"],
        ["W", "G", "B"],
      ],

      left: [
        ["O", "G", "O"],
        ["B", "O", "G"],
        ["W", "O", "B"],
      ],

      right: [
        ["W", "G", "W"],
        ["W", "R", "B"],
        ["R", "Y", "G"],
      ],

      up: [
        ["Y", "Y", "G"],
        ["W", "W", "Y"],
        ["Y", "B", "R"],
      ],

      down: [
        ["R", "B", "Y"],
        ["W", "Y", "R"],
        ["O", "O", "R"],
      ],
    };

    const moves = "B2RBDLBL'FL2B'U'B'R'UB2L2U'DL2B2";
    expect(solve(cube, moves)).toStrictEqual(createCube({ width: 3, height: 3 }));
  });
});
