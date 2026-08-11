import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Wifi, RefreshCw } from 'lucide-react';
import { NETWORK_NODES } from '../data/hubData';

interface HeaderProtocolProps {
  onOpenNodesModal?: () => void;
}

export const HeaderProtocol: React.FC<HeaderProtocolProps> = ({ onOpenNodesModal }) => {
  const [ping, setPing] = useState(14);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('JUST NOW');

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, Math.min(28, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPing(Math.floor(Math.random() * 6) + 12);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-neutral-500 border-b border-neutral-800 pb-4 mb-8 gap-3">
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 font-mono">NODE:</span>
        <span className="text-white font-mono font-medium tracking-tight">
          JCG.IO // DEVELOPER REGISTRY
        </span>
        <button
          onClick={onOpenNodesModal}
          className="ml-2 text-[10px] text-neutral-400 hover:text-emerald-400 border border-neutral-800 hover:border-emerald-500/40 px-2 py-0.5 rounded font-mono transition flex items-center gap-1"
          title="Inspect Sovereign Nodes"
        >
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>{NETWORK_NODES.length} NODES</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 font-mono">
        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold">STATUS: 200 OK</span>
        </div>

        <div className="flex items-center gap-1.5 text-neutral-400">
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>PROTOCOL: HTTPS/3</span>
        </div>

        <div className="flex items-center gap-1.5 text-neutral-400 hidden md:flex">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{ping}ms</span>
        </div>

        <button
          onClick={handleRefresh}
          className="text-neutral-500 hover:text-white transition p-1"
          title={`Refresh node status (Last: ${lastUpdated})`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>
    </div>
  );
};
