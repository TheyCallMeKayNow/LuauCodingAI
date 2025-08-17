import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import type { QuestionResult } from '../types/script';

interface QuestionAnswerProps {
  answer: QuestionResult;
}

export function QuestionAnswer({ answer }: QuestionAnswerProps) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-750 px-6 py-4 border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-6 w-6 text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Question & Answer</h2>
              <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                <Clock className="h-3 w-3" />
                <span>{answer.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Question */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Question:</h3>
          <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-blue-400">
            <p className="text-slate-300">{answer.question}</p>
          </div>
        </div>

        {/* Answer */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Answer:</h3>
          <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-green-400">
            <div className="text-slate-300 whitespace-pre-line">
              {answer.answer.split('\n').map((line, index) => {
                // Handle markdown-style formatting
                if (line.startsWith('• **') && line.includes('**')) {
                  const parts = line.split('**');
                  return (
                    <div key={index} className="mb-1">
                      <span className="text-green-400">• </span>
                      <span className="font-semibold text-white">{parts[1]}</span>
                      <span className="text-slate-300">{parts[2]}</span>
                    </div>
                  );
                }
                return <div key={index} className="mb-1">{line}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}