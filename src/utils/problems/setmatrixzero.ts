import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeSetMatrixZeroes = `function setZeroes(matrix){
  // Write your code here
};`;

const handlerSetMatrixZeroes = (userCode: string) => {
  try {
    const fn = eval(`(${userCode})`) as (matrix: number[][]) => void;

    const inputs = [
      [[1,1,1],[1,0,1],[1,1,1]],
      [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    ];
    const outputs = [
      [[1,0,1],[0,0,0],[1,0,1]],
      [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    ];

    for (let i = 0; i < inputs.length; i++) {
      const matrix = inputs[i].map(r => [...r]);
      fn(matrix);
      assert.deepStrictEqual(matrix, outputs[i]);
    }

    return true;
  } catch (error: any) {
    console.log("setZeroes handler function error");
    throw new Error(error.message || "Error in handler");
  }
};

export const setMatrixZeroes: Problem = {
  id: "set-matrix-zeroes",
  title: "11. Set Matrix Zeroes",
  problemStatement: `<p class='mt-3'>Given an <code>m x n</code> integer matrix <code>matrix</code>, if an element is <code>0</code>, 
  set its entire row and column to <code>0</code>'s.</p>
  <p>You must do it in place.</p>`,
  examples: [
    {
      id: 1,
      inputText: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      outputText: "[[1,0,1],[0,0,0],[1,0,1]]",
    },
    {
      id: 2,
      inputText: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
      outputText: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
    },
  ],
  constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[0].length</code></li>
  <li class='mt-2'><code>1 ≤ m, n ≤ 200</code></li>
  <li class='mt-2'><code>-2<sup>31</sup> ≤ matrix[i][j] ≤ 2<sup>31</sup>-1</code></li>`,
  handlerFunction: handlerSetMatrixZeroes,
  starterCode: starterCodeSetMatrixZeroes,
  order: 6,
  starterFunctionName: "function setZeroes(",
};
