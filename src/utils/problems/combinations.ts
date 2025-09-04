import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeCombinations = `function combine(n, k){
  // Write your code here
};`;

const handlerCombinations = (userCode: string) => {
  try {
    const fn = eval(`(${userCode})`) as (n: number, k: number) => number[][];

    const inputs = [
      { n: 4, k: 2 },
      { n: 3, k: 3 }
    ];
    const outputs = [
      [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],
      [[1,2,3]]
    ];

    const normalize = (arr: number[][]) =>
      arr.map(a => [...a]).sort((a,b) => a.toString().localeCompare(b.toString()));

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i].n, inputs[i].k);
      assert.deepStrictEqual(normalize(result), normalize(outputs[i]));
    }

    return true;
  } catch (error: any) {
    console.log("combine handler function error");
    throw new Error(error.message || "Error in handler");
  }
};

export const combinations: Problem = {
  id: "combinations",
  title: "9. Combinations",
  problemStatement: `<p class='mt-3'>Given two integers <code>n</code> and <code>k</code>, 
  return all possible combinations of <code>k</code> numbers out of the range <code>[1, n]</code>.</p>`,
  examples: [
    {
      id: 1,
      inputText: "n = 4, k = 2",
      outputText: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
    },
    {
      id: 2,
      inputText: "n = 3, k = 3",
      outputText: "[[1,2,3]]",
    },
  ],
  constraints: `<li class='mt-2'><code>1 ≤ n ≤ 20</code></li>
  <li class='mt-2'><code>1 ≤ k ≤ n</code></li>`,
  handlerFunction: handlerCombinations,
  starterCode: starterCodeCombinations,
  order: 3,
  starterFunctionName: "function combine(",
};
