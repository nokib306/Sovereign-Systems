
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Mail, Users, Brain, DollarSign, Database, ArrowRight, Zap, Terminal, Code, Activity, TrendingUp } from 'lucide-react';

// --- TERMINAL BOOT SEQUENCE (HERO ANIMATION) ---
export const TerminalBootSequence: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [bootComplete, setBootComplete] = useState(false);

    const allLines = [
        "> INITIALIZING SOVEREIGN PROTOCOL...",
        "> CONNECTING TO TITANIUM VPS (NODE_DE_01)... [OK]",
        "> ESTABLISHING ROOT ACCESS... [GRANTED]",
        "> DEPLOYING COMMAND GRID... [COMPLETE]",
        "> INITIALIZING NEURAL DB... [COMPLETE]",
        "> BYPASSING MIDDLEMEN... [SUCCESS]",
        "> CONNECTING AMAZON SES API... [CONNECTED]",
        "> COST ANALYSIS: $0.10 / 1000 EMAILS",
        "> SYSTEM STATUS: 100% OWNERSHIP",
        "> WELCOME, ARCHITECT."
    ];

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < allLines.length) {
                setLines(prev => [...prev, allLines[currentIndex]]);
                currentIndex++;
                // Auto-scroll
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                setBootComplete(true);
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines])

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* TERMINAL WINDOW */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm relative z-10">
                <div className="bg-slate-900 px-4 py-2 flex gap-2 border-b border-slate-800 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <div className="ml-auto text-slate-500 flex items-center gap-1">
                    <Terminal size={12} /> bash
                    </div>
                </div>
                <div ref={scrollRef} className="p-6 h-64 overflow-y-auto flex flex-col gap-2 scroll-smooth">
                    {lines.map((line, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${i === lines.length - 1 ? 'text-brand-accent font-bold' : 'text-slate-400'}`}
                        >
                            {line}
                        </motion.div>
                    ))}
                    {!bootComplete && (
                        <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-brand-accent"
                        />
                    )}
                </div>
            </div>

            {/* LIVE TELEMETRY CARD (FLOATING STAT) */}
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: bootComplete ? 1 : 0, y: bootComplete ? 0 : 20, scale: bootComplete ? 1 : 0.9 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 z-20 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-[200px]"
            >
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                        <Activity size={20} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Live Open Rate</div>
                    <div className="text-2xl font-black text-white flex items-baseline gap-2">
                        68.4% 
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">+142%</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- ASSET GROWTH CHART (PASSIVE INCOME) ---
export const AssetGrowthChart: React.FC = () => {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp size={100} className="text-brand-accent" />
            </div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <Activity className="text-brand-accent"/> Market Valuation
                    </h3>
                    <p className="text-xs text-slate-400 font-mono tracking-wider mt-1">TICKER: $SELF (SOVEREIGN ASSET)</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-brand-accent">+ 12,400%</div>
                    <div className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">BULLISH TREND</div>
                </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-48 w-full relative flex items-end gap-1 border-b border-l border-slate-800 pl-2 pb-2">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                     <div className="w-full h-px bg-slate-600 border-dashed border-t"></div>
                     <div className="w-full h-px bg-slate-600 border-dashed border-t"></div>
                     <div className="w-full h-px bg-slate-600 border-dashed border-t"></div>
                     <div className="w-full h-px bg-slate-600 border-dashed border-t"></div>
                </div>

                {/* Exponential Curve (Simulated with Bars for effect) */}
                {[5, 7, 10, 12, 15, 20, 28, 38, 55, 75, 100].map((h, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                        className="flex-1 bg-brand-accent/20 rounded-t-sm relative group hover:bg-brand-accent transition-colors cursor-crosshair"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent shadow-[0_0_10px_#10B981]"></div>
                        {i === 10 && (
                            <div className="absolute -top-10 right-0 bg-white text-brand-dark text-[10px] font-bold px-3 py-1 rounded shadow-lg whitespace-nowrap z-20">
                                $10k Valuation
                                <div className="absolute bottom-0 right-4 w-2 h-2 bg-white rotate-45 translate-y-1"></div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
            
            <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                <span>Deployment</span>
                <span>Optimization</span>
                <span>Scale</span>
                <span>Exit Velocity</span>
            </div>
        </div>
    )
}

// --- AUTOMATION FLOW DIAGRAM ---
export const AutomationFlowDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStage(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stages = [
      { id: 0, label: "Extraction", icon: Users, desc: "Lead Sources" },
      { id: 1, label: "AI Logic", icon: Brain, desc: "Enrichment" },
      { id: 2, label: "The Core", icon: Database, desc: "Neural DB" },
      { id: 3, label: "Inboxes", icon: Mail, desc: "Direct Delivery" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-4xl mx-auto relative">
         {/* Connecting Line (Desktop) */}
         <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
         
         {stages.map((stage, index) => {
             const Icon = stage.icon;
             const isActive = activeStage === index;
             const isPast = activeStage > index;
             
             return (
                 <div key={index} className="flex flex-col items-center relative z-10 w-full md:w-auto group cursor-default">
                     <motion.div 
                        animate={{ 
                            scale: isActive ? 1.1 : 1,
                            backgroundColor: isActive ? '#10B981' : isPast ? '#064E3B' : '#0B1120',
                            borderColor: isActive ? '#34D399' : isPast ? '#059669' : '#334155'
                        }}
                        className={`w-20 h-20 rounded-2xl border flex items-center justify-center mb-6 shadow-2xl transition-all duration-500`}
                     >
                         <Icon size={28} className={isActive ? 'text-brand-dark' : isPast ? 'text-emerald-400' : 'text-slate-600'} />
                     </motion.div>
                     <h4 className={`font-bold text-lg uppercase tracking-wider ${isActive ? 'text-brand-accent' : 'text-slate-500'}`}>{stage.label}</h4>
                     <p className="text-xs text-slate-500 font-mono mt-1">{stage.desc}</p>
                 </div>
             )
         })}
         
         {/* Moving Packet */}
         <motion.div 
            className="hidden md:flex absolute top-1/2 -mt-10 left-0 items-center justify-center w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_20px_#10B981] z-20"
            animate={{ left: `${(activeStage / 3) * 100}%` }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
         />
      </div>

      <div className="mt-12 p-4 bg-slate-950 rounded-lg border border-slate-800 text-center max-w-2xl mx-auto">
          <p className="text-brand-accent text-xs font-mono tracking-widest">
              <span className="animate-pulse">●</span> PROCESS RUNNING: {
                  activeStage === 0 ? "SCRAPING HIGH-INTENT DATA..." :
                  activeStage === 1 ? "GENERATING PSYCHOLOGICAL TRIGGERS..." :
                  activeStage === 2 ? "OPTIMIZING LOGIC NODES..." :
                  "EXECUTING SES TRANSMISSION PROTOCOL..."
              }
          </p>
      </div>
    </div>
  );
};

// --- COST COMPARISON CHART ---
export const CostComparisonChart: React.FC = () => {
    return (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <DollarSign className="text-brand-accent"/> Operational Overhead
            </h3>
            <p className="text-slate-500 text-sm mb-10">Monthly cost for 100,000 subscribers.</p>
            
            <div className="space-y-8">
                {/* Mailchimp */}
                <div>
                    <div className="flex justify-between text-sm mb-3">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Mailchimp / ActiveCampaign</span>
                        <span className="text-red-400 font-mono font-bold">$600.00 / mo</span>
                    </div>
                    <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-red-900 to-red-500"
                        />
                    </div>
                </div>

                {/* IM Nokib System */}
                <div>
                    <div className="flex justify-between text-sm mb-3">
                        <span className="text-white font-bold uppercase tracking-wider">Nokib Protocol</span>
                        <span className="text-brand-accent font-mono font-bold">$10.00 / mo</span>
                    </div>
                    <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '5%' }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className="h-full bg-brand-accent shadow-[0_0_20px_#10B981]"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-[10px] text-brand-accent font-mono uppercase bg-brand-accent/5 w-fit px-3 py-1 rounded">
                        <Activity size={12}/> Efficiency Increase: 6,000%
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- CREATE FRAMEWORK CARD ---
export const CreateFrameworkCard: React.FC = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { l: 'C', t: 'CONTEXT', d: 'Inject background data' },
        { l: 'R', t: 'ROLE', d: 'Assign expert persona' },
        { l: 'E', t: 'EXPECTATION', d: 'Set output parameters' },
        { l: 'A', t: 'AUDIENCE', d: 'Define the target' },
        { l: 'T', t: 'TASK', d: 'Execute specific command' },
        { l: 'E', t: 'EXAMPLES', d: 'Provide few-shot logic' },
    ];

    useEffect(() => {
        const i = setInterval(() => setStep(s => (s+1)%steps.length), 2000);
        return () => clearInterval(i);
    }, []);

    return (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl">
            <div className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2"><Code size={18} className="text-brand-accent"/> C.R.E.A.T.E LOGIC</h3>
                <div className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-bold tracking-widest rounded-full font-mono uppercase">V 2.0</div>
            </div>
            <div className="p-8 grid grid-cols-2 gap-4 relative z-10">
                {steps.map((s, idx) => (
                    <motion.div 
                        key={idx}
                        animate={{ 
                            opacity: idx === step ? 1 : 0.3,
                            scale: idx === step ? 1.02 : 1
                        }}
                        className={`p-4 rounded-xl border transition-all duration-300 ${idx === step ? 'bg-slate-800 border-brand-accent shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-transparent border-transparent'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`font-black text-2xl ${idx === step ? 'text-brand-accent' : 'text-slate-600'}`}>{s.l}</span>
                            <span className={`font-bold text-xs tracking-widest ${idx === step ? 'text-white' : 'text-slate-500'}`}>{s.t}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{s.d}</div>
                    </motion.div>
                ))}
            </div>
            {/* Background Effects */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
    )
}
