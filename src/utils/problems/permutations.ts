import assert from "assert";
import { Problem } from "../types/problem";

const starterCodePermutations = `function permute(nums){
  // Write your code here
};`;

const handlerPermutations = (userCode: string) => {
  try {
    const fn = eval(`(${userCode})`) as (nums: number[]) => number[][];

    const inputs = [
      [1,2,3],
      [0,1]
    ];
    const outputs = [
      [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
      [[0,1],[1,0]]
    ];

    const normalize = (arr: number[][]) =>
      arr.map(a => [...a]).sort((a,b) => a.toString().localeCompare(b.toString()));

    for (let i = 0; i < inputs.length; i++) {
      const result = fn([...inputs[i]]);
      assert.deepStrictEqual(normalize(result), normalize(outputs[i]));
    }

    return true;
  } catch (error: any) {
    console.log("permute handler function error");
    throw new Error(error.message || "Error in handler");
  }
};

export const permutations: Problem = {
  id: "permutations",
  title: "8. Permutations",
  problemStatement: `<p class='mt-3'>Given an array <code>nums</code> of distinct integers, return all possible permutations. 
  You can return the answer in <em>any order</em>.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [1,2,3]",
      outputText: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    },
    {
      id: 2,
      inputText: "nums = [0,1]",
      outputText: "[[0,1],[1,0]]",
    },
  ],
  constraints: `<li class='mt-2'><code>1 ≤ nums.length ≤ 6</code></li>
  <li class='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li>
  <li class='mt-2'>All numbers in <code>nums</code> are unique.</li>`,
  handlerFunction: handlerPermutations,
  starterCode: starterCodePermutations,
  order: 2,
  starterFunctionName: "function permute(",
};
