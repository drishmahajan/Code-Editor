import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	
	// Additional state for visual enhancements only
	const [isExecuting, setIsExecuting] = useState<boolean>(false);
	const [codeMetrics, setCodeMetrics] = useState({ lines: 0, chars: 0 });
	const [glitchEffect, setGlitchEffect] = useState<boolean>(false);

	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();

	// Update code metrics for visual display only
	useEffect(() => {
		setCodeMetrics({
			lines: userCode.split('\n').length,
			chars: userCode.length
		});
	}, [userCode]);

	const handleSubmit = async () => {
		if (!user) {
			toast.error("🚫 Neural link required - Please login to submit", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}

		// Visual effects only
		setIsExecuting(true);
		setGlitchEffect(true);

		try {
			// Original logic preserved
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("🎯 Quantum compilation successful! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("⚠️ Quantum entanglement failed - Test cases mismatch detected", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(`💥 System error: ${error.message}`, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		} finally {
			// Visual effects cleanup
			setIsExecuting(false);
			setTimeout(() => setGlitchEffect(false), 500);
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className='flex flex-col relative overflow-hidden'>
			{/* Futuristic background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
			
			{/* Matrix-like code rain effect */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute text-green-400 text-xs font-mono animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${-20 + Math.random() * 120}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${3 + Math.random() * 4}s`
						}}
					>
						{Math.random().toString(2).substr(2, 8)}
					</div>
				))}
			</div>

			{/* Glitch effect overlay */}
			{glitchEffect && (
				<div className="absolute inset-0 z-50 pointer-events-none">
					<div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-ping"></div>
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
				</div>
			)}

			{/* Header with status indicators */}
			<div className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-b border-cyan-500/30">
				<PreferenceNav settings={settings} setSettings={setSettings} />
				
				{/* Code metrics bar */}
				<div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-t border-cyan-500/20">
					<div className="flex items-center space-x-6 text-xs">
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							<span className="text-cyan-300 font-mono">NEURAL LINK: ACTIVE</span>
						</div>
						<div className="text-gray-400 font-mono">
							Lines: <span className="text-cyan-400">{codeMetrics.lines}</span>
						</div>
						<div className="text-gray-400 font-mono">
							Chars: <span className="text-purple-400">{codeMetrics.chars}</span>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<div className={`w-2 h-2 rounded-full animate-pulse ${isExecuting ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
						<span className="text-xs font-mono text-gray-400">
							{isExecuting ? 'PROCESSING...' : 'READY'}
						</span>
					</div>
				</div>
			</div>

			<Split 
				className='h-[calc(100vh-94px)] relative z-10' 
				direction='vertical' 
				sizes={[60, 40]} 
				minSize={60}
				style={{
					background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))'
				}}
			>
				{/* Code editor section */}
				<div className='relative w-full overflow-auto group'>
					{/* Editor glow effect */}
					<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
					
					<div className="relative bg-slate-900/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 m-2 overflow-hidden">
						{/* Editor header */}
						<div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-cyan-500/20">
							<div className="flex items-center space-x-3">
								<div className="flex space-x-1">
									<div className="w-3 h-3 bg-red-400 rounded-full"></div>
									<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
									<div className="w-3 h-3 bg-green-400 rounded-full"></div>
								</div>
								<span className="text-cyan-300 text-sm font-mono">quantum_solver.js</span>
							</div>
							<div className="text-xs text-gray-400 font-mono">
								<span className="text-purple-400">NEURAL</span> COMPILER v2.1
							</div>
						</div>

						{/* Code editor */}
						<div className="relative">
							<CodeMirror
								value={userCode}
								theme={vscodeDark}
								onChange={onChange}
								extensions={[javascript()]}
								style={{ 
									fontSize: settings.fontSize,
									background: 'rgba(15, 23, 42, 0.95)'
								}}
								className="min-h-[400px]"
							/>
							
							{/* Typing indicator */}
							<div className="absolute top-2 right-4 flex items-center space-x-2 opacity-60">
								<div className="w-1 h-4 bg-cyan-400 animate-pulse"></div>
								<span className="text-xs text-cyan-400 font-mono">LIVE</span>
							</div>
						</div>
					</div>
				</div>

				{/* Test cases section */}
				<div className='relative w-full px-5 overflow-auto'>
					{/* Section header */}
					<div className='flex h-12 items-center space-x-6 relative'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer group'>
							<div className='text-lg font-bold leading-5 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text'>
								⚡ TEST MATRIX
							</div>
							<div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full">
								<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>

					{/* Test case tabs */}
					<div className='flex space-x-2 mt-4'>
						{problem.examples.map((example, index) => (
							<div
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
								className={`relative group cursor-pointer transition-all duration-300 ${
									activeTestCaseId === index ? 'scale-105' : 'hover:scale-102'
								}`}
							>
								{/* Glow effect for active tab */}
								{activeTestCaseId === index && (
									<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-50 animate-pulse"></div>
								)}
								
								<div className={`
									relative px-6 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-300
									border backdrop-blur-sm
									${activeTestCaseId === index 
										? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-white shadow-lg' 
										: 'bg-slate-800/50 border-slate-600/50 text-gray-400 hover:text-white hover:border-cyan-400/30'
									}
								`}>
									<span className="relative z-10">
										{activeTestCaseId === index && '◉ '}
										Quantum Test {index + 1}
									</span>
									
									{activeTestCaseId === index && (
										<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
									)}
								</div>
							</div>
						))}
					</div>

					{/* Test case content */}
					<div className='mt-6 space-y-4'>
						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
							<div className="relative">
								<p className='text-sm font-semibold mb-2 text-green-400 flex items-center'>
									<span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
									INPUT PARAMETERS
								</p>
								<div className='w-full rounded-lg border px-4 py-3 bg-slate-800/80 backdrop-blur-sm border-green-500/30 text-green-300 font-mono text-sm relative overflow-hidden'>
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400/50 to-transparent"></div>
									{problem.examples[activeTestCaseId].inputText}
								</div>
							</div>
						</div>

						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
							<div className="relative">
								<p className='text-sm font-semibold mb-2 text-purple-400 flex items-center'>
									<span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
									EXPECTED OUTPUT
								</p>
								<div className='w-full rounded-lg border px-4 py-3 bg-slate-800/80 backdrop-blur-sm border-purple-500/30 text-purple-300 font-mono text-sm relative overflow-hidden'>
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400/50 to-transparent"></div>
									{problem.examples[activeTestCaseId].outputText}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Split>
			
			{/* Enhanced footer */}
			<div className="relative z-10">
				<EditorFooter handleSubmit={handleSubmit} />
			</div>

			{/* Custom styles for animations */}
			<style jsx>{`
				@keyframes matrix-rain {
					0% { transform: translateY(-100vh); opacity: 1; }
					100% { transform: translateY(100vh); opacity: 0; }
				}
				
				@keyframes data-flow {
					0% { transform: translateX(-100%); }
					100% { transform: translateX(100%); }
				}
				
				.animate-matrix-rain {
					animation: matrix-rain 8s linear infinite;
				}
				
				.animate-data-flow {
					animation: data-flow 3s ease-in-out infinite;
				}

				/* Custom scrollbar */
				::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}
				::-webkit-scrollbar-track {
					background: rgba(15, 23, 42, 0.5);
				}
				::-webkit-scrollbar-thumb {
					background: linear-gradient(45deg, #06b6d4, #8b5cf6);
					border-radius: 4px;
				}
				::-webkit-scrollbar-thumb:hover {
					background: linear-gradient(45deg, #0891b2, #7c3aed);
				}
			`}</style>
		</div>
	);
};

export default Playground;