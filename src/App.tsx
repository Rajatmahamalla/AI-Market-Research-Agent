import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  BarChart3,
  Lightbulb,
  Rocket,
  Calendar,
  ShieldCheck,
  Globe,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { researchMarket } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarketData {
  marketAnalysis: {
    tam: string;
    sam: string;
    som: string;
    growthTrends: string[];
    targetAudience: string[];
    competitors: { name: string; strengths: string; weaknesses: string }[];
    gapAnalysis: string;
  };
  painPoints: {
    problem: string;
    urgency: number;
    willingnessToPay: number;
    marketSizePotential: number;
    description: string;
  }[];
  bestOpportunity: {
    title: string;
    justification: string;
  };
  startupIdeas: {
    name: string;
    description: string;
    targetUsers: string;
    usp: string;
    monetization: string;
    difficulty: string;
  }[];
  executionPlan: {
    mvpFeatures: string[];
    techStack: string[];
    aiTools: string[];
    timeline: { day: string; task: string }[];
    gtmStrategy: string[];
  };
}

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await researchMarket(keyword);
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the market. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const RatingBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-medium mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900">{value}/10</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
              <Zap size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Founders<span className="text-brand-600">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-brand-600 transition-colors">Research</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Strategy</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Execution</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Identify Your Next <br />
            <span className="gradient-text">Billion-Dollar Opportunity</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Elite AI Market Research Agent for founders. Deep trend analysis, 
            gap identification, and execution planning in seconds.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleResearch}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input 
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Industry, Problem, or Keyword (e.g., 'student productivity')"
                className="w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm text-lg"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 px-6 py-2.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {loading ? 'Analyzing...' : 'Research'}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-brand-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-brand-600">
                  <Cpu size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Deep Research in Progress</h3>
              <p className="text-slate-500 animate-pulse">Analyzing TAM/SAM/SOM, Trends, and Competitors...</p>
            </motion.div>
          ) : data ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12 pb-20"
            >
              {/* Market Analysis Grid */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="text-brand-600" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">1. Market Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-6 rounded-2xl">
                    <p className="text-sm font-medium text-slate-500 mb-1">TAM (Total Addressable Market)</p>
                    <p className="text-2xl font-bold text-slate-900">{data.marketAnalysis.tam}</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl">
                    <p className="text-sm font-medium text-slate-500 mb-1">SAM (Serviceable Addressable Market)</p>
                    <p className="text-2xl font-bold text-slate-900">{data.marketAnalysis.sam}</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl">
                    <p className="text-sm font-medium text-slate-500 mb-1">SOM (Serviceable Obtainable Market)</p>
                    <p className="text-2xl font-bold text-slate-900">{data.marketAnalysis.som}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-card p-8 rounded-3xl">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-brand-500" />
                      Growth Trends
                    </h4>
                    <ul className="space-y-3">
                      {data.marketAnalysis.growthTrends.map((trend, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                          <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card p-8 rounded-3xl">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Users size={18} className="text-brand-500" />
                      Target Audience
                    </h4>
                    <ul className="space-y-3">
                      {data.marketAnalysis.targetAudience.map((audience, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                          <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
                          {audience}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 glass-card p-8 rounded-3xl">
                  <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-brand-500" />
                    Competitive Landscape
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.marketAnalysis.competitors.map((comp, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-900 mb-2">{comp.name}</p>
                        <div className="space-y-2 text-xs">
                          <p><span className="font-semibold text-emerald-600">Strengths:</span> {comp.strengths}</p>
                          <p><span className="font-semibold text-rose-600">Weaknesses:</span> {comp.weaknesses}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-brand-50 border border-brand-100 rounded-xl">
                    <p className="text-sm font-bold text-brand-900 mb-1">Gap Analysis (The Opportunity)</p>
                    <p className="text-sm text-brand-800 leading-relaxed">{data.marketAnalysis.gapAnalysis}</p>
                  </div>
                </div>
              </section>

              {/* Pain Points Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="text-brand-600" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">2. Pain Point Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.painPoints.map((point, i) => (
                    <div key={i} className="glass-card p-6 rounded-3xl flex flex-col">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm mb-4">
                        {i + 1}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{point.problem}</h4>
                      <p className="text-sm text-slate-500 mb-6 flex-grow">{point.description}</p>
                      <div className="space-y-1">
                        <RatingBar label="Urgency" value={point.urgency} color="bg-rose-500" />
                        <RatingBar label="Willingness to Pay" value={point.willingnessToPay} color="bg-emerald-500" />
                        <RatingBar label="Market Potential" value={point.marketSizePotential} color="bg-brand-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best Opportunity */}
              <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px] rounded-full" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/20 border border-brand-500/30 rounded-full text-brand-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <Target size={14} />
                    Top Opportunity
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{data.bestOpportunity.title}</h3>
                  <div className="max-w-3xl">
                    <p className="text-slate-400 leading-relaxed text-lg italic">
                      "{data.bestOpportunity.justification}"
                    </p>
                  </div>
                </div>
              </section>

              {/* Startup Ideas */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Lightbulb className="text-brand-600" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">3. AI Startup Concepts</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {data.startupIdeas.map((idea, i) => (
                    <div key={i} className="glass-card p-8 rounded-[2rem] flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-xl font-bold text-slate-900">{idea.name}</h4>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          idea.difficulty === 'Low' ? "bg-emerald-100 text-emerald-700" :
                          idea.difficulty === 'Medium' ? "bg-amber-100 text-amber-700" :
                          "bg-rose-100 text-rose-700"
                        )}>
                          {idea.difficulty} Difficulty
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{idea.description}</p>
                      
                      <div className="space-y-4 mb-8 flex-grow">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Users</p>
                          <p className="text-sm text-slate-900 font-medium">{idea.targetUsers}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unique Selling Point</p>
                          <p className="text-sm text-slate-900 font-medium">{idea.usp}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monetization</p>
                          <p className="text-sm text-slate-900 font-medium">{idea.monetization}</p>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                        Select Concept
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Execution Plan */}
              <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12">
                <div className="flex items-center gap-2 mb-10">
                  <Rocket className="text-brand-600" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">4. 30-Day Execution Plan</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-brand-500" />
                        MVP Must-Have Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {data.executionPlan.mvpFeatures.map((feat, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Globe size={18} className="text-brand-500" />
                        Go-To-Market Strategy
                      </h4>
                      <ul className="space-y-3">
                        {data.executionPlan.gtmStrategy.map((gtm, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            {gtm}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.executionPlan.techStack.map((tech, i) => (
                            <span key={i} className="text-xs text-slate-500 font-mono">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">AI Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.executionPlan.aiTools.map((tool, i) => (
                            <span key={i} className="text-xs text-slate-500 font-mono">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Calendar size={18} className="text-brand-500" />
                      Launch Timeline
                    </h4>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {data.executionPlan.timeline.map((item, i) => (
                        <div key={i} className="relative pl-8">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-500 z-10" />
                          <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-0.5">{item.day}</p>
                          <p className="text-sm text-slate-900 font-medium">{item.task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12"
            >
              {[
                { icon: <TrendingUp />, title: "Trend Analysis", desc: "Real-time market growth and future projections." },
                { icon: <Target />, title: "Gap Identification", desc: "Find what competitors are missing in the market." },
                { icon: <Rocket />, title: "Launch Blueprint", desc: "Complete 30-day execution and GTM strategy." }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">
          © 2026 FoundersAI. Built for elite startup strategists.
        </p>
      </footer>
    </div>
  );
}
