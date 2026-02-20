
import React, { useState, useEffect, useRef } from 'react';
import { Topic, Question, UserResponse } from '../types';
import { shuffleArray } from '../services/contentService';

interface QuizSessionProps {
  topic: Topic;
  onComplete: (responses: UserResponse[]) => void;
  onCancel: () => void;
}

export const QuizSession: React.FC<QuizSessionProps> = ({ topic, onComplete, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Xáo trộn 20 câu hỏi NGAY KHI BẮT ĐẦU phiên học
    setQuestions(shuffleArray(topic.questions));
  }, [topic]);

  useEffect(() => {
    if (inputRef.current && !feedback) {
      inputRef.current.focus();
    }
  }, [currentIndex, feedback]);

  const handleAction = () => {
    if (isSubmitting || !userInput.trim()) return;

    const currentQuestion = questions[currentIndex];
    const val = userInput.trim().toLowerCase();
    const isCorrect = val === currentQuestion.answer.toLowerCase();
    
    setIsSubmitting(true);
    
    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      correctAnswer: currentQuestion.answer,
      userAnswer: val,
      isCorrect
    };

    setResponses(prev => [...prev, newResponse]);

    // Phản hồi tức thì
    if (isCorrect) {
      setFeedback({ isCorrect: true, message: 'Correct!' });
      setTimeout(() => advance([...responses, newResponse]), 800);
    } else {
      setFeedback({ isCorrect: false, message: `Incorrect! Answer: ${currentQuestion.answer.toUpperCase()}` });
      setTimeout(() => advance([...responses, newResponse]), 3000);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAction();
  };

  const advance = (updatedResponses: UserResponse[]) => {
    setFeedback(null);
    setUserInput('');
    setIsSubmitting(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(updatedResponses);
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#12040e] to-[#2d0a1f] geometric-pattern flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      
      {/* Question Indicator (Pill shape) */}
      <div className="absolute top-10 flex items-center justify-center w-full">
        <div className="bg-black/60 px-5 py-2 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
            <span className="text-wg-yellow text-xs font-black tracking-[0.3em]">
                {currentIndex + 1} / {questions.length}
            </span>
        </div>
      </div>

      {/* Main Focus Area */}
      <div className="w-full max-w-3xl flex flex-col items-center space-y-32">
        
        {/* Question Box */}
        <div className="w-full bg-[#2d0a1f]/80 p-12 md:p-20 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 text-center backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                {questions[currentIndex].question}
            </h2>
        </div>

        {/* Answer Input Area (Nửa dưới màn hình) */}
        <div className="w-full max-w-xl space-y-10 text-center">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    disabled={isSubmitting}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyUp={handleKeyUp}
                    placeholder="Type your answer..."
                    className="ans-input w-full text-center text-3xl font-black py-6 px-10 rounded-3xl text-white placeholder-white/5 shadow-2xl transition-all"
                    autoComplete="off"
                />
                
                {/* Visual Feedback Message */}
                <div className={`absolute -bottom-12 left-0 w-full text-center font-black text-xl transition-all duration-500 ${feedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    {feedback && (
                        <span className={feedback.isCorrect ? 'text-wg-green shadow-wg-green/20' : 'text-wg-pink shadow-wg-pink/20'}>
                            {feedback.message}
                        </span>
                    )}
                </div>
            </div>

            {/* Next Button (Tối giản) */}
            {!feedback && (
                <div className="flex justify-center pt-8 animate-pulse">
                    <button 
                        onClick={handleAction}
                        disabled={!userInput.trim()}
                        className="text-white/40 text-xs font-black uppercase tracking-[0.5em] hover:text-wg-pink transition-all"
                    >
                        {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Press Enter to Next'}
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Cancel Action */}
      <button 
        onClick={onCancel}
        className="absolute bottom-10 left-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/10 hover:text-wg-pink transition-colors"
      >
        Exit Session
      </button>
    </div>
  );
};
