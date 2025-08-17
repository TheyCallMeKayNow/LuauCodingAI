import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { ScriptInput } from './components/ScriptInput';
import { ScriptOutput } from './components/ScriptOutput';
import { QuestionAnswer } from './components/QuestionAnswer';
import { Header } from './components/Header';
import { ScriptHistory } from './components/ScriptHistory';
import type { ScriptResult, ImprovementTip, QuestionResult } from './types/script';

function App() {
  const [currentScript, setCurrentScript] = useState<ScriptResult | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionResult | null>(null);
  const [scriptHistory, setScriptHistory] = useState<ScriptResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleScriptGeneration = async (prompt: string, image?: string) => {
    setIsGenerating(true);
    setCurrentAnswer(null); // Clear any previous answers
    
    // Check if this is a question rather than a script request
    if (isQuestion(prompt)) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const answer = generateAnswer(prompt);
      setCurrentAnswer(answer);
      setIsGenerating(false);
      return;
    }
    
    // Generate script
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newScript: ScriptResult = generateMockScript(prompt, image);
    
    setCurrentScript(newScript);
    setScriptHistory(prev => [newScript, ...prev]);
    setIsGenerating(false);
  };

  const handleImprovementClick = async (tip: ImprovementTip) => {
    if (!currentScript) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const improvedScript: ScriptResult = {
      ...currentScript,
      id: Date.now().toString(),
      changesMade: [
        ...currentScript.changesMade,
        tip.description
      ],
      script: currentScript.script + '\n\n-- ' + tip.description + ' implemented',
      timestamp: new Date().toLocaleString(),
      improvementTips: generateImprovementTips().filter(t => t.id !== tip.id)
    };
    
    setCurrentScript(improvedScript);
    setScriptHistory(prev => [improvedScript, ...prev.slice(1)]);
    setIsGenerating(false);
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };

  const handleHistorySelect = (script: ScriptResult) => {
    setCurrentScript(script);
    setCurrentAnswer(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUpload onImageUpload={handleImageUpload} />
            <ScriptInput 
              onGenerate={handleScriptGeneration}
              isGenerating={isGenerating}
              uploadedImage={uploadedImage}
            />
            
            {currentAnswer && (
              <QuestionAnswer answer={currentAnswer} />
            )}
            
            {currentScript && (
              <ScriptOutput 
                script={currentScript}
                onImprovementClick={handleImprovementClick}
                isGenerating={isGenerating}
              />
            )}
          </div>
          
          {/* History Section */}
          <div className="lg:col-span-1">
            <ScriptHistory 
              scripts={scriptHistory}
              onScriptSelect={handleHistorySelect}
              currentScriptId={currentScript?.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Check if the prompt is asking a question rather than requesting a script
function isQuestion(prompt: string): boolean {
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'which', 'who'];
  const questionMarkers = ['?', 'explain', 'tell me', 'help me understand'];
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for question words at the start
  const startsWithQuestion = questionWords.some(word => 
    lowerPrompt.startsWith(word + ' ')
  );
  
  // Check for question markers
  const hasQuestionMarkers = questionMarkers.some(marker => 
    lowerPrompt.includes(marker)
  );
  
  // Check if it's asking about concepts rather than requesting a script
  const conceptQuestions = [
    'what is', 'how do', 'how to', 'explain', 'difference between'
  ].some(phrase => lowerPrompt.includes(phrase));
  
  return startsWithQuestion || hasQuestionMarkers || conceptQuestions;
}

// Generate answers for questions
function generateAnswer(prompt: string): QuestionResult {
  const lowerPrompt = prompt.toLowerCase();
  
  // Simple question answering based on common Roblox/Luau questions
  if (lowerPrompt.includes('what is luau') || lowerPrompt.includes('what is lua')) {
    return {
      id: Date.now().toString(),
      question: prompt,
      answer: "Luau is Roblox's scripting language, based on Lua 5.1. It's used to create game logic, handle events, manage player interactions, and control game objects in Roblox experiences.",
      timestamp: new Date().toLocaleString()
    };
  }
  
  if (lowerPrompt.includes('where') && (lowerPrompt.includes('script') || lowerPrompt.includes('put'))) {
    return {
      id: Date.now().toString(),
      question: prompt,
      answer: "Scripts go in different locations depending on their purpose:\n• **ServerScriptService** - Server scripts that run on the server\n• **StarterPlayerScripts** - LocalScripts that run for each player\n• **StarterGui** - GUI scripts and interfaces\n• **Workspace** - Scripts attached to parts or models\n• **ReplicatedStorage** - Shared resources and ModuleScripts",
      timestamp: new Date().toLocaleString()
    };
  }
  
  if (lowerPrompt.includes('how') && lowerPrompt.includes('event')) {
    return {
      id: Date.now().toString(),
      question: prompt,
      answer: "Events in Roblox connect functions to actions:\n• **Connect events**: `event:Connect(function() end)`\n• **Player events**: PlayerAdded, PlayerRemoving\n• **Input events**: MouseButton1Click, KeyDown\n• **Game events**: Heartbeat, Stepped\n• **Custom events**: RemoteEvents for client-server communication",
      timestamp: new Date().toLocaleString()
    };
  }
  
  // Default response for other questions
  return {
    id: Date.now().toString(),
    question: prompt,
    answer: "I can help with basic Roblox/Luau questions, but I'm primarily designed to generate scripts. Try asking about specific scripting concepts, where to place scripts, or request a specific script to be created.",
    timestamp: new Date().toLocaleString()
  };
}
// Mock script generation function
function generateMockScript(prompt: string, image?: string): ScriptResult {
  const lowerPrompt = prompt.toLowerCase();
  
  // Simple part spawning script (exactly what user asks for)
  if (lowerPrompt.includes('spawn') && lowerPrompt.includes('part') && lowerPrompt.includes('player join')) {
    return {
      id: Date.now().toString(),
      path: 'ServerScriptService/SpawnPartOnJoin',
      name: 'SpawnPartOnJoin',
      changesMade: [
        'Created player join event handler',
        'Added part spawning functionality in workspace'
      ],
      script: `-- Spawn Part When Player Joins
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    -- Create a new part
    local part = Instance.new("Part")
    part.Name = player.Name .. "'s Part"
    part.Size = Vector3.new(4, 1, 4)
    part.Position = Vector3.new(0, 10, 0)
    part.BrickColor = BrickColor.random()
    part.Parent = workspace
    
    print("Spawned part for " .. player.Name)
end)`,
      timestamp: new Date().toLocaleString(),
      improvementTips: generateImprovementTips(),
      prompt,
      hasImage: !!image
    };
  }
  
  // Simple button script
  if (lowerPrompt.includes('button') && (lowerPrompt.includes('click') || lowerPrompt.includes('gui'))) {
    return {
      id: Date.now().toString(),
      path: 'StarterGui/ScreenGui/ButtonScript',
      name: 'ClickableButton',
      changesMade: [
        'Created clickable button GUI',
        'Added click event handler'
      ],
      script: `-- Simple Clickable Button
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ButtonGui"
screenGui.Parent = playerGui

-- Create Button
local button = Instance.new("TextButton")
button.Name = "ClickButton"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, -25)
button.BackgroundColor3 = Color3.fromRGB(0, 162, 255)
button.TextColor3 = Color3.white
button.Text = "Click Me!"
button.Font = Enum.Font.GothamBold
button.TextSize = 18
button.Parent = screenGui

-- Button click event
button.MouseButton1Click:Connect(function()
    print("Button clicked!")
    button.Text = "Clicked!"
    wait(1)
    button.Text = "Click Me!"
end)`,
      timestamp: new Date().toLocaleString(),
      improvementTips: generateImprovementTips(),
      prompt,
      hasImage: !!image
    };
  }

  const scripts = [
    {
      path: 'ServerScriptService/CoinCollector',
      name: 'CoinCollectionSystem',
      changesMade: [
        'Created coin collection system',
        'Added player touch detection',
        'Implemented coin respawn timer'
      ],
      script: `-- Coin Collection System
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- Create coin in workspace
local coin = Instance.new("Part")
coin.Name = "Coin"
coin.Size = Vector3.new(2, 0.2, 2)
coin.Shape = Enum.PartType.Cylinder
coin.Material = Enum.Material.Neon
coin.BrickColor = BrickColor.new("Bright yellow")
coin.Position = Vector3.new(0, 5, 0)
coin.Anchored = true
coin.Parent = workspace

-- Rotate coin
spawn(function()
    while coin.Parent do
        coin.CFrame = coin.CFrame * CFrame.Angles(0, math.rad(2), 0)
        wait(0.1)
    end
end)

-- Collection function
local function onTouch(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if player then
            print(player.Name .. " collected a coin!")
            coin.Transparency = 1
            coin.CanCollide = false
            
            -- Respawn coin after 5 seconds
            wait(5)
            coin.Transparency = 0
            coin.CanCollide = true
        end
    end
end

coin.Touched:Connect(onTouch)`
    },
    {
      path: 'StarterPlayerScripts/WalkSpeedChanger',
      name: 'WalkSpeedChanger',
      changesMade: [
        'Created walk speed modification script',
        'Added key press detection',
        'Implemented speed toggle functionality'
      ],
      script: `-- Walk Speed Changer (LocalScript)
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local normalSpeed = 16
local fastSpeed = 50
local isFast = false

-- Key press handler
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.LeftShift then
        if isFast then
            humanoid.WalkSpeed = normalSpeed
            isFast = false
            print("Normal speed")
        else
            humanoid.WalkSpeed = fastSpeed
            isFast = true
            print("Fast speed")
        end
    end
end)`
    }
  ];

  const selectedScript = scripts[Math.floor(Math.random() * scripts.length)];
  
  return {
    id: Date.now().toString(),
    ...selectedScript,
    timestamp: new Date().toLocaleString(),
    improvementTips: generateImprovementTips(),
    prompt,
    hasImage: !!image
  };
}

function generateImprovementTips(): ImprovementTip[] {
  const tips = [
    {
      id: '1',
      title: 'Add Error Handling',
      description: 'Implement proper error handling with pcall and error messages'
    },
    {
      id: '2',
      title: 'Optimize Performance',
      description: 'Add debouncing and connection cleanup for better performance'
    },
    {
      id: '3',
      title: 'Add Comments',
      description: 'Include detailed comments explaining complex logic'
    },
    {
      id: '4',
      title: 'Mobile Support',
      description: 'Add touch and mobile device compatibility'
    },
    {
      id: '5',
      title: 'Security Features',
      description: 'Implement server-side validation and anti-exploit measures'
    }
  ];
  
  return tips.sort(() => Math.random() - 0.5).slice(0, 3);
}

export default App;