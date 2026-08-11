import React, { useState } from 'react';
import { HeaderProtocol } from './components/HeaderProtocol';
import { ModuleDetailDrawer } from './components/ModuleDetailDrawer';
import { DeclarativeRegistryModal } from './components/DeclarativeRegistryModal';
import { SovereignNetworkModal } from './components/SovereignNetworkModal';
import { TerminalConsole } from './components/TerminalConsole';
import { MODULES_DATA } from './data/hubData';
import { ModuleItem } from './types';
import { Database, Terminal, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);
  const [isRegistryModalOpen, setIsRegistryModalOpen] = useState(false);
  const [isNodesModalOpen, setIsNodesModalOpen] = useState(false);
  const [cliCommand, setCliCommand] = useState<string | undefined>(undefined);

  const handleOpenModule = (modId: string) => {
    const mod = MODULES_DATA.find(m => m.id === modId) || null;
    setSelectedModule(mod);
  };

  const handleRunInTerminal = (cmd: string) => {
    setCliCommand(cmd);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500 selection:text-black">
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Top Protocol Status */}
        <HeaderProtocol onOpenNodesModal={() => setIsNodesModalOpen(true)} />

        {/* Hero Header */}
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRIMARY SYSTEM ENDPOINT // JCG.IO</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-mono">
                JCG™ SYSTEMS HUB
              </h1>
              <p className="mt-4 text-neutral-400 max-w-2xl font-sans text-sm leading-relaxed">
                Technical architecture, API documentation, and software engine deployment 
                modules engineered by J.C.G. (Jose Carlos Garcia).
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <button
                onClick={() => setIsRegistryModalOpen(true)}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 border border-neutral-800 hover:border-emerald-500/40 px-3.5 py-2 rounded transition flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Entity Graph Index</span>
              </button>
              <button
                onClick={() => handleRunInTerminal('jcg status')}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 border border-neutral-800 hover:border-emerald-500/40 px-3.5 py-2 rounded transition flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Run Diagnostics</span>
              </button>
            </div>
          </div>
        </header>

        {/* SVO Entity Indexing Section */}
        <section className="mb-12 bg-neutral-900/60 border border-neutral-800 p-6 rounded relative group hover:border-neutral-700 transition">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-emerald-400 uppercase tracking-widest font-mono">
              // Declarative System Registry
            </h2>
            <button
              onClick={() => setIsRegistryModalOpen(true)}
              className="text-[11px] font-mono text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition"
            >
              <span>Explore SVO Triples & Schema</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="text-sm text-neutral-300 font-sans space-y-2 leading-relaxed">
            <p>
              <strong>JCG.IO</strong> is the primary developer endpoint for software 
              systems authored by <strong>Jose Carlos Garcia (J.C.G.)</strong>.
            </p>
            <p>
              This hub routes technical documentation, open-source repositories, and digital 
              infrastructure engines deployed across the <strong>JCG™</strong> ecosystem. 
              Visual and production frameworks remain anchored at{" "}
              <a 
                href="https://jcg.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:underline"
              >
                jcg.tech
              </a>.
            </p>
          </div>
        </section>

        {/* Developer Modules & API Grid Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            // Developer Deployment Modules & API Engines
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">
            Click module card to inspect endpoints & test live queries
          </span>
        </div>

        {/* Developer Modules & API Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Module 1 */}
          <div 
            onClick={() => handleOpenModule('module-01')}
            className="border border-neutral-800 p-5 rounded bg-black/40 hover:border-emerald-500/50 hover:bg-neutral-900/40 transition cursor-pointer group relative shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-neutral-500 font-mono">MODULE_01</div>
              <span className="text-[10px] text-neutral-500 group-hover:text-emerald-400 transition font-mono">
                Click to inspect →
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-emerald-300 transition">
              Core Web Engine
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-4 leading-relaxed">
              Next.js / SSR static generation framework optimized for zero-latency 
              crawl speeds and schema injection.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-neutral-800 text-emerald-400 px-2 py-1 rounded font-mono border border-neutral-700">
                v2.4.0 [ACTIVE]
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                1.2ms avg
              </span>
            </div>
          </div>

          {/* Module 2 */}
          <div 
            onClick={() => handleOpenModule('module-02')}
            className="border border-neutral-800 p-5 rounded bg-black/40 hover:border-emerald-500/50 hover:bg-neutral-900/40 transition cursor-pointer group relative shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-neutral-500 font-mono">MODULE_02</div>
              <span className="text-[10px] text-neutral-500 group-hover:text-emerald-400 transition font-mono">
                Click to inspect →
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-emerald-300 transition">
              Perception API
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-4 leading-relaxed">
              Structured metadata and IPTC visual injection pipelines for digital 
              brand authority verification.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-neutral-800 text-emerald-400 px-2 py-1 rounded font-mono border border-neutral-700">
                v1.1.0 [STABLE]
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                IPTC Verified
              </span>
            </div>
          </div>

          {/* Module 3 */}
          <div 
            onClick={() => handleOpenModule('module-03')}
            className="border border-neutral-800 p-5 rounded bg-black/40 hover:border-emerald-500/50 hover:bg-neutral-900/40 transition cursor-pointer group relative shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-neutral-500 font-mono">MODULE_03</div>
              <span className="text-[10px] text-neutral-500 group-hover:text-emerald-400 transition font-mono">
                Click to inspect →
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-emerald-300 transition">
              Entity Disambiguator
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-4 leading-relaxed">
              JSON-LD graph generators ensuring 100% vector match across LLM 
              training corpora.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-neutral-800 text-emerald-400 px-2 py-1 rounded font-mono border border-neutral-700">
                v3.0.1 [DEPLOYED]
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                100% Match
              </span>
            </div>
          </div>
        </section>

        {/* Terminal / CLI Console */}
        <TerminalConsole initialCommand={cliCommand} />

        {/* Cross-Domain Link Binding */}
        <section className="border-t border-neutral-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-neutral-500 gap-4 font-mono">
          <div>
            <span>SOVEREIGN NETWORK: </span>
            <a 
              href="https://jcg.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-300 hover:text-white underline"
            >
              jcg.tech [APEX]
            </a>
            <span className="mx-2">|</span>
            <a 
              href="https://honch.jcg.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-300 hover:text-white underline"
            >
              honch.jcg.tech [MEDIA]
            </a>
          </div>
          <div>© {new Date().getFullYear()} JCG Infrastructure & Growth</div>
        </section>
      </main>

      {/* Interactive Modals and Drawers */}
      <ModuleDetailDrawer
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onRunInTerminal={handleRunInTerminal}
      />

      <DeclarativeRegistryModal
        isOpen={isRegistryModalOpen}
        onClose={() => setIsRegistryModalOpen(false)}
      />

      <SovereignNetworkModal
        isOpen={isNodesModalOpen}
        onClose={() => setIsNodesModalOpen(false)}
      />
    </div>
  );
}
