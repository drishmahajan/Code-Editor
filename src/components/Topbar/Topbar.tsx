import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

import Timer from "../Skeletons/Timer/Timer";
import Logout from "../Buttons/Logout";

import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProblemChange = (isForward: boolean) => {
    const currentProblem = problems[router.query.pid as string] as Problem;
    if (!currentProblem) return;

    const direction = isForward ? 1 : -1;
    const nextOrder = currentProblem.order + direction;

    const allOrders = Object.values(problems).map((p) => p.order);
    const minOrder = Math.min(...allOrders);
    const maxOrder = Math.max(...allOrders);

    let targetOrder: number;
    if (nextOrder > maxOrder) {
      targetOrder = minOrder;
    } else if (nextOrder < minOrder) {
      targetOrder = maxOrder;
    } else {
      targetOrder = nextOrder;
    }

    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === targetOrder
    );

    if (nextProblemKey) {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <>
      <nav className="relative flex h-[60px] w-full shrink-0 items-center px-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-background"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Glow */}
        <div 
          className="pointer-events-none absolute w-96 h-96 bg-gradient-radial from-cyan-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className={`relative z-10 flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
          {/* Futuristic Logo */}
          <Link href="/" className="h-[28px] flex-1 flex items-center group">
            <div className="logo-container relative">
              {/* Holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              
              <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
                <div className="futuristic-text">
                  {"AUTO CODE".split("").map((char, index) => (
                    <span
                      key={index}
                      className="char-futuristic"
                      style={{
                        // @ts-ignore
                        "--delay": `${index * 0.1}s`
                      } as React.CSSProperties & Record<string, string>}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
                
                {/* Scanning line effect */}
                <div className="scanning-line absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
                  <div className="scan-beam"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Enhanced Problem Navigation */}
          {problemPage && (
            <div className="flex items-center gap-6 flex-1 justify-center">
              <div
                className="nav-button group"
                onClick={() => handleProblemChange(false)}
              >
                <div className="button-glow"></div>
                <FaChevronLeft className="relative z-10 transition-transform group-hover:-translate-x-1" />
              </div>

              <Link
                href="/"
                className="problem-list-btn group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="btn-background"></div>
                <BsList className="relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10 font-medium tracking-wide">Problem List</span>
              </Link>

              <div
                className="nav-button group"
                onClick={() => handleProblemChange(true)}
              >
                <div className="button-glow"></div>
                <FaChevronRight className="relative z-10 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          )}

          {/* Enhanced Right Side */}
          <div className="flex items-center space-x-6 flex-1 justify-end">
            {/* Premium Button */}
            <a
              href="https://buymeacoffee.com/drish"
              target="_blank"
              rel="noreferrer"
              className="premium-btn group relative overflow-hidden"
            >
              <div className="premium-bg"></div>
              <span className="relative z-10 font-semibold tracking-wider">PREMIUM</span>
            </a>

            {/* Auth Section */}
            {!user ? (
              <Link
                href="/auth"
                onClick={() =>
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "login",
                  }))
                }
              >
                <button className="sign-in-btn group relative overflow-hidden">
                  <div className="signin-bg"></div>
                  <span className="relative z-10 font-medium">Sign In</span>
                </button>
              </Link>
            ) : (
              <>
                {problemPage && <Timer />}

                {/* Enhanced Avatar */}
                <div className="avatar-container group relative">
                  <div className="avatar-ring"></div>
                  <div className="avatar-glow"></div>
                  <Image
                    src="/avatar.png"
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="relative z-10 rounded-full border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300"
                  />
                  
                  {/* Enhanced Tooltip */}
                  <div className="avatar-tooltip group-hover:scale-100 scale-0">
                    <div className="tooltip-bg"></div>
                    <p className="relative z-10 text-sm font-medium">{user.email}</p>
                  </div>
                </div>

                <Logout />
              </>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        /* Grid Background */
        .grid-background {
          background-image: 
            linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #00d4ff, #ff00d4);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Futuristic Logo */
        .futuristic-text {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          display: flex;
          text-shadow: 0 0 20px rgba(14, 165, 233, 0.8);
        }

        .char-futuristic {
          display: inline-block;
          color: #00d4ff;
          animation: glitchText 3s ease-in-out infinite var(--delay);
          text-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor;
        }

        @keyframes glitchText {
          0%, 90%, 100% {
            transform: translateY(0) scale(1);
            filter: hue-rotate(0deg);
          }
          5% {
            transform: translateY(-2px) scale(1.05);
            filter: hue-rotate(90deg);
          }
          10% {
            transform: translateY(1px) scale(0.95);
            filter: hue-rotate(180deg);
          }
        }

        /* Scanning Line Effect */
        .scan-beam {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
          animation: scan 3s ease-in-out infinite;
        }

        @keyframes scan {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        /* Navigation Buttons */
        .nav-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          border-color: rgba(14, 165, 233, 0.8);
          transform: translateY(-2px);
        }

        .button-glow {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(45deg, transparent, rgba(14, 165, 233, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-button:hover .button-glow {
          opacity: 1;
          animation: rotateGlow 2s linear infinite;
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Problem List Button */
        .problem-list-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          color: #e2e8f0;
          text-decoration: none;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .problem-list-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
        }

        .btn-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(168, 85, 247, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .problem-list-btn:hover .btn-background {
          opacity: 1;
        }

        /* Premium Button */
        .premium-btn {
          position: relative;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(251, 146, 60, 0.5);
          color: #fb923c;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .premium-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(251, 146, 60, 0.3);
        }

        .premium-bg {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(45deg, rgba(251, 146, 60, 0.1), rgba(245, 101, 101, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .premium-btn:hover .premium-bg {
          opacity: 1;
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        /* Sign In Button */
        .sign-in-btn {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sign-in-btn:hover {
          border-color: rgba(14, 165, 233, 0.8);
          transform: translateY(-1px);
        }

        .signin-bg {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(168, 85, 247, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sign-in-btn:hover .signin-bg {
          opacity: 1;
        }

        /* Avatar Container */
        .avatar-container {
          position: relative;
          cursor: pointer;
        }

        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(45deg, #00d4ff, #ff00d4) border-box;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: rotate 3s linear infinite;
        }

        .avatar-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .avatar-container:hover .avatar-glow {
          opacity: 1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        /* Enhanced Tooltip */
        .avatar-tooltip {
          position: absolute;
          top: 55px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 50;
        }

        .tooltip-bg {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(168, 85, 247, 0.1));
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .futuristic-text {
            font-size: 1rem;
            letter-spacing: 0.1em;
          }
          
          .problem-list-btn span {
            display: none;
          }
          
          .premium-btn {
            padding: 0.5rem 1rem;
          }
        }

        @media (max-width: 640px) {
          .futuristic-text {
            font-size: 0.9rem;
          }
          
          nav {
            padding: 0 1rem;
            height: 50px;
          }
        }
      `}</style>
    </>
  );
};

export default Topbar;