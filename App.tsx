
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { NetworkBackground } from './components/QuantumScene';
import { AutomationFlowDiagram, CostComparisonChart, CreateFrameworkCard, TerminalBootSequence, AssetGrowthChart } from './components/Diagrams';
import { ArrowRight, Menu, X, CheckCircle, Lock, Zap, Server, Database, Brain, Globe, Shield, Activity, Users, Mail, BookOpen, AlertTriangle, FileText, Crown, Layers, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingCard = ({ title, price, subtitle, features, recommended = false, cta, badge, onBuy }: any) => (
  <div className={`relative p-8 rounded-2xl border flex flex-col h-full transition-all duration-500 hover:-translate-y-2 group ${recommended ? 'bg-slate-900/80 border-brand-accent shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-dark text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
        Flagship Protocol
      </div>
    )}
    {badge && !recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-700 whitespace-nowrap">
        {badge}
      </div>
    )}
    
    <div className="mb-6">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 h-10">{subtitle}</p>
    </div>

    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-lg text-slate-500 font-medium">$</span>
      <span className="text-5xl font-black text-white tracking-tight">{price}</span>
      <span className="text-sm text-slate-500 font-medium">USD</span>
    </div>
    
    <div className="space-y-4 mb-8 flex-1">
      {features.map((feat: string, i: number) => (
        <div key={i} className="flex items-start gap-3 text-sm text-slate-300 group-hover:text-white transition-colors">
          <CheckCircle size={16} className="text-brand-accent mt-0.5 shrink-0" />
          <span>{feat}</span>
        </div>
      ))}
    </div>

    <button 
      onClick={onBuy}
      className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 ${recommended ? 'bg-brand-accent text-brand-dark hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}
    >
      {cta}
    </button>
  </div>
);

const SectionHeader = ({ number, title, subtitle }: { number: string, title: string, subtitle: string }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-8 bg-brand-accent/50"></span>
      <span className="text-brand-accent font-mono text-sm tracking-[0.2em]">{number}</span>
      <span className="h-px w-8 bg-brand-accent/50"></span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{title}</h2>
    <p className="text-lg text-slate-400 leading-relaxed font-light">{subtitle}</p>
  </div>
);

const ResourceCard = ({ icon: Icon, title, desc, tag, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group p-6 bg-slate-900/50 border border-slate-800 hover:border-brand-accent/50 rounded-xl transition-all hover:bg-slate-800 relative overflow-hidden cursor-pointer"
  >
    <div className="absolute top-0 right-0 p-2 opacity-50">
       <Icon size={40} className="text-slate-800 group-hover:text-brand-accent/10 transition-colors" />
    </div>
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-950 rounded border border-slate-700 text-brand-accent">
            <Icon size={20} />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">{tag}</div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
    <div className="flex items-center text-brand-accent text-xs font-bold uppercase tracking-wider gap-2 opacity-60 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        Access File <ArrowRight size={12} />
    </div>
  </div>
);

const NewsletterPopup = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-slate-900 border border-brand-accent/30 p-8 rounded-2xl max-w-md w-full relative shadow-[0_0_50px_rgba(16,185,129,0.15)]"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
      <div className="text-brand-accent font-mono text-xs tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
        SECURE ACCESS REQUEST
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Join The Sovereign Society</h3>
      <p className="text-slate-400 text-sm mb-6">
        Enter your primary email to unlock the blueprints and receive the weekly "Alpha Report".
      </p>
      <div className="space-y-4">
        <input type="email" placeholder="Enter your best email..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-slate-600" />
        <button onClick={() => { alert("Welcome to the Society. Check your inbox."); onClose(); }} className="w-full bg-brand-accent text-brand-dark font-bold py-3 rounded-lg uppercase tracking-wider hover:bg-white transition-all shadow-lg hover:shadow-brand-accent/50">
          Initialize Access
        </button>
      </div>
      <p className="text-[10px] text-slate-600 mt-4 text-center">
        We respect the sanctity of your inbox. Zero spam. 100% Signal.
      </p>
    </motion.div>
  </motion.div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger newsletter popup after 15 seconds
    const timer = setTimeout(() => {
      if (!showNewsletter) setShowNewsletter(true);
    }, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    }
  }, []);

  const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const handleBuy = () => {
    setShowNewsletter(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 font-sans selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
      
      <AnimatePresence>
        {showNewsletter && <NewsletterPopup onClose={() => setShowNewsletter(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-slate-800/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-brand-accent font-black shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all">N</div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">IM NOKIB</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-accent transition-colors">Sovereign Systems</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#story" onClick={scrollToSection('story')} className="hover:text-brand-accent transition-colors">The Origin</a>
            <a href="#doctrine" onClick={scrollToSection('doctrine')} className="hover:text-brand-accent transition-colors text-white">The Doctrine</a>
            <a href="#system" onClick={scrollToSection('system')} className="hover:text-brand-accent transition-colors">The Protocol</a>
            <a href="#wealth" onClick={scrollToSection('wealth')} className="hover:text-brand-accent transition-colors">Wealth Mgmt</a>
            <a href="#resources" onClick={scrollToSection('resources')} className="hover:text-brand-accent transition-colors flex items-center gap-1"><BookOpen size={12}/> Resources</a>
            <a 
              href="#pricing"
              onClick={scrollToSection('pricing')}
              className="px-6 py-2.5 bg-white text-brand-dark font-black rounded-lg hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/50"
            >
              Access Data
            </a>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-bold uppercase tracking-widest animate-fade-in">
             <a href="#story" onClick={scrollToSection('story')} className="text-slate-400 hover:text-white">Origin Story</a>
            <a href="#doctrine" onClick={scrollToSection('doctrine')} className="text-slate-400 hover:text-white">The Doctrine</a>
            <a href="#system" onClick={scrollToSection('system')} className="text-slate-400 hover:text-white">The System</a>
            <a href="#resources" onClick={scrollToSection('resources')} className="text-slate-400 hover:text-white">Resources</a>
            <a href="#pricing" onClick={scrollToSection('pricing')} className="text-brand-accent">Get Access</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 border-b border-slate-900/50">
        <div className="absolute inset-0 z-0 opacity-60">
            <NetworkBackground />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-brand-dark/80 to-brand-dark" />

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
              System Status: Online
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-8 text-white tracking-tighter">
              Own The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-emerald-200 to-teal-500">Infrastructure.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 font-light max-w-2xl mx-auto lg:mx-0">
              Stop renting your livelihood. The <b>"Self-Hosted Sovereign"</b> protocol is the only way to build a censorship-resistant, $100k/mo asset for $10/mo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-16">
               <a href="#doctrine" onClick={scrollToSection('doctrine')} className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)]">
                  <span>Declassify The Case Study</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </a>
               <a href="#system" onClick={scrollToSection('system')} className="flex items-center justify-center px-8 py-4 bg-slate-900/50 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors border border-slate-700 backdrop-blur-sm">
                  View Architecture
               </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['High-Velocity VPS', 'LiteSpeed Grid', 'Infinity Core DB', 'Amazon SES'].map(tech => (
                 <span key={tech} className="text-xs font-mono border-b border-transparent hover:border-brand-accent/50 pb-1 cursor-default">{tech}</span>
               ))}
            </div>
          </div>

          {/* Right Content - Terminal Simulator */}
          <div className="lg:col-span-5 hidden lg:block">
            <TerminalBootSequence />
          </div>
        </div>
      </header>

      <main>
        {/* SECTION 1: THE ORIGIN STORY (AUTHORITY) */}
        <section id="story" className="py-24 bg-slate-900 border-b border-slate-800 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-accent/0 via-brand-accent/50 to-brand-accent/0"></div>
           
           <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                  <span className="text-brand-accent font-mono text-xs tracking-widest">ENCRYPTED LOG: ARCHITECT'S JOURNAL</span>
              </div>
              
              <div className="prose prose-invert prose-lg mx-auto">
                 <h2 className="text-3xl font-bold text-white mb-8 text-center">"I spent 7 years burning money on the wrong things."</h2>
                 <p className="text-slate-400">
                    For seven years, I failed. Not because I didn't work hard, but because I had poor <b>wealth management</b>. I was "renting" my business.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                    <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-xl">
                        <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2"><X size={16}/> The "Renter" Mindset</h4>
                        <p className="text-sm text-slate-400">Paying $200/mo for email tools. Buying "shiny object" courses. Building audiences on platforms that ban you. Expenses > Assets.</p>
                    </div>
                    <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                        <h4 className="text-brand-accent font-bold mb-2 flex items-center gap-2"><CheckCircle size={16}/> The "Sovereign" Mindset</h4>
                        <p className="text-sm text-slate-400">Owning the server. Owning the code. Owning the data. Spending $10 to make $10,000. Assets > Expenses.</p>
                    </div>
                 </div>
                 <p className="text-slate-400">
                    I realized that <b>Email is Digital Real Estate</b>. It is an asset that pays you for a lifetime—if you own the infrastructure.
                 </p>
                 <p className="text-slate-400">
                    Today, I am revealing the <b>Hidden Process</b>. The Uncommon Design. The methods I used to finally break free and prove what a "Real Lifestyle" looks like.
                 </p>
              </div>
           </div>
        </section>

        {/* SECTION 1.5: THE DOCTRINE (MANIFESTO) */}
        <section id="doctrine" className="py-24 bg-black border-y border-slate-800 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block p-4 border border-brand-accent/30 rounded-full bg-brand-accent/5 mb-8">
                        <Crown size={32} className="text-brand-accent" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
                        Are you a <span className="text-slate-600 line-through decoration-red-500 decoration-4">Tenant</span> or a <span className="text-brand-accent">King?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-16 max-w-4xl mx-auto">
                        <div className="border-l-2 border-slate-700 pl-8">
                            <h3 className="text-xl font-bold text-slate-400 mb-4">The 99% (Tenants)</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                They rent their audience from Zuckerberg, Google, and SaaS platforms. They live in fear of algorithm changes, price hikes, and account bans. They own nothing.
                            </p>
                        </div>
                        <div className="border-l-2 border-brand-accent pl-8">
                            <h3 className="text-xl font-bold text-white mb-4">The 1% (Owners)</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                They own the server. They own the IP. They own the relationship. They pay wholesale prices for infrastructure and keep 100% of the upside. This is the blueprint for total digital sovereignty.
                            </p>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* SECTION 2: THE PROBLEM VS SOLUTION */}
        <section id="system" className="py-24 bg-brand-dark border-b border-slate-900">
          <div className="container mx-auto px-6">
            <SectionHeader 
                number="01" 
                title="The Mathematics of Failure" 
                subtitle="Why the 'Old Way' is designed to keep you poor." 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                   <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-blue-500/20 blur-2xl opacity-50 rounded-full"></div>
                   <CostComparisonChart />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white mb-6">The "100k Trap"</h3>
                   <ul className="space-y-6">
                      <li className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                            <Activity size={20} className="text-red-400" />
                         </div>
                         <div>
                            <h4 className="text-white font-bold">The Subscription Bleed</h4>
                            <p className="text-sm text-slate-400">Services like ActiveCampaign charge you for <i>storing</i> data, not just sending. As you grow, you get punished.</p>
                         </div>
                      </li>
                      <li className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                            <Shield size={20} className="text-brand-accent" />
                         </div>
                         <div>
                            <h4 className="text-white font-bold">The Sovereign Solution</h4>
                            <p className="text-sm text-slate-400">With my self-hosted stack, you pay for the server ($10). Whether you have 1,000 or 1,000,000 subscribers, the cost stays flat.</p>
                         </div>
                      </li>
                   </ul>
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE HIDDEN PROCESS (TECH STACK) */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/5 blur-[120px] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader 
                    number="02" 
                    title="The Hidden Architecture" 
                    subtitle="A glimpse into the private process never before revealed in this market." 
                />
                
                <div className="bg-brand-dark border border-slate-800 rounded-3xl p-4 md:p-12 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark via-brand-accent to-brand-dark opacity-50"></div>
                    <AutomationFlowDiagram />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                        { icon: Server, title: "Titanium-Grade Hosting", desc: "We use Industrial-Grade VPS Architecture (German Engineering) to secure high-performance compute for pennies." },
                        { icon: Database, title: "The Infinity Core", desc: "Our Open-Source Engine allows for infinite segmentation, tagging, and automation flows without the 'Pro Plan' limits." },
                        { icon: Zap, title: "Wholesale Delivery", desc: "Amazon SES is the backbone of the internet. We tap into it directly, bypassing the middlemen." }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-brand-accent/50 hover:bg-slate-800/60 transition-all duration-300">
                            <item.icon className="text-brand-accent mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SECTION 4: PASSIVE WEALTH (NEW) */}
        <section id="wealth" className="py-24 bg-brand-dark border-y border-slate-800">
           <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-brand-accent font-mono text-sm tracking-widest mb-4">03. WEALTH MANAGEMENT</div>
                        <h2 className="text-4xl font-bold text-white mb-6">"How easy can it be?"</h2>
                        <p className="text-lg text-slate-400 mb-6">
                            Once this system is built, it becomes a <b>Passive Income Generator</b>. This is the difference between "working" and "owning."
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                Build the system once (Weekend Project).
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                Auto-feed content via Newsletter.
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                Earn lifetime commissions from a loyal community.
                            </li>
                        </ul>
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <p className="text-xs text-slate-500 font-mono mb-2">PROJECTED ROI</p>
                            <div className="text-3xl font-mono text-white">$10 Cost <span className="text-slate-600">-></span> $10k Value</div>
                        </div>
                    </div>
                    <div>
                        <AssetGrowthChart />
                    </div>
                </div>
           </div>
        </section>

        {/* SECTION 4.5: CLASSIFIED RESOURCES (NEW) */}
        <section id="resources" className="py-24 bg-slate-900 border-b border-slate-800">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    number="04" 
                    title="Classified Intelligence" 
                    subtitle="Access the private files that power the Sovereign ecosystem." 
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResourceCard 
                        icon={Crown} 
                        title="The 1% Doctrine" 
                        desc="The philosophical manifesto on why ownership beats rental every single time. A mind-shift required for wealth."
                        tag="Manifesto"
                        onClick={scrollToSection('pricing')}
                    />
                    <ResourceCard 
                        icon={Box} 
                        title="The Black Box" 
                        desc="(Classified) The exact templates and server configurations used to send 1M+ emails with 99.9% deliverability."
                        tag="Technical"
                        onClick={scrollToSection('pricing')}
                    />
                    <ResourceCard 
                        icon={Layers} 
                        title="Phase 2: The Uncommon" 
                        desc="Advanced strategies for scaling beyond email. Expanding into multi-channel sovereign assets."
                        tag="Strategy"
                        onClick={scrollToSection('pricing')}
                    />
                </div>
                <div className="text-center mt-6 text-xs text-slate-500">
                    * Click any file to verify access clearance.
                </div>
            </div>
        </section>

        {/* SECTION 5: AI INTELLIGENCE */}
        <section className="py-24 bg-slate-900">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <CreateFrameworkCard />
                </div>
                <div className="order-1 lg:order-2">
                    <div className="text-brand-accent font-mono text-sm tracking-widest mb-4">05. ARTIFICIAL INTELLIGENCE</div>
                    <h2 className="text-4xl font-bold text-white mb-6">The "C.R.E.A.T.E" Protocol</h2>
                    <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                        A server without a message is useless. I will hand you my proprietary AI Logic. This isn't ChatGPT text; this is <b>Psychological Engineering</b>.
                    </p>
                    <p className="text-slate-400 mb-6">
                        We program the AI to "Think" like a human copywriter before it writes a single word. This is how we get 45%+ Open Rates on cold traffic.
                    </p>
                    <button onClick={scrollToSection('pricing')} className="text-brand-accent font-bold hover:text-white transition-colors flex items-center gap-2 group">
                        See the prompt logic <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </section>

        {/* SECTION 6: COMMUNITY (NEW) */}
        <section id="community" className="py-20 bg-gradient-to-br from-emerald-900/20 to-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-6 text-center">
                <Users size={48} className="text-brand-accent mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Join The Sovereign Society</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    When you acquire this asset, you don't just get a course. You enter a private network of builders who are exiting the "Rental Economy."
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-bold text-slate-300">
                    <button onClick={() => setShowNewsletter(true)} className="px-6 py-3 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2 hover:bg-slate-700 hover:border-brand-accent/50 transition-all">
                        <Mail size={16} className="text-brand-accent"/> Weekly "Alpha" Newsletter
                    </button>
                    <button onClick={scrollToSection('pricing')} className="px-6 py-3 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2 hover:bg-slate-700 hover:border-brand-accent/50 transition-all">
                        <Globe size={16} className="text-brand-accent"/> Private Discord Access
                    </button>
                </div>
            </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-brand-dark">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    number="06" 
                    title="Acquire The Asset" 
                    subtitle="Stop spending on liabilities. Start investing in your sovereign infrastructure." 
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <PricingCard 
                        title="The Blueprint"
                        price="19"
                        subtitle="The raw schematics for the DIY architect."
                        badge="Entry Level"
                        features={[
                            "Complete Case Study PDF",
                            "Server Setup Checklist",
                            "The 'Infinity Core' Setup",
                            "Basic SES Approval Script",
                            "Newsletter Access"
                        ]}
                        cta="Instant Download"
                        onBuy={handleBuy}
                    />
                    <PricingCard 
                        title="The System"
                        price="47"
                        subtitle="The visual masterclass. Watch me build it."
                        recommended={true}
                        features={[
                            "Everything in Blueprint",
                            "4-Hour Video Walkthrough",
                            "The C.R.E.A.T.E Prompt Library",
                            "Infinity Core Templates",
                            "Private Community Access",
                            "Passive Income Roadmap"
                        ]}
                        cta="Start Building"
                        onBuy={handleBuy}
                    />
                    <PricingCard 
                        title="Mentorship"
                        price="297"
                        subtitle="Direct implementation with the Architect."
                        badge="Limited Spots"
                        features={[
                            "Everything in System",
                            "4 Live Weekly Calls",
                            "Direct Implementation Support",
                            "Review of Your Email Copy",
                            "Lifetime Updates"
                        ]}
                        cta="Apply for Cohort"
                        onBuy={handleBuy}
                    />
                </div>
                
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 opacity-60">
                        <Lock size={12} /> 256-Bit Secure Encryption Protocol
                    </p>
                </div>
            </div>
        </section>
        
        {/* FAQ SECTION */}
        <section className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6 max-w-3xl">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Protocol FAQ</h3>
                <div className="space-y-4">
                    <div className="p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRight size={16} className="text-brand-accent"/> Do I need coding skills?</h4>
                        <p className="text-slate-400 text-sm pl-6">No. The "Blueprint" provides copy-paste terminal commands. If you can follow a recipe, you can build this server. We have stripped away the complexity.</p>
                    </div>
                    <div className="p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRight size={16} className="text-brand-accent"/> Why is this better than Mailchimp?</h4>
                        <p className="text-slate-400 text-sm pl-6">Ownership. Mailchimp owns your data and can ban you anytime. Here, you own the database. Plus, the cost difference is 98% in your favor ($10 vs $600).</p>
                    </div>
                    <div className="p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRight size={16} className="text-brand-accent"/> Is this "Cold Email" spam?</h4>
                        <p className="text-slate-400 text-sm pl-6">Absolutely not. We teach "Targeted Value Outreach." Spam is sending 1 million identical emails. Our AI system personalizes every single email, making it compliant and highly effective.</p>
                    </div>
                    <div className="p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRight size={16} className="text-brand-accent"/> What about maintenance time?</h4>
                        <p className="text-slate-400 text-sm pl-6">Once built, the system is automated. You will spend perhaps 1 hour per month on server updates. The rest is profit generation.</p>
                    </div>
                    <div className="p-6 bg-brand-dark border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ArrowRight size={16} className="text-brand-accent"/> Why buy this if I can Google it?</h4>
                        <p className="text-slate-400 text-sm pl-6">You can Google "how to build a car," but you still buy a Toyota. This is a packaged, proven system that saves you 7 years of trial and error. You are buying Speed and Certainty.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-black text-slate-500 py-16 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-brand-accent rounded text-brand-dark font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:bg-white transition-colors">N</div>
                    <span className="text-white font-bold text-xl tracking-tight">IM NOKIB</span>
                </div>
                <p className="text-sm max-w-md mt-4 leading-relaxed">
                    The "Self-Hosted Sovereign" is a trademark of Nokib Architecture. <br/>
                    Teaching wealth management through digital asset ownership.
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-xs font-bold uppercase tracking-widest">
                <button onClick={() => alert("Standard Protocol Terms apply. Ownership belongs to the buyer.")} className="px-4 py-2 border border-slate-800 rounded hover:bg-slate-800 hover:text-white transition-colors">Terms of Protocol</button>
                <button onClick={() => alert("We do not track you. We do not sell you. You are sovereign.")} className="px-4 py-2 border border-slate-800 rounded hover:bg-slate-800 hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => window.location.href = "mailto:support@imnokib.com"} className="px-4 py-2 border border-slate-800 rounded hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"><AlertTriangle size={12} className="text-brand-accent"/> Support Line</button>
            </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-slate-800 font-mono">
            EST. 2025 • DHAKA / GLOBAL • ALL SYSTEMS OPERATIONAL
        </div>
      </footer>
    </div>
  );
};

export default App;
