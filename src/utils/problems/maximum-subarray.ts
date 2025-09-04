import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMaxSubArray = `function maxSubArray(nums){
  // Write your code here
}`;

// checks if the user has the correct code
const handlerMaxSubArray = (fn: any) => {
	try {
		const nums = [
			[-2,1,-3,4,-1,2,1,-5,4],
			[1],
			[5,4,-1,7,8],
		];

		const answers = [6, 1, 23];

		// loop all tests to check if the user's code is correct
		for (let i = 0; i < nums.length; i++) {
			// result is the output of the user's function and answer is the expected output
			const result = fn(nums[i]);
			assert.deepStrictEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("maxSubArray handler function error");
		throw new Error(error);
	}
};

export const maxSubArray: Problem = {
	id: "maximum-subarray",
	title: "7. Maximum Subarray",
	problemStatement: `<p class='mt-3'>
  Given an integer array <code>nums</code>, find the contiguous subarray 
  (containing at least one number) which has the largest sum, and return its sum.
</p>`,
	examples: [
		{
			id: 1,
			inputText: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
			outputText: "6",
			explanation: "The subarray [4,-1,2,1] has the largest sum = 6.",
		},
		{
			id: 2,
			inputText: "nums = [1]",
			outputText: "1",
			explanation: "Only one element → sum is 1.",
		},
		{
			id: 3,
			inputText: "nums = [5,4,-1,7,8]",
			outputText: "23",
			explanation: "The entire array has the maximum sum = 23.",
		},
	],
	constraints: `<li class='mt-2'>
  <code>1 ≤ nums.length ≤ 10<sup>5</sup></code>
</li> <li class='mt-2'>
<code>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></code>
</li>`,
	handlerFunction: handlerMaxSubArray,
	starterCode: starterCodeMaxSubArray,
	order: 2,
	starterFunctionName: "function maxSubArray(",
};
