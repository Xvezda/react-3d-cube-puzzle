import { Cube } from "../components/Cube";

import F from "./F";
import B from "./B";
import U from "./U";
import D from "./D";
import L from "./L";
import R from "./R";
import x from './x';
import y from './y';
import z from './z';

export const MOVES = ["F", "B", "U", "D", "L", "R"] as const;

export const OPPOSITE_MOVES = MOVES.map((move) => `${move}'` as const);

export const DOUBLE_MOVES = MOVES.map((move) => `${move}2` as const);

export const ROTATIONS = ["x", "y", "z"] as const;

export const OPPOSITE_ROTATIONS = ROTATIONS.map((move) => `${move}'` as const);

export const DOUBLE_ROTATIONS = ROTATIONS.map((move) => `${move}2` as const);

export type Move =
  | (typeof MOVES)[number]
  | (typeof OPPOSITE_MOVES)[number]
  | (typeof ROTATIONS)[number]
  | (typeof OPPOSITE_ROTATIONS)[number]
  | (typeof DOUBLE_MOVES)[number]
  | (typeof DOUBLE_ROTATIONS)[number];

export const moves: Record<Move, ((cube: Cube) => Cube)> = {
  ...F,
  ...B,
  ...U,
  ...D,
  ...L,
  ...R,
  ...x,
  ...y,
  ...z,
};
