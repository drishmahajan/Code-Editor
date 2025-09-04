import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
	const [user] = useAuthState(auth);
	const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
	const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);

	const returnUserDataAndProblemData = async (transaction: any) => {
		const userRef = doc(firestore, "users", user!.uid);
		const problemRef = doc(firestore, "problems", problem.id);
		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);
		return { userDoc, problemDoc, userRef, problemRef };
	};

	const handleLike = async () => {
		if (!user) {
			toast.error("Please login to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				const userData = userDoc.data();
				const likedProblems = Array.isArray(userData.likedProblems) ? userData.likedProblems : [];
				const dislikedProblems = Array.isArray(userData.dislikedProblems) ? userData.dislikedProblems : [];

				if (liked) {
					transaction.update(userRef, {
						likedProblems: likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
					setData((prev) => ({ ...prev, liked: false }));
				} else if (disliked) {
					transaction.update(userRef, {
						likedProblems: [...likedProblems, problem.id],
						dislikedProblems: dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, liked: true, disliked: false }));
				} else {
					transaction.update(userRef, {
						likedProblems: [...likedProblems, problem.id],
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
					setData((prev) => ({ ...prev, liked: true }));
				}
			}
		});

		setUpdating(false);
	};

	const handleDislike = async () => {
		if (!user) {
			toast.error("Please login to dislike a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				const userData = userDoc.data();
				const likedProblems = Array.isArray(userData.likedProblems) ? userData.likedProblems : [];
				const dislikedProblems = Array.isArray(userData.dislikedProblems) ? userData.dislikedProblems : [];

				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...dislikedProblems, problem.id],
						likedProblems: likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});

		setUpdating(false);
	};

	const handleStar = async () => {
		if (!user) {
			toast.error("Please login to star a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};

	return (
		<div className='bg-slate-900'>
			{/* Simple enhanced TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-slate-800 text-white overflow-x-hidden'>
				<div className="bg-slate-700 rounded-t-lg px-5 py-[10px] text-xs cursor-pointer border-t-2 border-cyan-500">
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5 w-full'>
					{/* Clean problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4 mb-4'>
							<div className='flex-1 mr-2 text-xl text-white font-semibold'>{problem?.title}</div>
						</div>
						
						{!loading && currentProblem && (
							<div className='flex items-center mt-3 space-x-3'>
								<div className={`${problemDifficultyClass} inline-block rounded-full bg-opacity-[.15] px-3 py-1 text-xs font-medium capitalize border`}>
									{currentProblem.difficulty}
								</div>
								
								{(solved || _solved) && (
									<div className='rounded-full p-2 bg-green-500/10 text-green-400 border border-green-500/30'>
										<BsCheck2Circle className="text-lg" />
									</div>
								)}
								
								<div className={`
									flex items-center cursor-pointer space-x-2 rounded-full px-3 py-2 text-sm transition-colors duration-200
									${liked ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'bg-slate-700/50 text-gray-400 hover:bg-slate-600 hover:text-white'}
								`} onClick={handleLike}>
									{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiFillLike />}
									<span>{currentProblem.likes}</span>
								</div>
								
								<div className={`
									flex items-center cursor-pointer space-x-2 rounded-full px-3 py-2 text-sm transition-colors duration-200
									${disliked ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-slate-700/50 text-gray-400 hover:bg-slate-600 hover:text-white'}
								`} onClick={handleDislike}>
									{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiFillDislike />}
									<span>{currentProblem.dislikes}</span>
								</div>
								
								<div className={`
									cursor-pointer rounded-full p-2 text-lg transition-colors duration-200
									${starred ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' : 'bg-slate-700/50 text-gray-400 hover:bg-slate-600 hover:text-white'}
								`} onClick={handleStar}>
									{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : starred ? <AiFillStar /> : <TiStarOutline />}
								</div>
							</div>
						)}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement */}
						<div className='text-white text-sm mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700'>
							<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
						</div>

						{/* Examples */}
						<div className='mt-6'>
							{problem.examples.map((example, index) => (
								<div key={example.id} className="mb-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
									<p className='font-medium text-white mb-3'>Example {index + 1}:</p>
									{example.img && <img src={example.img} alt='' className='mt-3 rounded-lg' />}
									<div className='bg-slate-900/50 rounded-lg p-4 border border-slate-600/30'>
										<pre className="text-sm text-gray-300">
											<strong className='text-green-400'>Input:</strong> {example.inputText}
											<br />
											<strong className="text-blue-400">Output:</strong> {example.outputText}
											<br />
											{example.explanation && (
												<>
													<strong className="text-purple-400">Explanation:</strong> {example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-8 pb-4 bg-slate-800/30 rounded-lg p-4 border border-slate-700'>
							<div className='text-white text-sm font-medium mb-2'>Constraints:</div>
							<ul className='text-gray-300 ml-5 list-disc text-sm'>
								<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore, "problems", problemId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty === "Easy"
						? "bg-green-500/10 text-green-400 border-green-500/30"
						: problem.difficulty === "Medium"
						? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
						: "bg-red-500/10 text-red-400 border-red-500/30"
				);
			}
			setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
				setData({
					liked: Array.isArray(likedProblems) ? likedProblems.includes(problemId) : false,
					disliked: Array.isArray(dislikedProblems) ? dislikedProblems.includes(problemId) : false,
					starred: Array.isArray(starredProblems) ? starredProblems.includes(problemId) : false,
					solved: Array.isArray(solvedProblems) ? solvedProblems.includes(problemId) : false,
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}