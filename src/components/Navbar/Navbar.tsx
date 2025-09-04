import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const navRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};

	// Mouse tracking for interactive effects
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (navRef.current) {
				const rect = navRef.current.getBoundingClientRect();
				setMousePos({ 
					x: e.clientX - rect.left, 
					y: e.clientY - rect.top 
				});
			}
		};

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	return (
		<>
			<div 
				ref={navRef}
				className={`navbar-container ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
			>
				{/* Animated Background Layers */}
				<div className="navbar-bg-primary"></div>
				<div className="navbar-bg-secondary"></div>
				<div className="navbar-bg-tertiary"></div>
				
				{/* Dynamic Mouse Follower */}
				<div 
					className="mouse-glow"
					style={{
						left: mousePos.x - 100,
						top: mousePos.y - 100,
					}}
				></div>

				{/* Floating Geometric Shapes */}
				<div className="geometric-shapes">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="floating-shape"
							style={{
								left: `${15 + i * 15}%`,
								animationDelay: `${i * 0.8}s`,
								animationDuration: `${6 + i}s`
							}}
						/>
					))}
				</div>

				{/* Main Content */}
				<div className='navbar-content'>
					{/* Futuristic Logo Section */}
					<Link href='/' className='logo-link'>
						<div className="logo-container">
							{/* Holographic Frame */}
							<div className="holo-frame">
								<div className="holo-corner holo-corner-tl"></div>
								<div className="holo-corner holo-corner-tr"></div>
								<div className="holo-corner holo-corner-bl"></div>
								<div className="holo-corner holo-corner-br"></div>
							</div>
							
							{/* Logo Text with Advanced Effects */}
							<div className="logo-text-wrapper">
								<h1 className="logo-text">
									{"AUTO CODE".split("").map((char, index) => (
										<span
											key={index}
											className="logo-char"
											style={{
												"--char-index": `${index}`,
												"--total-chars": "9"
											} as React.CSSProperties}
										>
											{char === " " ? (
												<span className="space-char">
													<span className="space-dot"></span>
												</span>
											) : char}
										</span>
									))}
								</h1>
								
								{/* Subtitle */}
								<div className="logo-subtitle">
									<span className="subtitle-text">NEXT GEN CODING</span>
									<div className="subtitle-line"></div>
								</div>
							</div>

							{/* Scanning Lines */}
							<div className="scan-lines">
								<div className="scan-line scan-line-1"></div>
								<div className="scan-line scan-line-2"></div>
							</div>

							{/* Particle Trail */}
							<div className="particle-trail">
								{[...Array(12)].map((_, i) => (
									<div
										key={i}
										className="trail-particle"
										style={{
											animationDelay: `${i * 0.2}s`
										}}
									/>
								))}
							</div>
						</div>
					</Link>

					{/* Enhanced Sign In Button */}
					<div className='auth-section'>
						<button
							className='signin-btn'
							onClick={handleClick}
						>
							{/* Button Background Effects */}
							<div className="btn-bg-layer btn-bg-1"></div>
							<div className="btn-bg-layer btn-bg-2"></div>
							<div className="btn-bg-layer btn-bg-3"></div>
							
							{/* Button Content */}
							<div className="btn-content">
								<span className="btn-text">SIGN IN</span>
								<div className="btn-icon">
									<div className="icon-arrow">→</div>
								</div>
							</div>

							{/* Button Border Effect */}
							<div className="btn-border">
								<div className="border-runner"></div>
							</div>

							{/* Ripple Effect Container */}
							<div className="ripple-container"></div>
						</button>
					</div>
				</div>
			</div>

			<style jsx>{`
				/* Main Navbar Container */
				.navbar-container {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0.5rem 3rem;
					min-height: 90px;
					overflow: hidden;
					transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.navbar-visible {
					transform: translateY(0);
					opacity: 1;
				}

				.navbar-hidden {
					transform: translateY(-100%);
					opacity: 0;
				}

				/* Layered Background Effects */
				.navbar-bg-primary {
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg, 
						rgba(15, 23, 42, 0.95) 0%,
						rgba(30, 41, 59, 0.9) 50%,
						rgba(15, 23, 42, 0.95) 100%);
					backdrop-filter: blur(20px);
					border-bottom: 1px solid rgba(14, 165, 233, 0.2);
				}

				.navbar-bg-secondary {
					position: absolute;
					inset: 0;
					background: linear-gradient(90deg,
						transparent 0%,
						rgba(14, 165, 233, 0.05) 25%,
						rgba(168, 85, 247, 0.05) 75%,
						transparent 100%);
					animation: shimmerFlow 8s ease-in-out infinite;
				}

				.navbar-bg-tertiary {
					position: absolute;
					inset: 0;
					background: 
						radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
						radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
					animation: breathe 6s ease-in-out infinite;
				}

				@keyframes shimmerFlow {
					0%, 100% { transform: translateX(-100%); opacity: 0; }
					50% { transform: translateX(100%); opacity: 1; }
				}

				@keyframes breathe {
					0%, 100% { opacity: 0.3; transform: scale(1); }
					50% { opacity: 0.7; transform: scale(1.02); }
				}

				/* Mouse Follower Glow */
				.mouse-glow {
					position: absolute;
					width: 200px;
					height: 200px;
					border-radius: 50%;
					background: radial-gradient(circle, 
						rgba(14, 165, 233, 0.15) 0%, 
						rgba(168, 85, 247, 0.1) 50%, 
						transparent 70%);
					pointer-events: none;
					transition: all 0.3s ease;
					z-index: 1;
				}

				/* Floating Geometric Shapes */
				.geometric-shapes {
					position: absolute;
					inset: 0;
					pointer-events: none;
					z-index: 2;
				}

				.floating-shape {
					position: absolute;
					width: 8px;
					height: 8px;
					background: linear-gradient(45deg, #00d4ff, #ff00d4);
					clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
					animation: floatShape ease-in-out infinite;
					opacity: 0.6;
				}

				@keyframes floatShape {
					0%, 100% {
						transform: translateY(0) rotate(0deg);
						opacity: 0.6;
					}
					50% {
						transform: translateY(-20px) rotate(180deg);
						opacity: 1;
					}
				}

				/* Main Content */
				.navbar-content {
					position: relative;
					z-index: 10;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					max-width: 1400px;
					margin: 0 auto;
				}

				/* Logo Section */
				.logo-link {
					display: flex;
					align-items: center;
					text-decoration: none;
					position: relative;
				}

				.logo-container {
					position: relative;
					padding: 1rem 2rem;
					cursor: pointer;
					transition: all 0.4s ease;
				}

				.logo-container:hover {
					transform: translateY(-2px) scale(1.02);
				}

				/* Holographic Frame */
				.holo-frame {
					position: absolute;
					inset: 0;
					pointer-events: none;
				}

				.holo-corner {
					position: absolute;
					width: 20px;
					height: 20px;
					border: 2px solid #00d4ff;
					transition: all 0.3s ease;
				}

				.holo-corner-tl {
					top: 0;
					left: 0;
					border-right: none;
					border-bottom: none;
				}

				.holo-corner-tr {
					top: 0;
					right: 0;
					border-left: none;
					border-bottom: none;
				}

				.holo-corner-bl {
					bottom: 0;
					left: 0;
					border-right: none;
					border-top: none;
				}

				.holo-corner-br {
					bottom: 0;
					right: 0;
					border-left: none;
					border-top: none;
				}

				.logo-container:hover .holo-corner {
					border-color: #ff00d4;
					box-shadow: 0 0 15px currentColor;
				}

				/* Logo Text */
				.logo-text-wrapper {
					position: relative;
					z-index: 5;
				}

				.logo-text {
					font-size: 2rem;
					font-weight: 900;
					letter-spacing: 0.2em;
					margin: 0;
					display: flex;
					align-items: center;
					line-height: 1;
				}

				.logo-char {
					display: inline-block;
					background: linear-gradient(45deg, 
						#00d4ff 0%,
						#ff00d4 25%,
						#00ff88 50%,
						#ff6b35 75%,
						#00d4ff 100%);
					background-size: 400% 400%;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					animation: 
						rainbowFlow 4s ease-in-out infinite,
						charFloat 3s ease-in-out infinite;
					animation-delay: calc(var(--char-index) * 0.1s);
					text-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
					position: relative;
				}

				.space-char {
					display: inline-flex;
					align-items: center;
					width: 1rem;
					justify-content: center;
				}

				.space-dot {
					width: 4px;
					height: 4px;
					background: #00d4ff;
					border-radius: 50%;
					animation: dotPulse 2s ease-in-out infinite;
					box-shadow: 0 0 10px currentColor;
				}

				@keyframes rainbowFlow {
					0%, 100% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
				}

				@keyframes charFloat {
					0%, 100% { 
						transform: translateY(0) scale(1); 
						filter: brightness(1);
					}
					50% { 
						transform: translateY(-3px) scale(1.05); 
						filter: brightness(1.2);
					}
				}

				@keyframes dotPulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.5; transform: scale(1.5); }
				}

				/* Subtitle */
				.logo-subtitle {
					position: relative;
					margin-top: 0.5rem;
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}

				.subtitle-text {
					font-size: 0.7rem;
					font-weight: 500;
					letter-spacing: 0.3em;
					color: #64748b;
					text-transform: uppercase;
				}

				.subtitle-line {
					flex: 1;
					height: 1px;
					background: linear-gradient(90deg, #64748b, transparent);
					animation: lineGlow 3s ease-in-out infinite;
				}

				@keyframes lineGlow {
					0%, 100% { opacity: 0.5; }
					50% { opacity: 1; box-shadow: 0 0 5px #64748b; }
				}

				/* Scanning Lines */
				.scan-lines {
					position: absolute;
					inset: 0;
					overflow: hidden;
					pointer-events: none;
				}

				.scan-line {
					position: absolute;
					width: 100%;
					height: 1px;
					background: linear-gradient(90deg, transparent, #00d4ff, transparent);
					animation: scanMove 3s ease-in-out infinite;
				}

				.scan-line-1 {
					top: 30%;
					animation-delay: 0s;
				}

				.scan-line-2 {
					bottom: 30%;
					animation-delay: 1.5s;
				}

				@keyframes scanMove {
					0% { transform: translateX(-100%); opacity: 0; }
					50% { opacity: 1; }
					100% { transform: translateX(100%); opacity: 0; }
				}

				/* Particle Trail */
				.particle-trail {
					position: absolute;
					inset: 0;
					pointer-events: none;
				}

				.trail-particle {
					position: absolute;
					width: 2px;
					height: 2px;
					background: #00d4ff;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					animation: particleTrail 4s linear infinite;
				}

				@keyframes particleTrail {
					0% {
						transform: translate(-50%, -50%) rotate(0deg) translateX(0);
						opacity: 1;
					}
					100% {
						transform: translate(-50%, -50%) rotate(360deg) translateX(100px);
						opacity: 0;
					}
				}

				/* Sign In Button */
				.auth-section {
					position: relative;
					z-index: 10;
				}

				.signin-btn {
					position: relative;
					padding: 1rem 2rem;
					background: transparent;
					border: none;
					border-radius: 12px;
					cursor: pointer;
					overflow: hidden;
					transition: all 0.3s ease;
					min-width: 140px;
					height: 50px;
				}

				.signin-btn:hover {
					transform: translateY(-2px) scale(1.02);
				}

				/* Button Background Layers */
				.btn-bg-layer {
					position: absolute;
					inset: 0;
					border-radius: 12px;
					transition: all 0.3s ease;
				}

				.btn-bg-1 {
					background: linear-gradient(135deg, 
						rgba(15, 23, 42, 0.9) 0%,
						rgba(30, 41, 59, 0.8) 100%);
					backdrop-filter: blur(10px);
				}

				.btn-bg-2 {
					background: linear-gradient(45deg,
						rgba(14, 165, 233, 0.1) 0%,
						rgba(168, 85, 247, 0.1) 100%);
					opacity: 0;
				}

				.btn-bg-3 {
					background: linear-gradient(45deg,
						rgba(255, 107, 53, 0.2) 0%,
						rgba(247, 148, 29, 0.2) 100%);
					opacity: 0;
				}

				.signin-btn:hover .btn-bg-2 {
					opacity: 1;
				}

				.signin-btn:hover .btn-bg-3 {
					opacity: 1;
					animation: energyFlow 0.6s ease-out;
				}

				@keyframes energyFlow {
					0% { transform: scale(0.8) rotate(-10deg); }
					100% { transform: scale(1) rotate(0deg); }
				}

				/* Button Content */
				.btn-content {
					position: relative;
					z-index: 5;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					height: 100%;
				}

				.btn-text {
					font-size: 0.9rem;
					font-weight: 700;
					letter-spacing: 0.1em;
					color: #e2e8f0;
					transition: all 0.3s ease;
				}

				.btn-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: rgba(14, 165, 233, 0.2);
					transition: all 0.3s ease;
				}

				.icon-arrow {
					color: #00d4ff;
					font-size: 0.8rem;
					transition: all 0.3s ease;
				}

				.signin-btn:hover .btn-text {
					color: #00d4ff;
					text-shadow: 0 0 10px currentColor;
				}

				.signin-btn:hover .btn-icon {
					background: rgba(0, 212, 255, 0.3);
					transform: rotate(90deg) scale(1.2);
				}

				.signin-btn:hover .icon-arrow {
					transform: translateX(2px);
				}

				/* Button Border Effect */
				.btn-border {
					position: absolute;
					inset: -1px;
					border-radius: 12px;
					padding: 1px;
					background: linear-gradient(45deg, transparent, #00d4ff, transparent);
					opacity: 0;
					transition: opacity 0.3s ease;
				}

				.signin-btn:hover .btn-border {
					opacity: 1;
					animation: borderFlow 2s ease-in-out infinite;
				}

				.border-runner {
					position: absolute;
					inset: 0;
					border-radius: 12px;
					background: transparent;
					border: 1px solid transparent;
					background-clip: padding-box;
				}

				@keyframes borderFlow {
					0%, 100% { 
						background: linear-gradient(45deg, transparent, #00d4ff, transparent);
					}
					50% { 
						background: linear-gradient(45deg, transparent, #ff00d4, transparent);
					}
				}

				/* Ripple Effect */
				.ripple-container {
					position: absolute;
					inset: 0;
					border-radius: 12px;
					overflow: hidden;
					pointer-events: none;
				}

				.signin-btn:active .ripple-container::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					width: 0;
					height: 0;
					border-radius: 50%;
					background: rgba(0, 212, 255, 0.3);
					transform: translate(-50%, -50%);
					animation: ripple 0.6s ease-out;
				}

				@keyframes ripple {
					to {
						width: 200px;
						height: 200px;
						opacity: 0;
					}
				}

				/* Responsive Design */
				@media (max-width: 1024px) {
					.navbar-container {
						padding: 0.5rem 2rem;
						min-height: 80px;
					}
					
					.logo-text {
						font-size: 1.8rem;
					}
				}

				@media (max-width: 768px) {
					.navbar-container {
						padding: 0.5rem 1rem;
						min-height: 70px;
					}
					
					.logo-text {
						font-size: 1.5rem;
						letter-spacing: 0.1em;
					}
					
					.logo-container {
						padding: 0.8rem 1.5rem;
					}
					
					.signin-btn {
						padding: 0.8rem 1.5rem;
						min-width: 120px;
						height: 45px;
					}
					
					.logo-subtitle {
						display: none;
					}
				}

				@media (max-width: 640px) {
					.logo-text {
						font-size: 1.2rem;
					}
					
					.logo-container {
						padding: 0.6rem 1rem;
					}
					
					.signin-btn {
						padding: 0.7rem 1.2rem;
						min-width: 100px;
						height: 40px;
					}
					
					.btn-text {
						font-size: 0.8rem;
					}
					
					.geometric-shapes {
						display: none;
					}
				}

				@media (max-width: 480px) {
					.navbar-container {
						min-height: 60px;
					}
					
					.logo-text {
						font-size: 1rem;
					}
					
					.mouse-glow {
						display: none;
					}
					
					.particle-trail {
						display: none;
					}
				}
			`}</style>
		</>
	);
};

export default Navbar;