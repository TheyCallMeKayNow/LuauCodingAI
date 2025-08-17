import React from 'react';
import { Copy, FileText, Lightbulb, Clock, Image, CheckCircle } from 'lucide-react';
import type { ScriptResult, ImprovementTip } from '../types/script';

interface ScriptOutputProps {
  script: ScriptResult;
  onImprovementClick: (tip: ImprovementTip) => void;
  isGenerating: boolean;
}

export function ScriptOutput({ script, onImprovementClick, isGenerating }: ScriptOutputProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(script.script);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-750 px-6 py-4 border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">{script.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-sm text-slate-400">{script.path}</p>
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{script.timestamp}</span>
                </div>
                {script.hasImage && (
                  <div className="flex items-center space-x-1 text-xs text-green-400">
                    <Image className="h-3 w-3" />
                    <span>Image analyzed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Script</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Changes Made */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>Changes Made</span>
          </h3>
          <ul className="space-y-2">
            {script.changesMade.map((change, index) => (
              <li key={index} className="flex items-start space-x-2 text-slate-300">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-sm">{change}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Script */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Full Script</h3>
          <div className="bg-slate-900 rounded-lg border border-slate-600 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-600">
              <span className="text-xs text-slate-400 font-mono">{script.name}.lua</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                <code>{script.script}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>Improvement Tips</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {script.improvementTips.map((tip) => (
              <button
                key={tip.id}
                onClick={() => onImprovementClick(tip)}
                disabled={isGenerating}
                className="text-left p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-blue-500 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <h4 className="font-semibold text-white group-hover:text-blue-400 mb-1">
                  {tip.title}
                </h4>
                <p className="text-sm text-slate-400">
                  {tip.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}