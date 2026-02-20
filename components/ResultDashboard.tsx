
import React from 'react';
import { UserResponse, Topic } from '../types';

interface ResultDashboardProps {
  topic: Topic;
  responses: UserResponse[];
  onRestart: () => void;
  onHome: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ topic, responses, onRestart, onHome }) => {
  const correctCount = responses.filter(r => r.isCorrect).length;
  const incorrectCount = responses.length - correctCount;
  const accuracy = Math.round((correctCount / responses.length) * 100);

  // Thuật toán: Câu trả lời sai lên vị trí đầu tiên
  const sortedHistory = [...responses].sort((a, b) => {
    if (a.isCorrect === b.isCorrect) return 0;
    return a.isCorrect ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-wg-dark-purple to-[#1a0b16] geometric-pattern text-white font-sans p-6 pb-24">
      <div className="max-w-3xl mx-auto py-12">
        
        <h2 className="text-4xl font-black text-center mb-12 tracking-tighter">Your Result</h2>

        {/* Dash Header */}
        <div className="bg-wg-card-dark p-12 rounded-[40px] text-center border border-white/5 relative overflow-hidden shadow-3xl mb-12">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">Score</div>
          
          <div className="h-48 w-28 bg-white/5 mx-auto relative rounded-2xl overflow-hidden mb-8 border border-white/10">
            <div 
              className="absolute bottom-0 w-full bg-wg-green animate-liquid shadow-[0_0_30px_rgba(0,245,160,0.5)]"
              style={{ height: `${accuracy}%` }}
            />
          </div>

          <div className="text-6xl font-black mb-10 tracking-tighter">{correctCount} / {responses.length}</div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onRestart}
              className="bg-wg-pink text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-wg-pink/30"
            >
              Play Again
            </button>
            <button 
              onClick={onHome}
              className="bg-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10"
            >
              Lobby
            </button>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="space-y-8">
          <h3 className="text-center text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-10">Detailed Review</h3>
          
          <div className="grid gap-5">
            {sortedHistory.map((item, i) => (
              <div 
                key={i} 
                className={`group flex flex-col p-6 rounded-[24px] shadow-xl transition-all hover:-translate-y-1 ${
                  item.isCorrect 
                    ? 'bg-white text-slate-900 border-l-[12px] border-wg-green' 
                    : 'bg-white text-slate-900 border-l-[12px] border-wg-pink ring-4 ring-wg-pink/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xl font-black leading-tight flex-grow">{item.questionText}</div>
                  <div className={`shrink-0 ml-4 text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.isCorrect ? 'bg-wg-green/10 text-wg-green' : 'bg-wg-pink/10 text-wg-pink'}`}>
                    {item.isCorrect ? 'Correct' : 'Needs Review'}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
                  <div className="text-sm">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Your response</span>
                    <b className={`text-lg font-black ${item.isCorrect ? 'text-wg-green' : 'text-wg-pink line-through'}`}>
                        {item.userAnswer || '(empty)'}
                    </b>
                  </div>
                  {!item.isCorrect && (
                    <div className="text-sm">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Correct Answer</span>
                      <b className="text-lg font-black text-indigo-600">{item.correctAnswer}</b>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
