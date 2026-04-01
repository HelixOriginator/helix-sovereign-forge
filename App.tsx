import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Cpu, 
  BookOpen, 
  Layers, 
  Zap, 
  Target, 
  Loader2, 
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";
import { generateFramework, type Framework } from "./services/geminiService";
import { cn } from "./lib/utils";
import Markdown from "react-markdown";

export default function App() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [framework, setFramework] = useState<Framework | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateFramework(topic);
      setFramework(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate framework. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-indigo-500/5" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest"
          >
            <Cpu className="w-3 h-3" />
            Autonomous Framework Generation
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
          >
            Helix Sovereign Forge
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Synthesizing deep conceptual structures from the Helix Library and Kallol Research Repository to produce original, insight-driven frameworks.
          </motion.p>
        </header>

        {/* Search/Input Section */}
        <section className="mb-12">
          <form onSubmit={handleGenerate} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#121212] border border-zinc-800 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
              <div className="pl-5 text-zinc-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic to forge a framework..."
                className="w-full bg-transparent px-4 py-5 text-lg outline-none placeholder:text-zinc-600"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="mr-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-lg font-medium transition-all flex items-center gap-2 group/btn"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Forge
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400 text-sm text-center font-mono"
            >
              {error}
            </motion.p>
          )}
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-indigo-400 font-mono text-sm uppercase tracking-widest">Synthesizing Core Structures</p>
                <p className="text-zinc-500 text-sm italic">Accessing Helix Library & Kallol Repository...</p>
              </div>
            </motion.div>
          ) : framework ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12 pb-24"
            >
              {/* Framework Title & Definition */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
                  <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em]">Framework Output</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
                </div>
                
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white">{framework.title}</h2>
                  <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-sm">
                    <div className="flex items-start gap-4 text-left">
                      <BookOpen className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                      <div className="prose prose-invert prose-indigo max-w-none">
                        <Markdown>{framework.definition}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {framework.coreComponents.map((comp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-6 rounded-xl bg-[#161616] border border-zinc-800 hover:border-indigo-500/30 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                      <Layers className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{comp.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{comp.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Application & Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
                    <Zap className="w-4 h-4" />
                    Application
                  </div>
                  <div className="p-6 rounded-xl bg-[#161616] border border-zinc-800 prose prose-invert prose-sm max-w-none">
                    <Markdown>{framework.application}</Markdown>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
                    <Target className="w-4 h-4" />
                    Outcome
                  </div>
                  <div className="p-6 rounded-xl bg-[#161616] border border-zinc-800 prose prose-invert prose-sm max-w-none">
                    <Markdown>{framework.outcome}</Markdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Info className="w-10 h-10 text-zinc-700" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-zinc-300">Ready for Synthesis</h3>
                <p className="text-zinc-500 max-w-xs mx-auto">Enter a complex topic or conceptual seed to begin the forge process.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
          <div>Helix Sovereign Forge v1.0</div>
          <div>Autonomous Framework Generation System</div>
        </div>
      </footer>
    </div>
  );
}
