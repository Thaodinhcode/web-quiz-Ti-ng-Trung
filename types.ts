
export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  questions: Question[];
}

export interface UserResponse {
  questionId: string;
  questionText: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  SUMMARY = 'SUMMARY'
}
