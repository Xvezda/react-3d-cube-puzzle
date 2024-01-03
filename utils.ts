import { Move } from './moves';

export function parseMoves(moves: string) {
  return moves.match(/[UDFBLR][2']?/g) as Move[];
}
