"use client";

import { useState } from "react";
import { Copy, Terminal, Activity, Zap } from "lucide-react";

const COMMON_PORTS = new Set([
  20, 21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306,
  3389, 5900, 8080, 5432, 6379, 27017, 3000, 4200, 5000, 8000
]);

export default function Home() {
  const [range, setRange] = useState<"registered" | "ephemeral">("registered");
  const [count, setCount] = useState<number>(1);
  const [ports, setPorts] = useState<number[]>([]);

  const generatePorts = () => {
    const min = range === "registered" ? 1024 : 49152;
    const max = range === "registered" ? 49151 : 65535;
    const generated = new Set<number>();

    while (generated.size < count) {
      const port = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!COMMON_PORTS.has(port)) {
        generated.add(port);
      }
    }
    setPorts(Array.from(generated));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ports.join(", "));
    // You could add a toast notification here
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Top Navigation */}
      <nav className="w-full max-w-7xl absolute top-0 p-6 flex justify-between items-center border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Terminal className="text-[var(--primary)]" />
          <span className="heading-font text-xl font-bold tracking-tight text-[var(--text-primary)]">randoport</span>
        </div>
        <div className="flex gap-4">
           {/* Add links if needed */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-20 mb-12">
        <h1 className="heading-font text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-4">
          <span className="text-[var(--primary)]">randoport</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
          Generate secure, random network ports instantly for development, testing, and production.
        </p>
      </div>

      {/* Configuration Form */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 max-w-xl w-full shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-[var(--primary)] blur-[10px] opacity-30"></div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block mono-font text-xs font-bold text-[var(--text-secondary)] mb-3 tracking-widest uppercase">
              Port Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRange("registered")}
                className={`py-3 px-4 rounded-lg mono-font text-sm border transition-all duration-200 ${
                  range === "registered"
                    ? "bg-[#1c1c1f] border-[var(--primary)] text-[var(--primary)] shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                    : "bg-[var(--background)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                Registered
                <div className="text-xs opacity-70 mt-1">1024 - 49151</div>
              </button>
              <button
                onClick={() => setRange("ephemeral")}
                className={`py-3 px-4 rounded-lg mono-font text-sm border transition-all duration-200 ${
                  range === "ephemeral"
                    ? "bg-[#1c1c1f] border-[var(--primary)] text-[var(--primary)] shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                    : "bg-[var(--background)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                Ephemeral
                <div className="text-xs opacity-70 mt-1">49152 - 65535</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block mono-font text-xs font-bold text-[var(--text-secondary)] mb-3 tracking-widest uppercase">
              Number of Ports
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-3 px-4 text-[var(--text-primary)] mono-font focus:outline-none focus:border-[var(--primary)] focus:shadow-[inset_0_0_4px_rgba(0,242,255,0.5)] transition-all"
            />
          </div>

          <button
            onClick={generatePorts}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] mt-4"
          >
            <Zap size={20} />
            <span className="heading-font text-lg">Find Ports</span>
          </button>
        </div>
      </div>

      {/* Results Area */}
      {ports.length > 0 && (
        <div className="mt-12 w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="mono-font text-sm font-bold text-[var(--text-secondary)] flex items-center gap-2">
              <Activity size={16} className="text-[var(--secondary)]" />
              GENERATED PORTS
            </h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm mono-font transition-colors"
            >
              <Copy size={16} />
              Copy all
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {ports.map((port, index) => (
              <div
                key={index}
                className="bg-[#121214] border-t-2 border-[var(--secondary)] px-4 py-3 rounded-md mono-font text-lg text-[var(--text-primary)] flex-1 min-w-[120px] text-center shadow-lg"
              >
                {port}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
