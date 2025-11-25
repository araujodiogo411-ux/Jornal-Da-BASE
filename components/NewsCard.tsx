import React from 'react';
import { NewsArticle } from '../types';
import { motion } from 'framer-motion';
import { Share2, MessageCircle } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  onClick: (article: NewsArticle) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, featured = false, onClick }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${featured ? 'col-span-1 lg:col-span-2' : ''}`}
      onClick={() => onClick(article)}
    >
      <div className={`flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
        {/* Image Section */}
        <div className={`relative ${featured ? 'lg:w-2/3' : 'w-full'} overflow-hidden group bg-gray-100`}>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-64 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {article.isBreaking && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 uppercase tracking-wider animate-pulse border border-yellow-600">
              Ao Vivo
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className={`p-6 flex flex-col justify-between ${featured ? 'lg:w-1/3' : 'w-full'}`}>
          <div>
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wide mb-2 block">
              {article.category}
            </span>
            
            <h2 className={`font-bold text-blue-900 leading-tight hover:text-blue-700 mb-3 ${featured ? 'text-3xl' : 'text-xl'}`}>
              {article.title}
            </h2>

            <ul className="space-y-2 mb-4">
              {article.summary.slice(0, featured ? 3 : 2).map((point, idx) => (
                <li key={idx} className="text-gray-600 text-sm leading-relaxed flex items-start">
                  <span className="mr-2 text-yellow-500 font-bold">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              <span>{article.timestamp}</span>
              <span className="mx-2">—</span>
              <span className="uppercase">{article.location}</span>
            </div>
            <div className="flex gap-3">
              <button className="hover:text-yellow-500 transition-colors"><Share2 size={16} /></button>
              <button className="hover:text-yellow-500 transition-colors"><MessageCircle size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;