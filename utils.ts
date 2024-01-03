import { Move } from './moves';

export function parseMoves(moves: string) {
  return moves.match(/[UDFBLRxyz][2']?/g) as Move[];
}
