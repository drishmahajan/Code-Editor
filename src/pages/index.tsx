import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { useState, useEffect } from "react";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const [glowIntensity, setGlowIntensity] = useState(0.5);
	const hasMounted = useHasMounted();

	// Dynamic glow effect
	useEffect(() => {
		const interval = setInterval(() => {
			setGlowIntensity(prev => {
				const newIntensity = 0.3 + Math.sin(Date.now() * 0.002) * 0.3;
				return newIntensity;
			});
		}, 50);
		return () => clearInterval(interval);
	}, []);

	if (!hasMounted) return null;

	return (
		<>
			{/* Animated background particles */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
				{[...Array(50)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 3}s`
						}}
					/>
				))}
			</div>

			<main className='relative bg-slate-900 min-h-screen overflow-hidden'>
				{/* Grid overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
				
				<Topbar />
				
				{/* Hero section with dynamic elements */}
				<div className="relative z-10 flex flex-col items-center mt-16 mb-12">
					{/* Animated logo/icon */}
					<div className="mb-6 relative">
						<div 
							className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg"
							style={{
								boxShadow: `0 0 ${30 + glowIntensity * 20}px rgba(6, 182, 212, ${glowIntensity})`
							}}
						>
							<div className="text-2xl animate-spin-slow">⚡</div>
						</div>
						<div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl animate-pulse"></div>
					</div>

					{/* Dynamic title */}
					<h1 className='text-4xl md:text-5xl text-center font-bold uppercase mb-2 relative'>
						<span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
							Quality Over Quantity
						</span>
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70"></div>
					</h1>
					
					{/* Subtitle with typewriter effect */}
					<p className="text-cyan-300 text-lg font-light tracking-wider opacity-80 animate-pulse">
						Elite Problem Collection
					</p>

					{/* Floating arrow indicator */}
					<div className="mt-8 animate-bounce">
						<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
					</div>
				</div>

				{/* Main content area */}
				<div className='relative z-10 overflow-x-auto mx-auto px-6 pb-10'>
					{/* Loading state with futuristic skeletons */}
					{loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full'>
							{[...Array(8)].map((_, idx) => (
								<FuturisticLoadingSkeleton key={idx} delay={idx * 0.1} />
							))}
						</div>
					)}

					{/* Main table container */}
					<div className="relative max-w-[1200px] mx-auto sm:w-7/12 w-full">
						{/* Glowing border effect */}
						<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20 animate-pulse"></div>
						
						<table className='relative bg-slate-800/50 backdrop-blur-sm text-sm text-left text-gray-300 w-full rounded-lg border border-cyan-500/20 shadow-2xl overflow-hidden'>
							{!loadingProblems && (
								<thead className='bg-gradient-to-r from-slate-800 to-slate-700 border-b border-cyan-500/30'>
									<tr>
										{['Status', 'Title', 'Difficulty', 'Category', 'Solution'].map((header, index) => (
											<th key={header} 
												scope='col' 
												className='px-6 py-4 font-semibold text-cyan-300 uppercase tracking-wider relative group'
												style={{ animationDelay: `${index * 0.1}s` }}
											>
												{header}
												<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
											</th>
										))}
									</tr>
								</thead>
							)}
							<ProblemsTable setLoadingProblems={setLoadingProblems} />
						</table>
					</div>
				</div>

				{/* Bottom accent */}
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
			</main>

			{/* Custom styles */}
			<style jsx>{`
				@keyframes spin-slow {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				.animate-spin-slow {
					animation: spin-slow 3s linear infinite;
				}
				
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
				}
				.animate-float {
					animation: float 3s ease-in-out infinite;
				}

				@keyframes shimmer {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
				.animate-shimmer {
					background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent);
					background-size: 200% 100%;
					animation: shimmer 2s ease-in-out infinite;
				}
			`}</style>
		</>
	);
}

const FuturisticLoadingSkeleton = ({ delay = 0 }) => {
	return (
		<div 
			className='flex items-center space-x-6 mt-4 px-6 py-3 relative group'
			style={{ animationDelay: `${delay}s` }}
		>
			{/* Status indicator */}
			<div className='relative'>
				<div className='w-8 h-8 shrink-0 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 animate-pulse relative overflow-hidden'>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -skew-x-12 animate-shimmer"></div>
				</div>
				<div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
			</div>

			{/* Content bars with staggered animations */}
			{[1, 2, 3].map((_, index) => (
				<div key={index} className='relative flex-1 max-w-48'>
					<div 
						className={`h-4 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 relative overflow-hidden animate-pulse`}
						style={{ 
							animationDelay: `${delay + index * 0.2}s`,
							width: `${60 + Math.random() * 40}%`
						}}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -skew-x-12 animate-shimmer"></div>
					</div>
				</div>
			))}

			{/* Scanning line effect */}
			<div className="absolute left-0 top-0 w-full h-full pointer-events-none">
				<div className="w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			</div>

			<span className='sr-only'>Loading quantum data...</span>
		</div>
	);
};