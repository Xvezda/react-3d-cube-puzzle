import { useReducer, useCallback } from "react";
import { createCube, Cube } from '../components/Cube';
import { moves, Move } from '../moves';

export const cubeReducer = (cube: Cube, action: { type: Move }) => {
  return moves[action.type](cube);
};

export const useCube = () => {
  const [cube, dispatch] = useReducer(
    cubeReducer,
    { width: 3, height: 3 },
    createCube,
  );

  const move = useCallback((move: Move) => {
    dispatch({ type: move });
  }, []);

  return { cube, move };
};
