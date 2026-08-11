export interface ModuleEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  path: string;
  description: string;
  parameters?: { name: string; type: string; required: boolean; description: string }[];
  sampleResponse: Record<string, unknown> | string;
}

export interface ModuleItem {
  id: string;
  code: string; // e.g. "MODULE_01"
  name: string; // e.g. "Core Web Engine"
  description: string;
  version: string; // e.g. "v2.4.0 [ACTIVE]"
  status: 'ACTIVE' | 'STABLE' | 'DEPLOYED' | 'EXPERIMENTAL';
  architecture: string;
  endpoints: ModuleEndpoint[];
  features: string[];
  codeSnippet: string;
  jsonLdSnippet?: string;
  wranglerConfig?: string;
  workerJsCode?: string;
  githubWorkflowYaml?: string;
  metrics: {
    latency: string;
    throughput: string;
    reliability: string;
    crawlSpeedScore: string;
  };
}

export interface NodeStatus {
  id: string;
  name: string;
  domain: string;
  role: string;
  region: string;
  pingMs: number;
  status: '200 OK' | 'HEALTHY' | 'SYNCHRONIZED';
  protocol: string;
  type: 'APEX' | 'REGISTRY' | 'MEDIA' | 'EDGE';
}

export interface SVOTriple {
  subject: string;
  predicate: string;
  object: string;
  confidence: number;
  context: string;
}

export interface TerminalLog {
  id: string;
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp: string;
}
