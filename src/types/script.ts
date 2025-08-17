export interface ScriptResult {
  id: string;
  path: string;
  name: string;
  changesMade: string[];
  script: string;
  timestamp: string;
  improvementTips: ImprovementTip[];
  prompt: string;
  hasImage: boolean;
}

export interface QuestionResult {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}
export interface ImprovementTip {
  id: string;
  title: string;
  description: string;
}