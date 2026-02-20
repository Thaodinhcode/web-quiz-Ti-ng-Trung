
import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-[24px] overflow-hidden shadow-2xl hover:shadow-wg-pink/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col h-full"
      onClick={() => onSelect(topic)}
    >
      {/* Topic Image Banner */}
      <div className="w-full h-44 overflow-hidden relative shrink-0">
        <img 
          src={topic.imageUrl} 
          alt={topic.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-black text-wg-dark-purple leading-tight group-hover:text-wg-pink transition-colors line-clamp-2 mb-3">
          {topic.title}
        </h3>
        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              {topic.questions.length} Questions
            </span>
            <span className="text-slate-300 text-[9px] font-bold uppercase tracking-widest">
              Practice Now
            </span>
          </div>
          <div className="w-10 h-10 bg-wg-lavender rounded-2xl flex items-center justify-center group-hover:bg-wg-pink group-hover:text-white transition-all transform group-hover:rotate-12">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
