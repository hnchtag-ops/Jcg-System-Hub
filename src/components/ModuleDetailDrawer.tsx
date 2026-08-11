import React, { useState } from 'react';
import { X, Code2, Play, Copy, Check, Terminal, Cpu, Zap, FileText, Server, GitBranch } from 'lucide-react';
import { ModuleItem } from '../types';

interface ModuleDetailDrawerProps {
  module: ModuleItem | null;
  onClose: () => void;
  onRunInTerminal?: (command: string) => void;
}

export const ModuleDetailDrawer: React.FC<ModuleDetailDrawerProps> = ({
  module,
  onClose,
  onRunInTerminal
}) => {
  if (!module) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'code' | 'schema' | 'wrangler' | 'workerjs' | 'workflow'>('overview');
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const endpoint = module.endpoints[selectedEndpointIndex] || module.endpoints[0];

  const handleExecuteApi = () => {
    setIsCallingApi(true);
    setApiResponse(null);
    setTimeout(() => {
      setIsCallingApi(false);
      setApiResponse(JSON.stringify(endpoint.sampleResponse, null, 2));
    }, 400);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-neutral-900 border-l border-neutral-800 h-full flex flex-col text-neutral-100 shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-start bg-neutral-950/60">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded">
                {module.code}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                {module.version}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-mono text-white tracking-tight">
              {module.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition"
            aria-label="Close detail panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/30 px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Overview & Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'api'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>API Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>SDK Code</span>
          </button>

          {module.jsonLdSnippet && (
            <button
              onClick={() => setActiveTab('schema')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                activeTab === 'schema'
                  ? 'border-emerald-400 text-emerald-400 font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>JSON-LD Schema</span>
            </button>
          )}

          {module.wranglerConfig && (
            <button
              onClick={() => setActiveTab('wrangler')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                activeTab === 'wrangler'
                  ? 'border-emerald-400 text-emerald-400 font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>wrangler.toml</span>
            </button>
          )}

          {module.workerJsCode && (
            <button
              onClick={() => setActiveTab('workerjs')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                activeTab === 'workerjs'
                  ? 'border-emerald-400 text-emerald-400 font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Worker Script (index.js)</span>
            </button>
          )}

          {module.githubWorkflowYaml && (
            <button
              onClick={() => setActiveTab('workflow')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
                activeTab === 'workflow'
                  ? 'border-emerald-400 text-emerald-400 font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-sky-400" />
              <span>GitHub CI/CD (.github/workflows)</span>
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  // Description
                </h3>
                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Architecture */}
              <div>
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  // Architecture Baseline
                </h3>
                <div className="bg-neutral-950/80 p-3 rounded border border-neutral-800 font-mono text-xs text-emerald-300">
                  {module.architecture}
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div>
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  // Performance Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-mono">LATENCY</div>
                    <div className="text-lg font-bold font-mono text-white mt-0.5">{module.metrics.latency}</div>
                  </div>
                  <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-mono">THROUGHPUT</div>
                    <div className="text-lg font-bold font-mono text-white mt-0.5">{module.metrics.throughput}</div>
                  </div>
                  <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-mono">RELIABILITY</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">{module.metrics.reliability}</div>
                  </div>
                  <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-mono">SEO / CRAWL RATING</div>
                    <div className="text-sm font-bold font-mono text-emerald-300 mt-1">{module.metrics.crawlSpeedScore}</div>
                  </div>
                </div>
              </div>

              {/* Core Capabilities */}
              <div>
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  // Module Features & Safeguards
                </h3>
                <ul className="space-y-2">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex gap-3">
                <button
                  onClick={() => setActiveTab('api')}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-medium text-xs py-2.5 px-4 rounded transition flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch API Inspector</span>
                </button>

                {onRunInTerminal && (
                  <button
                    onClick={() => {
                      onRunInTerminal(`curl -I https://jcg.io${endpoint.path}`);
                      onClose();
                    }}
                    className="border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white font-mono text-xs py-2.5 px-4 rounded transition flex items-center gap-2"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test in CLI</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              {/* Endpoint Selector */}
              <div>
                <label className="text-xs font-mono text-neutral-500 block mb-2">
                  SELECT ENDPOINT:
                </label>
                <div className="space-y-2">
                  {module.endpoints.map((ep, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedEndpointIndex(idx);
                        setApiResponse(null);
                      }}
                      className={`w-full text-left p-3 rounded border font-mono text-xs transition flex items-center justify-between ${
                        selectedEndpointIndex === idx
                          ? 'border-emerald-500 bg-neutral-950 text-white'
                          : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          ep.method === 'GET' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                        }`}>
                          {ep.method}
                        </span>
                        <span>{ep.path}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {ep.description.slice(0, 35)}...
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoint Details */}
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-mono text-neutral-400">
                    {endpoint.description}
                  </div>
                  <button
                    onClick={() => handleCopy(`https://jcg.io${endpoint.path}`, 'url')}
                    className="text-[10px] font-mono text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                  >
                    {copiedText === 'url' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText === 'url' ? 'COPIED' : 'COPY URL'}</span>
                  </button>
                </div>

                <div className="p-2.5 bg-black rounded font-mono text-xs text-emerald-300 flex justify-between items-center border border-neutral-850">
                  <span>https://jcg.io{endpoint.path}</span>
                  <span className="text-[10px] text-neutral-500">HOST: jcg.io</span>
                </div>

                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 mb-1.5 uppercase">Query / Body Parameters:</div>
                    <div className="space-y-1">
                      {endpoint.parameters.map((param, pIdx) => (
                        <div key={pIdx} className="text-xs font-mono flex items-center justify-between bg-neutral-900/80 p-2 rounded border border-neutral-800">
                          <div>
                            <span className="text-emerald-400 font-semibold">{param.name}</span>
                            <span className="text-neutral-500 ml-2">({param.type})</span>
                            {param.required && <span className="text-red-400 text-[10px] ml-2">*required</span>}
                          </div>
                          <span className="text-neutral-400 text-[10px]">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Run Request Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleExecuteApi}
                  disabled={isCallingApi}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-medium text-xs py-2.5 px-4 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isCallingApi ? 'animate-spin' : ''}`} />
                  <span>{isCallingApi ? 'Executing Query...' : 'Execute Live API Test'}</span>
                </button>
              </div>

              {/* API Response Console */}
              {apiResponse && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">// Response Payload [HTTP 200 OK]:</span>
                    <button
                      onClick={() => handleCopy(apiResponse, 'json')}
                      className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                    >
                      {copiedText === 'json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                    {apiResponse}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// TypeScript SDK Implementation Example</span>
                <button
                  onClick={() => handleCopy(module.codeSnippet, 'sdk')}
                  className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedText === 'sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'sdk' ? 'COPIED' : 'COPY CODE'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{module.codeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === 'schema' && module.jsonLdSnippet && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// Declarative JSON-LD Schema.org Markup</span>
                <button
                  onClick={() => handleCopy(module.jsonLdSnippet!, 'jsonld')}
                  className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedText === 'jsonld' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'jsonld' ? 'COPIED' : 'COPY SCHEMA'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{module.jsonLdSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === 'wrangler' && module.wranglerConfig && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// Cloudflare Worker / Wrangler Production Edge Config (wrangler.toml)</span>
                <button
                  onClick={() => handleCopy(module.wranglerConfig!, 'wrangler')}
                  className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedText === 'wrangler' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'wrangler' ? 'COPIED' : 'COPY TOML'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{module.wranglerConfig}</code>
              </pre>
            </div>
          )}

          {activeTab === 'workerjs' && module.workerJsCode && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// JCG.IO Edge Worker Engine (src/index.js)</span>
                <button
                  onClick={() => handleCopy(module.workerJsCode!, 'workerjs')}
                  className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedText === 'workerjs' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'workerjs' ? 'COPIED' : 'COPY WORKER JS'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{module.workerJsCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'workflow' && module.githubWorkflowYaml && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>// GitHub Actions Continuous Deployment Workflow (.github/workflows/deploy.yml)</span>
                <button
                  onClick={() => handleCopy(module.githubWorkflowYaml!, 'workflow')}
                  className="text-neutral-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedText === 'workflow' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'workflow' ? 'COPIED' : 'COPY WORKFLOW YAML'}</span>
                </button>
              </div>

              <pre className="p-4 bg-black rounded border border-neutral-800 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{module.githubWorkflowYaml}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
