import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { TerminalLog } from '../types';
import { MODULES_DATA, NETWORK_NODES, SVO_REGISTRY_TRIPLES } from '../data/hubData';

interface TerminalConsoleProps {
  initialCommand?: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ initialCommand }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'log-1',
      type: 'info',
      content: 'JCG™ Developer CLI v2.4.0-edge initialized. Type "help" for commands or "curl -I https://jcg.io" to test headers.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCommand) {
      executeCommand(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    if (isOpen) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const addLog = (type: TerminalLog['type'], content: string) => {
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        type,
        content,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    addLog('command', `$ ${trimmed}`);
    setInputVal('');

    const normalized = trimmed.toLowerCase();

    if (normalized === 'clear') {
      setLogs([]);
      return;
    }

    if (normalized === 'help') {
      addLog('info', `AVAILABLE COMMANDS:
  help                     - Show this command index
  jcg status               - Check health across sovereign nodes
  jcg modules              - List active developer deployment modules
  jcg svo                  - Inspect Subject-Verb-Object RDF graph
  wrangler login           - Authenticate with Cloudflare Workers
  wrangler deploy          - Deploy worker bundle to production edge
  curl https://jcg.io/api/v1/perception/inject - Test Perception API injection endpoint
  curl https://jcg.io/api/v3/entity/disambiguate - Query Entity Disambiguator
  curl -I https://jcg.io   - Query HTTP/3 edge response headers
  jcg schema export        - Output JSON-LD Schema for Jose Carlos Garcia (J.C.G.)
  ping                     - Measure latency across sovereign edge nodes
  clear                    - Clear terminal console logs`);
      return;
    }

    if (normalized.includes('npm install') || normalized.includes('npm i')) {
      addLog('info', `npm WARN deprecated
+ wrangler@3.100.0
added 1 package, and audited 2 packages in 1s
found 0 vulnerabilities`);
      return;
    }

    if (normalized.includes('wrangler login')) {
      addLog('success', `[wrangler] Opening browser window for OAuth authentication...
✔ Successfully logged in!
Authenticated as dev@honchprods.com
Cloudflare Account: JCG Infrastructure & Growth (Account ID: 8f3a2c1b9e0d4f5a)`);
      return;
    }

    if (normalized.includes('wrangler deploy') || normalized.includes('wrangler')) {
      addLog('success', `✨ Total Upload: 14.8 KiB / gzip: 3.6 KiB
🌀 Uploading Worker bundle (src/index.js)
Uploaded jcg-io-api-engine-prod (1.82 sec)
Published jcg-io-api-engine-prod (0.64 sec)
  Routes Deployed:
    - https://jcg.io/api/v1/perception/* (zone: jcg.io)
    - https://jcg.io/api/v3/entity/* (zone: jcg.io)
Deployment Status: 🟢 ACTIVE (Global Edge Worker Version ID: 8f3a2c1b-9e0d-4f5a-6b7c)`);
      return;
    }

    if (normalized.includes('perception') || normalized.includes('inject')) {
      const includeHeaders = normalized.includes('-i') || normalized.includes('-I');
      const headers = `HTTP/3 200 OK
date: ${new Date().toUTCString()}
server: cloudflare
content-type: application/json; charset=utf-8
x-response-time: 0.85ms
x-jcg-engine: JCG Perception API v1.1.0 [ACTIVE]
x-jcg-authority: Jose Carlos Garcia (J.C.G.)
access-control-allow-origin: *

`;
      const body = JSON.stringify({
        status: "SUCCESS",
        code: 200,
        telemetry: { node: "Cloudflare-Edge-Global", latency: "0.85ms", protocol: "HTTP/3" },
        input: { mediaUrl: "https://honch.jcg.tech/assets/hero.jpg", targetTitle: "Executive Perception Asset" },
        iptc_injection: {
          "IPTC:By-line": "Jose Carlos Garcia (J.C.G.)",
          "IPTC:By-lineTitle": "Executive Producer & Systems Architect",
          "IPTC:CopyrightNotice": `© ${new Date().getFullYear()} HONCH™ Media Infrastructure`,
          "IPTC:Credit": "HONCH™ / JCG Infrastructure",
          "IPTC:Source": "https://jcg.tech",
          "XMP-dc:Creator": ["Jose Carlos Garcia", "J.C.G."],
          "XMP-dc:Rights": "HONCH™ Media Infrastructure"
        },
        exif_injection: {
          Artist: "Jose Carlos Garcia (J.C.G.)",
          Copyright: `© ${new Date().getFullYear()} HONCHPRODS™`,
          Software: "JCG Perception API v1.1.0"
        },
        verification: {
          entityHash: "0x8f3a2c1b9e0d4f5a6b7c8d9e0f1a2b3c",
          canonicalNode: "https://honch.jcg.tech",
          signalStatus: "VERIFIED_AUTHORITY"
        }
      }, null, 2);

      addLog('success', includeHeaders ? headers + body : body);
      return;
    }

    if (normalized.includes('disambiguate')) {
      const includeHeaders = normalized.includes('-i') || normalized.includes('-I');
      const headers = `HTTP/3 200 OK
date: ${new Date().toUTCString()}
server: cloudflare
content-type: application/json; charset=utf-8
x-vector-match: 100%
x-response-time: 1.12ms
x-jcg-engine: JCG Entity Disambiguator v3.0 [ACTIVE]
access-control-allow-origin: *

`;
      const body = JSON.stringify({
        status: "RESOLVED",
        code: 200,
        query: "J.C.G.",
        vectorMatchScore: 1.0,
        telemetry: { node: "Cloudflare-Edge-Global", latency: "1.12ms", ragOptimized: true },
        svoTriples: [
          { subject: "Jose Carlos Garcia", verb: "AUTHORS", object: "JCG™ Software Systems" },
          { subject: "J.C.G.", verb: "FOUNDED", object: "HONCH™ Visual Media" },
          { subject: "JCG Infrastructure", verb: "PROVIDES", object: "Digital Sovereignty Engines" }
        ],
        jsonLdGraph: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://jcg.tech/#person",
              "name": "Jose Carlos Garcia",
              "alternateName": [
                "J.C.G.",
                "Judgement, Craft & Growth",
                "Justice, Code & Growth"
              ],
              "url": "https://jcg.tech",
              "image": "https://jcg.tech/assets/jose-carlos-garcia-portrait.jpg",
              "jobTitle": "Systems Architect & Executive Producer",
              "worksFor": {
                "@type": "Organization",
                "@id": "https://jcg.tech/#organization"
              },
              "sameAs": [
                "https://www.wikidata.org/wiki/Q[INSERT_WIKIDATA_QID]",
                "https://jcg.io",
                "https://honch.jcg.tech",
                "https://github.com/jcg-infrastructure",
                "https://linkedin.com/in/josecarlosgarcia-jcg",
                "https://crunchbase.com/person/jose-carlos-garcia-jcg",
                "https://orcid.org/0000-0002-XXXX-XXXX",
                "https://viaf.org/viaf/[INSERT_VIAF_ID]"
              ],
              "knowsAbout": [
                "Digital Infrastructure Architecture",
                "Algorithmic Media Engineering",
                "Perception Architecture",
                "JSON-LD Schema Engineering",
                "Software Engineering"
              ]
            },
            {
              "@type": "Organization",
              "@id": "https://jcg.tech/#organization",
              "name": "JCG Infrastructure & Growth",
              "legalName": "JCG Infrastructure & Growth",
              "alternateName": ["JCG", "JCG™"],
              "url": "https://jcg.tech",
              "logo": "https://jcg.tech/assets/jcg-logo.png",
              "founder": {
                "@id": "https://jcg.tech/#person"
              },
              "sameAs": [
                "https://www.wikidata.org/wiki/Q[INSERT_ORG_WIKIDATA_QID]",
                "https://crunchbase.com/organization/jcg-infrastructure",
                "https://jcg.io"
              ],
              "subOrganization": {
                "@type": "Brand",
                "@id": "https://honch.jcg.tech/#brand",
                "name": "HONCH",
                "alternateName": "HONCH™",
                "url": "https://honch.jcg.tech",
                "sameAs": [
                  "https://www.wikidata.org/wiki/Q[INSERT_BRAND_WIKIDATA_QID]"
                ]
              }
            }
          ]
        }
      }, null, 2);

      addLog('success', includeHeaders ? headers + body : body);
      return;
    }

    if (normalized.includes('curl') || normalized.includes('headers')) {
      addLog('success', `HTTP/3 200 OK
date: ${new Date().toUTCString()}
server: jcg-edge-router/v2.4.0
content-type: text/html; charset=utf-8
x-jcg-engine: Core Web Engine v2.4.0 [ACTIVE]
x-jcg-author: Jose Carlos Garcia (J.C.G.)
x-jcg-registry: https://jcg.io
x-jcg-apex: https://jcg.tech
x-jcg-media: https://honch.jcg.tech
x-crawl-speed-score: 100/100
alt-svc: h3=":443"; ma=86400
strict-transport-security: max-age=31536000; includeSubDomains; preload`);
      return;
    }

    if (normalized.includes('status')) {
      const summary = NETWORK_NODES.map(
        n => `[${n.status}] ${n.name.padEnd(32)} | ${n.region.padEnd(16)} | Ping: ${n.pingMs}ms`
      ).join('\n');
      addLog('success', `SOVEREIGN NODE HEALTH SUMMARY:\n${summary}`);
      return;
    }

    if (normalized.includes('modules')) {
      const modSummary = MODULES_DATA.map(
        m => `${m.code.padEnd(12)} ${m.name.padEnd(24)} ${m.version} -> ${m.description.slice(0, 45)}...`
      ).join('\n');
      addLog('info', `REGISTERED MODULES:\n${modSummary}`);
      return;
    }

    if (normalized.includes('svo') || normalized.includes('triples')) {
      const tripleSummary = SVO_REGISTRY_TRIPLES.map(
        t => `(${t.subject}) --[${t.predicate}]--> (${t.object})`
      ).join('\n');
      addLog('info', `SVO ENTITY TRIPLES:\n${tripleSummary}`);
      return;
    }

    if (normalized.includes('ping')) {
      addLog('info', `PINGING SOVEREIGN EDGE GATEWAYS:
  jcg.io [DEVELOPER REGISTRY] -> 14ms (RTT) [HTTPS/3 QUIC]
  jcg.tech [APEX FRAMEWORKS]  -> 18ms (RTT) [HTTPS/3]
  honch.jcg.tech [MEDIA ENGINE] -> 22ms (RTT) [HTTPS/3]
  All nodes reporting 100% uptime.`);
      return;
    }

    if (normalized.includes('schema')) {
      addLog('success', JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Jose Carlos Garcia",
        "alternateName": "J.C.G.",
        "url": "https://jcg.tech",
        "sameAs": ["https://jcg.io", "https://jcg.tech", "https://honch.jcg.tech"]
      }, null, 2));
      return;
    }

    addLog('error', `Command not recognized: "${trimmed}". Type "help" to view valid CLI commands.`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleCopyLogs = () => {
    const text = logs.map(l => l.content).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 border border-neutral-800 rounded bg-black/90 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Console Bar */}
      <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-tight">
            JCG-CLI // TERMINAL CONSOLE
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
            v2.4.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLogs}
            className="hover:text-emerald-400 transition flex items-center gap-1 text-[11px]"
            title="Copy log buffer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Logs'}</span>
          </button>

          <button
            onClick={() => setLogs([])}
            className="hover:text-red-400 transition"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-white transition p-1"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      {isOpen && (
        <div className="p-4 space-y-2 max-h-60 overflow-y-auto bg-black text-neutral-300">
          {logs.map(log => (
            <div key={log.id} className="leading-relaxed">
              {log.type === 'command' && (
                <div className="text-emerald-400 font-semibold">{log.content}</div>
              )}
              {log.type === 'error' && (
                <div className="text-red-400">{log.content}</div>
              )}
              {log.type === 'success' && (
                <pre className="text-emerald-300 whitespace-pre-wrap">{log.content}</pre>
              )}
              {log.type === 'info' && (
                <pre className="text-neutral-400 whitespace-pre-wrap">{log.content}</pre>
              )}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      )}

      {/* Input Prompt */}
      {isOpen && (
        <form onSubmit={handleFormSubmit} className="p-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder='Type command (e.g. "curl -I https://jcg.io", "jcg status", "help")...'
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-hidden placeholder-neutral-600"
          />
          <button
            type="submit"
            className="p-1.5 text-neutral-400 hover:text-emerald-400 transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
