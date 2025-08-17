import React from 'react';
import { Code, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-400" />
              <Zap className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PROW AI</h1>
              <p className="text-sm text-slate-400">Verrie goet skripts ent prow uitleg</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-slate-300">AI-Powered</p>
              <p className="text-xs text-slate-500">Script Generation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}