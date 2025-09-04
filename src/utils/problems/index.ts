import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { threeSum } from "./three-sum";
import { validParentheses } from "./valid-parentheses";
import { maxSubArray } from "./maximum-subarray";
import { permutations } from "./permutations";
import { combinations } from "./combinations";
import { spiralMatrix } from "./spiralmatrix";
import { firstMissingPositive } from "./missing-positive";
import { setMatrixZeroes } from "./setmatrixzero";


interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"two-sum": twoSum,
	"reverse-linked-list": reverseLinkedList,
	"jump-game": jumpGame,
	"search-a-2d-matrix": search2DMatrix,
	"valid-parentheses": validParentheses,
	"three-sum": threeSum,
	"maximum-subarray": maxSubArray,
	"permutations": permutations,
	"combinations": combinations,
	"missing-positive": firstMissingPositive,
	"spiral-matrix": spiralMatrix,
	"set-matrix-zeroes": setMatrixZeroes,
};
