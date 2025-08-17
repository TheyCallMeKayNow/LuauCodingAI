import React, { useState } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';

interface ScriptInputProps {
  onGenerate: (prompt: string, image?: string) => void;
  isGenerating: boolean;
  uploadedImage: string | null;
}

export function ScriptInput({ onGenerate, isGenerating, uploadedImage }: ScriptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim(), uploadedImage || undefined);
    }
  };

  const suggestions = [
    "Create a simple button that prints when clicked",
    "Make a script that spawns a part when player joins",
    "Create a coin that players can collect",
    "Make a script that changes walk speed with shift key",
    "What is the difference between a Script and LocalScript?"
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="h-5 w-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Script Requirements</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what kind of Luau script you need. Be specific about functionality, UI elements, interactions, or game mechanics..."
            className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isGenerating}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-400">
            {uploadedImage ? (
              <span className="text-green-400">✓ Image will be analyzed</span>
            ) : (
              <span>Optional: Upload an image for visual context</span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Generate Script</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-sm text-slate-400 mb-3">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setPrompt(suggestion)}
              disabled={isGenerating}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}