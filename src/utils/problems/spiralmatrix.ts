import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeSpiralMatrix = `function spiralOrder(matrix){
  // Write your code here
};`;

const handlerSpiralMatrix = (userCode: string) => {
  try {
    const fn = eval(`(${userCode})`) as (matrix: number[][]) => number[];

    const inputs = [
      [[1,2,3],[4,5,6],[7,8,9]],
      [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    ];
    const outputs = [
      [1,2,3,6,9,8,7,4,5],
      [1,2,3,4,8,12,11,10,9,5,6,7]
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i].map(r => [...r]));
      assert.deepStrictEqual(result, outputs[i]);
    }

    return true;
  } catch (error: any) {
    console.log("spiralOrder handler function error");
    throw new Error(error.message || "Error in handler");
  }
};

export const spiralMatrix: Problem = {
  id: "spiral-matrix",
  title: "10. Spiral Matrix",
  problemStatement: `<p class='mt-3'>Given an <code>m x n</code> matrix, return all elements of the matrix in spiral order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      outputText: "[1,2,3,6,9,8,7,4,5]",
    },
    {
      id: 2,
      inputText: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
      outputText: "[1,2,3,4,8,12,11,10,9,5,6,7]",
    },
  ],
  constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 ≤ m, n ≤ 10</code></li>
  <li class='mt-2'><code>-100 ≤ matrix[i][j] ≤ 100</code></li>`,
  handlerFunction: handlerSpiralMatrix,
  starterCode: starterCodeSpiralMatrix,
  order: 5,
  starterFunctionName: "function spiralOrder(",
};
