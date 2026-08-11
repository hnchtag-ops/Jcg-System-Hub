import React, { useState } from 'react';
import { X, Copy, Check, Database, GitMerge, FileCode, Search, Server, GitBranch, Bot, Globe } from 'lucide-react';
import { SVO_REGISTRY_TRIPLES, WRANGLER_TOML_CONFIG, WORKER_INDEX_JS, GITHUB_ACTIONS_WORKFLOW, NEXT_ROBOTS_CONFIG, NEXT_SITEMAP_CONFIG } from '../data/hubData';

interface DeclarativeRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeclarativeRegistryModal: React.FC<DeclarativeRegistryModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'triples' | 'jsonld' | 'vector' | 'wrangler' | 'worker' | 'workflow' | 'robots' | 'sitemap'>('triples');

  const [filterQuery, setFilterQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedWrangler, setCopiedWrangler] = useState(false);

  const filteredTriples = SVO_REGISTRY_TRIPLES.filter(t =>
    t.subject.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.predicate.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.object.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const fullSchemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jcg.io/#author",
        "name": "Jose Carlos Garcia",
        "alternateName": ["J.C.G.", "Jose Carlos Garcia (J.C.G.)"],
        "url": "https://jcg.tech",
        "sameAs": [
          "https://jcg.io",
          "https://jcg.tech",
          "https://honch.jcg.tech"
        ],
        "jobTitle": "Systems Architect & Software Developer",
        "knowsAbout": ["SSR Web Engines", "IPTC Perception Metadata", "JSON-LD Entity Disambiguation", "HTTP/3 Systems"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://jcg.io/#registry",
        "name": "JCG™ SYSTEMS HUB",
        "codeRepository": "https://jcg.io",
        "author": { "@id": "https://jcg.io/#author" },
        "programmingLanguage": "TypeScript / React / SSR",
        "runtimePlatform": "Cloud Run Edge HTTP/3"
      },
      {
        "@type": "WebSite",
        "@id": "https://jcg.io/#website",
        "url": "https://jcg.io",
        "name": "JCG.IO // Developer Registry",
        "publisher": { "@id": "https://jcg.io/#author" }
      }
    ]
  }, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(fullSchemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-start bg-neutral-950">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>// Declarative System Registry & SVO Entity Index</span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white">
              JCG.IO Canonical Entity Graph
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('triples')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'triples'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>SVO RDF Triples ({SVO_REGISTRY_TRIPLES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jsonld')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'jsonld'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Canonical Schema.org Graph</span>
          </button>

          <button
            onClick={() => setActiveTab('vector')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'vector'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>LLM Vector Match Status</span>
          </button>

          <button
            onClick={() => setActiveTab('wrangler')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'wrangler'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Edge wrangler.toml</span>
          </button>

          <button
            onClick={() => setActiveTab('worker')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'worker'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Worker Engine (src/index.js)</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'workflow'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-sky-400" />
            <span>GitHub CI/CD Action</span>
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'robots'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Bot Crawl Policy (robots.ts)</span>
          </button>

          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'sitemap'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sitemap Index (sitemap.ts)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'triples' && (
            <div className="space-y-4">
              {/* Filter bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter SVO triples by subject, predicate, or object..."
                  value={filterQuery}
                  onChange={e => setFilterQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Table */}
              <div className="border border-neutral-800 rounded overflow-hidden bg-neutral-950">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-[11px]">
                    <tr>
                      <th className="p-3">SUBJECT</th>
                      <th className="p-3">PREDICATE</th>
                      <th className="p-3">OBJECT</th>
                      <th className="p-3 text-right">CONFIDENCE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850">
                    {filteredTriples.map((t, idx) => (
                      <tr key={idx} className="hover:bg-neutral-900/60 transition">
                        <td className="p-3 font-semibold text-white">{t.subject}</td>
                        <td className="p-3 text-emerald-400 text-[11px]">{t.predicate}</td>
                        <td className="p-3 text-neutral-300">{t.object}</td>
                        <td className="p-3 text-right">
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded text-[10px]">
                            {(t.confidence * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// Canonical Schema.org JSON-LD Payload for Jose Carlos Garcia (J.C.G.)</span>
                <button
                  onClick={handleCopySchema}
                  className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{fullSchemaJson}</code>
              </pre>
            </div>
          )}

          {activeTab === 'vector' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-3">
                <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  // LLM Corpora Vector Embedding Alignment
                </h3>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Module 03 (Entity Disambiguator) monitors and syncs vector embeddings across major foundation models (Google Gemini, OpenAI, Anthropic Claude) to maintain 100% vector match accuracy for Jose Carlos Garcia (J.C.G.) and associated endpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-black rounded border border-neutral-800 space-y-2">
                  <div className="text-neutral-500 text-[10px]">CORPUS TARGET</div>
                  <div className="text-white font-bold text-sm">Google Gemini LLM Index</div>
                  <div className="flex justify-between text-neutral-400 text-[11px] pt-2 border-t border-neutral-850">
                    <span>SIMILARITY SCORE:</span>
                    <span className="text-emerald-400 font-bold">0.9998 (EXACT)</span>
                  </div>
                </div>

                <div className="p-4 bg-black rounded border border-neutral-800 space-y-2">
                  <div className="text-neutral-500 text-[10px]">CORPUS TARGET</div>
                  <div className="text-white font-bold text-sm">OpenAI GPT-4o Embeddings</div>
                  <div className="flex justify-between text-neutral-400 text-[11px] pt-2 border-t border-neutral-850">
                    <span>SIMILARITY SCORE:</span>
                    <span className="text-emerald-400 font-bold">0.9994 (EXACT)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wrangler' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  // Cloudflare Workers Production Wrangler Configuration
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Defines Cloudflare Worker route patterns for <code>jcg.io/api/v1/perception/*</code> and <code>jcg.io/api/v3/entity/*</code> for high-throughput edge execution and observability.
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// wrangler.toml (Production Environment)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(WRANGLER_TOML_CONFIG);
                    setCopiedWrangler(true);
                    setTimeout(() => setCopiedWrangler(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copiedWrangler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWrangler ? 'Copied to Clipboard' : 'Copy wrangler.toml'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{WRANGLER_TOML_CONFIG}</code>
              </pre>
            </div>
          )}

          {activeTab === 'worker' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  // JCG.IO Consolidated Worker Engine Source Code
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Handles live edge requests for <code>/api/v1/perception/inject</code> (IPTC/EXIF metadata injection) and <code>/api/v3/entity/disambiguate</code> (JSON-LD and vector match RAG alignment).
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// src/index.js (Cloudflare Worker Implementation)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(WORKER_INDEX_JS);
                    setCopiedWrangler(true);
                    setTimeout(() => setCopiedWrangler(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copiedWrangler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWrangler ? 'Copied to Clipboard' : 'Copy Worker JS'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{WORKER_INDEX_JS}</code>
              </pre>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  // GitHub Actions Continuous Deployment Pipeline
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Automated deployment pipeline on <code>main</code> branch push using <code>cloudflare/wrangler-action@v3</code> targeting Cloudflare Workers edge runtime.
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// .github/workflows/deploy-worker.yml</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(GITHUB_ACTIONS_WORKFLOW);
                    setCopiedWrangler(true);
                    setTimeout(() => setCopiedWrangler(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-sky-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copiedWrangler ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWrangler ? 'Copied to Clipboard' : 'Copy Workflow YAML'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{GITHUB_ACTIONS_WORKFLOW}</code>
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  // Next.js App Router Metadata Robots Route
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Allows web crawlers and AI bots (GPTBot, ClaudeBot, PerplexityBot, CCBot, Googlebot) full access to site routes and binds the sitemap URI <code>https://jcg.tech/sitemap.xml</code>.
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// src/app/robots.ts</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(NEXT_ROBOTS_CONFIG);
                    setCopiedWrangler(true);
                    setTimeout(() => setCopiedWrangler(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-amber-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copiedWrangler ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWrangler ? 'Copied to Clipboard' : 'Copy Robots TS'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{NEXT_ROBOTS_CONFIG}</code>
              </pre>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  // Next.js App Router Metadata Sitemap Route
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Exports dynamic sitemap entries mapping <code>https://jcg.tech</code>, <code>https://jcg.io</code>, and <code>https://honch.jcg.tech</code> with weekly update frequency and prioritization.
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// src/app/sitemap.ts</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(NEXT_SITEMAP_CONFIG);
                    setCopiedWrangler(true);
                    setTimeout(() => setCopiedWrangler(false), 2000);
                  }}
                  className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded transition text-xs font-mono"
                >
                  {copiedWrangler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWrangler ? 'Copied to Clipboard' : 'Copy Sitemap TS'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{NEXT_SITEMAP_CONFIG}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
