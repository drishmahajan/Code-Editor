import React, { useState, useEffect } from "react";
import { ChevronUp, Play, Send, Terminal, Zap } from "lucide-react";

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  // Generate floating particles effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    handleSubmit();
    setTimeout(() => setIsRunning(false), 2000);
  };

  const handleSubmitClick = async () => {
    setIsSubmitting(true);
    handleSubmit();
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float-${particle.id % 3} 6s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient backdrop with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md" />
      
      {/* Animated border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />

      <div className="relative flex items-center justify-between px-6 py-4 min-h-[64px]">
        {/* Left section - Console toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setConsoleOpen(!consoleOpen)}
            className={`
              group relative px-4 py-2 rounded-xl font-medium text-sm
              transition-all duration-300 ease-out
              border border-slate-600/50 backdrop-blur-sm
              ${consoleOpen 
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-cyan-300 border-cyan-500/50' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/60 hover:border-slate-500/70'
              }
              transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-cyan-500/25
            `}
          >
            <div className="flex items-center space-x-2">
              <Terminal size={16} className={`transition-colors duration-300 ${consoleOpen ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Console</span>
              <ChevronUp 
                size={14} 
                className={`transition-transform duration-300 ${consoleOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} 
              />
            </div>
            {consoleOpen && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 -z-10 animate-pulse" />
            )}
          </button>

          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isRunning ? 'bg-yellow-400' : isSubmitting ? 'bg-green-400' : 'bg-slate-600'
            }`} />
            <span className="text-xs text-slate-400 font-mono">
              {isRunning ? 'RUNNING' : isSubmitting ? 'SUBMITTING' : 'READY'}
            </span>
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center space-x-3">
          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`
              group relative px-6 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300 ease-out
              border backdrop-blur-sm overflow-hidden
              ${isRunning
                ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 text-yellow-300 border-yellow-500/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-slate-700/60 to-slate-600/60 text-slate-200 border-slate-500/50 hover:from-slate-600/70 hover:to-slate-500/70 hover:border-slate-400/70'
              }
              transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-yellow-500/25
            `}
          >
            <div className="flex items-center space-x-2 relative z-10">
              {isRunning ? (
                <Zap size={16} className="animate-spin text-yellow-400" />
              ) : (
                <Play size={16} className="group-hover:text-yellow-400 transition-colors duration-300" />
              )}
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </div>
            
            {/* Animated background for running state */}
            {isRunning && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 animate-pulse" />
            )}
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmitClick}
            disabled={isSubmitting}
            className={`
              group relative px-6 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300 ease-out
              border backdrop-blur-sm overflow-hidden
              ${isSubmitting
                ? 'bg-gradient-to-r from-green-600/40 to-emerald-600/40 text-green-300 border-green-500/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600/70 to-green-600/70 text-white border-emerald-500/60 hover:from-emerald-500/80 hover:to-green-500/80 hover:border-emerald-400/80'
              }
              transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-emerald-500/30
            `}
          >
            <div className="flex items-center space-x-2 relative z-10">
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={16} className="group-hover:text-emerald-200 transition-colors duration-300" />
              )}
              <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </div>
            
            {/* Animated background for submitting state */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 animate-pulse" />
            )}
            
            {/* Success ripple effect */}
            {!isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
      `}</style>
    </div>
  );
};

export default EditorFooter;