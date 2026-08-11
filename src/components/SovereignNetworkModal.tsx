import React from 'react';
import { X, Network, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { NETWORK_NODES } from '../data/hubData';

interface SovereignNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SovereignNetworkModal: React.FC<SovereignNetworkModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-start bg-neutral-950">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Network className="w-3.5 h-3.5" />
              <span>// Sovereign Network Topology</span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white">
              JCG™ Edge Node Binding Matrix
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs text-neutral-300 font-sans leading-relaxed bg-neutral-950 p-4 rounded border border-neutral-800">
            The <strong>JCG™ Sovereign Network</strong> maintains cross-domain link binding across <strong>jcg.io</strong> (Developer Registry), <strong>jcg.tech</strong> (Apex Production Frameworks), and <strong>honch.jcg.tech</strong> (Media & Growth Engine).
          </p>

          <div className="space-y-3 font-mono text-xs">
            {NETWORK_NODES.map(node => (
              <div
                key={node.id}
                className="p-4 bg-black rounded border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-neutral-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{node.name}</span>
                    <span className="text-[10px] bg-neutral-800 text-emerald-400 px-1.5 py-0.5 rounded">
                      {node.type}
                    </span>
                  </div>
                  <div className="text-neutral-400 text-[11px]">{node.role}</div>
                  <div className="text-neutral-500 text-[10px] flex items-center gap-2 pt-1">
                    <span>REGION: {node.region}</span>
                    <span>•</span>
                    <span>PROTOCOL: {node.protocol}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{node.status}</span>
                    </div>
                    <div className="text-[10px] text-neutral-500 flex items-center gap-1 justify-end mt-0.5">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>{node.pingMs}ms latency</span>
                    </div>
                  </div>

                  <a
                    href={`https://${node.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded transition"
                    title={`Visit ${node.domain}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
