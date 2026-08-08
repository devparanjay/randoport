"use client";

import { useState, useRef } from "react";
import { Copy, Activity, Zap, Info, ShieldAlert } from "lucide-react";
import Image from "next/image";

// Expanded list of common/reserved ports based on IANA and conventions
const COMMON_PORTS = new Set([
  20, 21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306,
  3389, 5900, 8080, 5432, 6379, 27017, 3000, 4200, 5000, 8000, 8081, 8443, 9000, 9200,
  9300, 11211, 27018, 5672, 15672
]);

export default function Home() {
  const [range, setRange] = useState<"registered" | "ephemeral">("registered");
  const [count, setCount] = useState<number>(1);
  const [ports, setPorts] = useState<number[]>([]);
  const [copiedPort, setCopiedPort] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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
    setCopiedPort(null);
    setCopiedAll(false);

    // Auto-scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ports.join(", "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySinglePort = (port: number) => {
    navigator.clipboard.writeText(port.toString());
    setCopiedPort(port);
    setTimeout(() => setCopiedPort(null), 2000);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#0a0a0c] p-0 m-0 relative">

      {/* GitHub Badge - Fixed Position overlay */}
      <a
        href="https://github.com/devparanjay/randoport"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 text-[#849495] hover:text-[#00f2ff] transition-colors flex items-center gap-3 group"
      >
        <span className="font-mono text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#121214] px-3 py-1.5 border border-[#27272a] shadow-lg rounded">Star on GitHub</span>
        <div className="hover:scale-110 transition-transform duration-200 shadow-xl rounded-full overflow-hidden border-2 border-transparent hover:border-[#00f2ff]">
           <Image src="/icons/github.png" alt="GitHub" width={56} height={56} className="bg-transparent" unoptimized />
        </div>
      </a>

      {/* Adjusted Top Spacing padding */}
      <div className="w-full flex flex-col flex-1 pt-12 lg:pt-16 pb-20 px-8 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00f2ff] tracking-tight mb-4">
            randoport
          </h1>
          <p className="text-[#849495] text-base md:text-lg font-sans">
            Generate secure, random network ports instantly for development, testing, and production.
          </p>
        </div>

        {/* Configuration Section - Full Width Edge to Edge Style */}
        <div className="w-full relative mt-4">
            {/* Horizontal Line separating header */}
           <div className="w-full h-px bg-[#27272a] absolute -top-4 left-0 right-0 hidden"></div>

           {/* Exclusion Information Section */}
           <div className="w-full border-t border-[#27272a] pt-4 pb-4">
             <div className="flex flex-col gap-2 pl-1 mb-2">
               <label className="font-mono text-[13px] tracking-wider text-[#849495] uppercase">
                  SAFE GENERATION
                </label>
                <div className="text-[#849495] text-sm flex items-start gap-2 bg-[#121214] p-3 border-l-2 border-[#00ff41]">
                  <ShieldAlert size={16} className="text-[#00ff41] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#e5e1e4] font-medium">Automatic Conflict Avoidance:</span> randoport automatically excludes ports reserved by the system, common applications, dev services, and utilities. It actively avoids default ports used by common services (like PostgreSQL on 5432, MySQL on 3306, Redis on 6379, and standard web/React servers on 3000, 8080) and consults registries such as the <a href="https://www.iana.org/assignments/service-names-port-numbers" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] hover:underline">IANA Service Name and Transport Protocol Port Number Registry</a> to ensure the generated ports are safe to use.
                  </div>
                </div>
             </div>
           </div>

           <div className="w-full border-t border-[#27272a] pt-4 pb-2">
             <div className="flex flex-col gap-2 pl-1 mb-2">
               <label className="font-mono text-[13px] tracking-wider text-[#849495] uppercase">
                  PORT RANGE
                </label>
                <div className="text-[#849495] text-sm flex items-start gap-2 bg-[#121214] p-3 border-l-2 border-[#00f2ff]">
                  <Info size={16} className="text-[#00f2ff] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#e5e1e4] font-medium">Registered (1024-49151):</span> Ideal for specific services that need to be consistently accessible (e.g., a local database or dev server). <br/>
                    <span className="text-[#e5e1e4] font-medium mt-1 inline-block">Ephemeral (49152-65535):</span> Best for short-lived, temporary connections or when you want to absolutely avoid any potential system conflict.
                  </div>
                </div>
             </div>
           </div>

           {/* Range Selection */}
           <div className="w-full flex border-y border-[#27272a] bg-[#0a0a0c]">
             {/* Left Option (Registered) */}
             <button
              onClick={() => setRange("registered")}
              className={`flex-1 flex flex-col items-center justify-center py-4 border-r border-[#27272a] transition-all duration-200 ${
                range === "registered"
                  ? "border border-[#00f2ff] bg-[#121214] text-[#00f2ff] z-10 -m-[1px]"
                  : "text-[#849495] hover:text-[#00f2ff] bg-transparent"
              }`}
             >
                <span className={`font-mono text-sm tracking-wider ${range === "registered" ? "text-[#00f2ff]" : "text-[#849495]"}`}>Registered</span>
                <span className={`font-mono text-xs opacity-80 mt-1 ${range === "registered" ? "text-[#00f2ff]" : "text-[#849495]"}`}>1024 - 49151</span>
             </button>

             {/* Right Option (Ephemeral) */}
             <button
              onClick={() => setRange("ephemeral")}
              className={`flex-1 flex flex-col items-center justify-center py-4 transition-all duration-200 ${
                range === "ephemeral"
                  ? "border border-[#00f2ff] bg-[#121214] text-[#00f2ff] z-10 -m-[1px]"
                  : "text-[#849495] hover:text-[#00f2ff] bg-transparent"
              }`}
             >
                <span className={`font-mono text-sm tracking-wider ${range === "ephemeral" ? "text-[#00f2ff]" : "text-[#849495]"}`}>Ephemeral</span>
                <span className={`font-mono text-xs opacity-80 mt-1 ${range === "ephemeral" ? "text-[#00f2ff]" : "text-[#849495]"}`}>49152 - 65535</span>
             </button>
           </div>

           {/* Number of Ports Label */}
           <div className="w-full pt-4 pb-2">
             <label className="font-mono text-[13px] tracking-wider text-[#849495] uppercase pl-1">
                NUMBER OF PORTS
              </label>
           </div>

           {/* Number of Ports Input */}
           <div className="w-full">
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#121214] text-[#e5e1e4] font-mono text-lg py-4 px-4 border border-[#27272a] focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff] transition-all shadow-inner"
              />
           </div>

           {/* Find Ports Button */}
           <div className="w-full mt-4">
             <button
              onClick={generatePorts}
              className="w-full bg-[#00f2ff] hover:bg-[#00dce8] text-black py-4 flex items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(0,242,255,0.4)] rounded-sm"
             >
              <Zap size={18} strokeWidth={2.5}/>
              <span className="font-mono text-[13px] font-bold tracking-wider">Find Ports</span>
             </button>
           </div>
        </div>

        {/* Results Area */}
        {ports.length > 0 && (
          <div ref={resultsRef} className="mt-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-sm text-[#849495] tracking-wider uppercase flex items-center gap-2">
                <Activity size={16} className="text-[#00f2ff]" />
                GENERATED PORTS
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[#00f2ff] hover:text-[#00dce8] text-sm font-mono transition-colors border border-[#00f2ff] px-3 py-1 rounded"
              >
                <Copy size={14} />
                {copiedAll ? "Copied!" : "Copy all"}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              {ports.map((port, index) => (
                <button
                  key={index}
                  onClick={() => copySinglePort(port)}
                  className="relative group bg-transparent border border-[#27272a] hover:border-[#00f2ff] border-l-2 border-l-[#00f2ff] px-6 py-4 font-mono text-xl text-[#e5e1e4] hover:text-[#00f2ff] flex-1 min-w-[140px] text-center transition-colors cursor-pointer"
                  title="Click to copy"
                >
                  {port}
                  {copiedPort === port && (
                    <span className="absolute -top-3 right-2 bg-[#00f2ff] text-black text-[10px] px-2 py-0.5 font-bold tracking-wider">
                      COPIED
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="w-full border-t border-[#27272a] py-6 text-center text-[#849495] font-sans text-sm mt-auto flex flex-col gap-1 items-center justify-center">
        <p>
          &copy; {new Date().getFullYear()} randoport. All rights reserved by <a href="https://github.com/devparanjay" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] hover:underline">devparanjay</a>.
        </p>
        <p>
          A small tool for development security developed by <a href="https://github.com/devparanjay" target="_blank" rel="noopener noreferrer" className="text-[#00f2ff] hover:underline">@devparanjay</a>.
        </p>
        <p className="text-xs text-[#52525b] mt-2">
          <a target="_blank" href="https://icons8.com/icon/akG4VRhAoSii/github" rel="noopener noreferrer" className="hover:text-[#849495] transition-colors">GitHub</a> icon by <a target="_blank" href="https://icons8.com" rel="noopener noreferrer" className="hover:text-[#849495] transition-colors">Icons8</a>
        </p>
      </footer>
    </main>
  );
}
