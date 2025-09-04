import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/reverseLL.jpg";

// LeetCode-style ListNode class
export class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number, next: ListNode | null = null) {
		this.val = val;
		this.next = next;
	}
}

// Handler to run user solution
export const reverseLinkedListHandler = (userCode: string) => {
	try {
		// Safely evaluate user-submitted function
		const fn = eval(`(${userCode})`) as (head: ListNode | null) => ListNode | null;

		// Ensure it's a callable function
		if (typeof fn !== "function") {
			throw new Error("Submitted code is not a valid function.");
		}

		// Test cases
		const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
		const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];

		for (let i = 0; i < tests.length; i++) {
			const list = createLinkedList(tests[i]);
			const result = fn(list);
			assert.deepEqual(getListValues(result), answers[i]);
		}

		return true;
	} catch (error: any) {
		console.error("Error from reverseLinkedListHandler:", error);
		throw new Error(error.message || "Function execution failed.");
	}
};

// Creates a linked list from an array
function createLinkedList(values: number[]): ListNode {
	const head = new ListNode(values[0]);
	let current = head;
	for (let i = 1; i < values.length; i++) {
		const node = new ListNode(values[i]);
		current.next = node;
		current = node;
	}
	return head;
}

// Extracts an array of values from a linked list
function getListValues(head: ListNode | null): number[] {
	const values: number[] = [];
	let current = head;
	while (current !== null) {
		values.push(current.val);
		current = current.next;
	}
	return values;
}

// Starter code (user sees this in the editor)
const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
`;

export const reverseLinkedList: Problem = {
	id: "reverse-linked-list",
	title: "2. Reverse Linked List",
	problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
	examples: [
		{
			id: 0,
			inputText: "head = [1,2,3,4,5]",
			outputText: "[5,4,3,2,1]",
			img: example.src,
		},
		{
			id: 1,
			inputText: "head = [1,2,3]",
			outputText: "[3,2,1]",
		},
		{
			id: 2,
			inputText: "head = [1]",
			outputText: "[1]",
		},
	],
	constraints: `<li class='mt-2'>The number of nodes in the list is in the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
	starterCode: starterCodeReverseLinkedListJS.trim(),
	handlerFunction: reverseLinkedListHandler,
	starterFunctionName: "function reverseLinkedList(",
	order: 2,
};
