import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeThreeSum = `function threeSum(nums){
  // Write your code here
};`;

const handlerThreeSum = (userCode: string) => {
  try {
    // 👇 Convert string to executable function
    const fn = eval(`(${userCode})`) as (nums: number[]) => number[][];

    if (typeof fn !== "function") {
      throw new Error("Submitted code is not a valid function.");
    }

    const inputs = [
      [-1, 0, 1, 2, -1, -4],
      [0, 1, 1],
      [0, 0, 0],
    ];
    const outputs = [
      [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
      [],
      [[0, 0, 0]],
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn([...inputs[i]]);

      // Normalize results for deep equality
      const normalize = (triplets: number[][]) =>
        triplets
          .map(t => t.slice().sort((a, b) => a - b))
          .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

      assert.deepStrictEqual(normalize(result), normalize(outputs[i]));
    }

    return true;
  } catch (error: any) {
    console.log("threeSum handler function error");
    throw new Error(error.message || "Error in handler");
  }
};
export const threeSum: Problem = {
  id: "three-sum",
  title: "6. 3Sum",
  problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that 
    <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.
  </p>
  <p class='mt-3'>
    Notice that the solution set must not contain duplicate triplets.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [-1,0,1,2,-1,-4]",
      outputText: "[[-1,-1,2],[-1,0,1]]",
      explanation: "There are two unique triplets that sum to 0.",
    },
    {
      id: 2,
      inputText: "nums = [0,1,1]",
      outputText: "[]",
      explanation: "There is no combination that sums to 0.",
    },
    {
      id: 3,
      inputText: "nums = [0,0,0]",
      outputText: "[[0,0,0]]",
      explanation: "One unique triplet that sums to 0.",
    },
  ],
  constraints: `<li class='mt-2'>
    <code>3 ≤ nums.length ≤ 3000</code>
  </li> <li class='mt-2'>
    <code>-10<sup>5</sup> ≤ nums[i] ≤ 10<sup>5</sup></code>
  </li>`,
  handlerFunction: handlerThreeSum,
  starterCode: starterCodeThreeSum,
  order: 2,
  starterFunctionName: "function threeSum(",
};
