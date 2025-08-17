import React from 'react';
import { History, FileText, Clock, Image } from 'lucide-react';
import type { ScriptResult } from '../types/script';

interface ScriptHistoryProps {
  scripts: ScriptResult[];
  onScriptSelect: (script: ScriptResult) => void;
  currentScriptId?: string;
}

export function ScriptHistory({ scripts, onScriptSelect, currentScriptId }: ScriptHistoryProps) {
  if (scripts.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <History className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Script History</h2>
        </div>
        <p className="text-slate-400 text-sm text-center py-8">
          No scripts generated yet. Create your first script to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center space-x-2 mb-4">
        <History className="h-5 w-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Script History</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {scripts.map((script) => (
          <button
            key={script.id}
            onClick={() => onScriptSelect(script)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              script.id === currentScriptId
                ? 'bg-blue-900/30 border-blue-500'
                : 'bg-slate-700 border-slate-600 hover:bg-slate-650 hover:border-slate-500'
            }`}
          >
            <div className="flex items-start space-x-3">
              <FileText className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-white truncate">
                  {script.name}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-1">
                  {script.path}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{script.timestamp}</span>
                  </div>
                  {script.hasImage && (
                    <div className="flex items-center space-x-1 text-xs text-green-400">
                      <Image className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}