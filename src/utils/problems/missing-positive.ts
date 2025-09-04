import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeFirstMissingPositive = `function firstMissingPositive(nums){
  // Write your code here
};`;

const handlerFirstMissingPositive = (userCode: string) => {
  try {
    const fn = eval(`(${userCode})`) as (nums: number[]) => number;

    const inputs = [
      [1,2,0],
      [3,4,-1,1],
      [7,8,9,11,12],
    ];
    const outputs = [
      3,
      2,
      1,
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn([...inputs[i]]);
      assert.strictEqual(result, outputs[i]);
    }

    return true;
  } catch (error: any) {
    console.log("firstMissingPositive handler function error");
    throw new Error(error.message || "Error in handler");
  }
};

export const firstMissingPositive: Problem = {
  id: "first-missing-positive",
  title: "9. First Missing Positive",
  problemStatement: `<p class='mt-3'>Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer.</p>
  <p>You must implement an algorithm that runs in <code>O(n)</code> time and uses constant extra space.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [1,2,0]",
      outputText: "3",
    },
    {
      id: 2,
      inputText: "nums = [3,4,-1,1]",
      outputText: "2",
    },
    {
      id: 3,
      inputText: "nums = [7,8,9,11,12]",
      outputText: "1",
    },
  ],
  constraints: `<li class='mt-2'><code>1 ≤ nums.length ≤ 5 * 10^5</code></li>
  <li class='mt-2'><code>-2<sup>31</sup> ≤ nums[i] ≤ 2<sup>31</sup>-1</code></li>`,
  handlerFunction: handlerFirstMissingPositive,
  starterCode: starterCodeFirstMissingPositive,
  order: 7,
  starterFunctionName: "function firstMissingPositive(",
};
