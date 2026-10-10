# 🎛️ JCG System Hub

A centralized system hub and control plane foundational architecture built with TypeScript, Node.js, and Vite. Designed to manage workflow orchestration, core system state, and Google AI Studio API connections.

---

## 🛠️ Tech Stack & Architecture

* **Languages:** TypeScript (98.6%), Other (1.4%)
* **Frontend Infrastructure:** React / TypeScript modular architecture (`src/`)
* **AI & Integration Services:** Google AI Studio / Gemini API foundation (`assets/.aistudio`)
* **Build Tooling:** Vite (`vite.config.ts`), TypeScript Configuration (`tsconfig.json`)

---

## 🔑 Key Features

* **Centralized System Architecture:** Serves as a unified control engine for internal tools, workflow automation, and status tracking.
* **Modular Module Registry:** Extensible component structure designed for fast integration of new AI capabilities and client dashboard modules.
* **Environment Isolation:** Configured with `.env.example` templates for secure API key and environment parameter management.

---

## ⚙️ Local Development Setup

### Prerequisites
* Node.js (v18+)
* NPM or Bun

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/hnchtag-ops/Jcg-System-Hub.git](https://github.com/hnchtag-ops/Jcg-System-Hub.git)
   cd Jcg-System-Hub
