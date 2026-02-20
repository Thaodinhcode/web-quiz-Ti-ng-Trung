
import React, { useState, useMemo } from 'react';
import { AppState, Topic, UserResponse } from './types';
import { studyTopics } from './services/contentService';
import { TopicCard } from './components/TopicCard';
import { QuizSession } from './components/QuizSession';
import { ResultDashboard } from './components/ResultDashboard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizResults, setQuizResults] = useState<UserResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(studyTopics.length / ITEMS_PER_PAGE);

  const currentTopics = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return studyTopics.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setAppState(AppState.QUIZ);
  };

  const handleQuizComplete = (responses: UserResponse[]) => {
    setQuizResults(responses);
    setAppState(AppState.SUMMARY);
  };

  const handleRestart = () => {
    setAppState(AppState.QUIZ);
  };

  const handleGoHome = () => {
    setAppState(AppState.HOME);
    setSelectedTopic(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (appState === AppState.QUIZ && selectedTopic) {
    return (
      <QuizSession 
        topic={selectedTopic} 
        onComplete={handleQuizComplete} 
        onCancel={handleGoHome}
      />
    );
  }

  if (appState === AppState.SUMMARY && selectedTopic) {
    return (
      <ResultDashboard 
        topic={selectedTopic}
        responses={quizResults}
        onRestart={handleRestart}
        onHome={handleGoHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-wg-dark-purple geometric-pattern px-6 py-12 sm:px-12 lg:px-20">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div>
            <h1 className="text-7xl font-black text-white mb-4 tracking-tighter">Chọn chủ đề</h1>
            <p className="text-wg-pink font-bold uppercase tracking-[0.4em] text-xs">Wayground Learning Experience</p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[28px] flex items-center gap-5">
              <div className="w-12 h-12 bg-wg-green/20 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-wg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-2xl leading-none">{studyTopics.length}</div>
                <div className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Total Topics</div>
              </div>
            </div>
          </div>
        </header>

        {/* 4-Column Grid for Large Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentTopics.map(topic => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              onSelect={handleTopicSelect} 
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-14 h-14 flex items-center justify-center bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-wg-pink disabled:opacity-10 transition-all shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-14 h-14 rounded-2xl font-black transition-all ${
                    currentPage === i + 1 
                      ? 'bg-wg-pink text-white shadow-wg-pink/50 scale-110 shadow-2xl' 
                      : 'bg-white/5 text-white/30 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(p => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-14 h-14 flex items-center justify-center bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-wg-pink disabled:opacity-10 transition-all shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        <footer className="mt-40 text-center border-t border-white/5 pt-12">
            <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.6em]">Wayground Pro • Learn More • Remember Forever</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
