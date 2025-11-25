import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import WeatherWidget from './components/WeatherWidget';
import MostReadWidget from './components/MostReadWidget';
import MetricsWidget from './components/MetricsWidget';
import { NewsArticle, WeatherData, TrendingMetric } from './types';
import { X, ChevronRight, User, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for specific cities
const WEATHER_DATA_DB: Record<string, WeatherData> = {
  "Recife": {
    city: 'Recife', currentTemp: 29, maxTemp: 31, minTemp: 25, probability: 80, precipitation: 2,
    forecasts: [{ period: 'Manhã', temp: 28, condition: 'sun' }, { period: 'Tarde', temp: 31, condition: 'rain' }, { period: 'Noite', temp: 26, condition: 'cloudy' }]
  },
  "Olinda": {
    city: 'Olinda', currentTemp: 28, maxTemp: 30, minTemp: 24, probability: 95, precipitation: 1,
    forecasts: [{ period: 'Manhã', temp: 26, condition: 'rain' }, { period: 'Tarde', temp: 30, condition: 'sun' }, { period: 'Noite', temp: 25, condition: 'cloudy' }]
  },
  "Camaragibe": {
    city: 'Camaragibe', currentTemp: 27, maxTemp: 29, minTemp: 22, probability: 60, precipitation: 5,
    forecasts: [{ period: 'Manhã', temp: 25, condition: 'cloudy' }, { period: 'Tarde', temp: 29, condition: 'rain' }, { period: 'Noite', temp: 23, condition: 'cloudy' }]
  },
  "São Paulo": {
    city: 'São Paulo', currentTemp: 22, maxTemp: 25, minTemp: 18, probability: 40, precipitation: 0,
    forecasts: [{ period: 'Manhã', temp: 19, condition: 'cloudy' }, { period: 'Tarde', temp: 24, condition: 'sun' }, { period: 'Noite', temp: 20, condition: 'cloudy' }]
  },
  "Brasil (Geral)": {
    city: 'Brasil', currentTemp: 26, maxTemp: 32, minTemp: 20, probability: 50, precipitation: 10,
    forecasts: [{ period: 'Manhã', temp: 24, condition: 'sun' }, { period: 'Tarde', temp: 30, condition: 'rain' }, { period: 'Noite', temp: 22, condition: 'cloudy' }]
  }
};

const SPECIFIC_NEWS: NewsArticle[] = [
  {
    id: '1',
    category: 'Esporte Escolar',
    title: 'Interclasse do CEB: Competição começa nesta quarta (26) no Canetão',
    summary: [
      'Fundamental II representa países: 6º (EUA), 8º (Alemanha), 7º e 9º (Brasil)',
      'Abertura foi adiada para garantir apresentações de dança completas',
      'Evento acontece no campo do Canetão com torcida organizada'
    ],
    content: `O aguardado Interclasse do Centro Educacional Base (CEB) tem nova data confirmada e promete agitar a comunidade escolar. O evento será realizado nesta quarta-feira, dia 26 de novembro, no tradicional campo do Canetão.

As turmas do Fundamental II entrarão em campo defendendo as cores de grandes nações:
- 6º Ano: Estados Unidos (EUA)
- 8º Ano: Alemanha
- 7º e 9º Anos: Brasil (equipe unificada)

Observação importante sobre a data: A abertura estava prevista para acontecer anteriormente, porém, a organização optou pelo adiamento. O motivo foi garantir que todas as turmas estivessem prontas, já que, na data original, apenas o 6º ano estava com a coreografia de abertura finalizada. Agora, com tudo pronto, a festa promete ser completa!`,
    location: 'Canetão',
    timestamp: 'Destaque',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop', // Soccer/School sports placeholder
    isBreaking: true
  },
  {
    id: '2',
    category: 'Cultura',
    title: 'FECON 2025 encanta com tema "Pernambuco meu país"',
    summary: [
      'Alunos apresentaram projetos culturais e maquetes',
      'Decoração temática foi inteiramente produzida pelos estudantes'
    ],
    content: `A Feira de Conhecimentos (FECON) do Centro Educacional Base foi um sucesso absoluto em 2025! O tema deste ano foi "Pernambuco meu país".
      
    Cada turma representou uma cidade ou região de Pernambuco com riqueza de detalhes:
    - 6º Ano: Goiana
    - 7º Ano: Pesqueira
    - 8º Ano: Fernando de Noronha
    
    Os alunos do Fundamental I apresentarão seus projetos no dia 28. O evento contou com uma decoração trabalhada e feita pelos próprios alunos, além de apresentações muito educadas e educativas, reforçando o compromisso da escola com a cultura local.`,
    location: 'Pátio CEB',
    timestamp: 'Há 1 dia',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop', // Education placeholder
    isBreaking: false
  },
  {
    id: '3',
    category: 'Comunicado',
    title: 'Fundamental I prepara surpresas para FECON no dia 28',
    summary: [
      'Pequenos pesquisadores finalizam seus estandes',
      'Expectativa de grande público de pais e responsáveis'
    ],
    content: 'A edição da FECON para o Fundamental I acontece no próximo dia 28. Os projetos prometem tanta qualidade quanto os apresentados pelos mais velhos. Será um momento de muito aprendizado e troca de experiências.',
    location: 'Secretaria',
    timestamp: 'Há 4 horas',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop', // Kids school placeholder
    isBreaking: false
  }
];

const SCHOOL_METRICS: TrendingMetric[] = [
  { topic: 'Interclasse', views: 540, growth: 85 },
  { topic: 'FECON', views: 420, growth: 45 },
  { topic: '6º Ano EUA', views: 310, growth: 12 },
  { topic: '8º Ano Alemanha', views: 290, growth: 10 },
  { topic: 'Fundamental I', views: 250, growth: 5 },
];

const App: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>(SPECIFIC_NEWS);
  const [metrics, setMetrics] = useState<TrendingMetric[]>(SCHOOL_METRICS);
  const [weatherCity, setWeatherCity] = useState("Olinda");
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Início");
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showCreator, setShowCreator] = useState(false);

  // Derived filtered news
  const getFilteredNews = () => {
    let filtered = news;

    // Search Query takes precedence if user types something
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return news.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            (article.content && article.content.toLowerCase().includes(query))
        );
    }

    // Category Filtering (Menu)
    if (activeCategory === "Início") {
        return filtered;
    } else if (activeCategory === "Esportes") {
        return filtered.filter(n => n.category.includes("Esporte"));
    } else if (activeCategory === "Pedagógico" || activeCategory === "Eventos") {
        return filtered.filter(n => n.category === "Cultura" || n.category === "Educação");
    } else if (activeCategory === "Secretaria") {
        return filtered.filter(n => n.category === "Comunicado");
    } else if (activeCategory === "FECON") {
        return filtered.filter(n => n.title.toUpperCase().includes("FECON") || (n.content && n.content.includes("FECON")));
    } else if (activeCategory === "Interclasse") {
        return filtered.filter(n => n.title.includes("Interclasse"));
    }

    return filtered;
  };

  const filteredNews = getFilteredNews();

  const handleMenuClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(""); // Clear search when picking a category
    setIsMenuOpen(false);
  };

  const handleShowPartners = () => {
    setSelectedArticle({
      id: 'ftd-sae',
      category: 'Parceiros',
      title: 'Excelência Educacional: FTD e SAE Digital',
      summary: ['Sistemas de ensino de ponta', 'Tecnologia educacional'],
      location: 'Brasil',
      timestamp: 'Parceria',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
      content: `O Centro Educacional Base se orgulha de suas parcerias estratégicas para oferecer o melhor ensino.
      
      **FTD Educação**: Com mais de 100 anos de história, a FTD oferece materiais didáticos que unem tradição e inovação, apoiando o desenvolvimento integral dos alunos.
      
      **SAE Digital**: Um sistema de ensino hiperatualizado, que utiliza tecnologia e materiais dinâmicos para engajar os estudantes e preparar para os desafios do futuro.
      
      Juntos, escola e parceiros constroem um caminho sólido para o conhecimento.`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      <Header 
        onSearch={setSearchQuery} 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen}
      />

      {/* Creator Modal */}
      <AnimatePresence>
        {showCreator && (
           <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreator(false)} />
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10 text-center"
             >
                <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-6 border-4 border-yellow-400 overflow-hidden shadow-lg">
                    <img 
                      src="https://i.ibb.co/Pz6VH7D6/davi-felipe.png" 
                      onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('flaticon')) {
                             target.src = "https://cdn-icons-png.flaticon.com/512/3069/3069172.png"; // Fallback
                             target.classList.add('p-4');
                          }
                      }}
                      alt="Davi Felipe" 
                      className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Davi Felipe</h2>
                <p className="text-blue-600 font-semibold mb-4">Desenvolvedor & Aluno do 6º Ano</p>
                <p className="text-gray-600 mb-6">
                  Este site foi criado com dedicação por um aluno do Centro Educacional Base que ama tecnologia e inovação.
                </p>
                <button 
                  onClick={() => setShowCreator(false)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Fechar
                </button>
             </motion.div>
           </div>
        )}
      </AnimatePresence>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-white z-[60] shadow-2xl overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-yellow-400">
               <span className="font-bold text-gray-900 flex items-center gap-2">
                 <BookOpen size={20} /> MENU CEB
               </span>
               <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="p-4 space-y-4">
               {['Início', 'Esportes', 'Pedagógico', 'Secretaria', 'Eventos', 'FECON', 'Interclasse'].map(item => (
                 <button 
                    key={item} 
                    onClick={() => handleMenuClick(item)}
                    className={`block w-full text-left font-semibold transition-all ${activeCategory === item ? 'text-blue-600 pl-2 border-l-4 border-blue-600' : 'text-gray-700 hover:text-yellow-600 hover:pl-2'}`}
                 >
                   {item}
                 </button>
               ))}
               <hr className="border-gray-200" />
               <button 
                 onClick={() => { setShowCreator(true); setIsMenuOpen(false); }}
                 className="block w-full text-left text-blue-600 font-bold hover:text-blue-800 hover:pl-2 transition-all"
               >
                 Quem criou o site?
               </button>
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-gray-50 text-xs text-gray-400">
              © 2025 Centro Educacional Base
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background overlay for menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[55]" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
               onClick={() => setSelectedArticle(null)}
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
             >
                <div className="relative h-64 bg-gray-200 shrink-0">
                  {selectedArticle.imageUrl && (
                    <img src={selectedArticle.imageUrl} className="w-full h-full object-cover" alt={selectedArticle.title} />
                  )}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white backdrop-blur-md transition-all"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider bg-blue-900/80 px-3 py-1 rounded mb-3 inline-block">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight shadow-sm">{selectedArticle.title}</h2>
                  </div>
                </div>
                
                <div className="p-8 overflow-y-auto bg-white">
                   <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                     {selectedArticle.content || selectedArticle.summary.join('. ')}
                   </div>
                   <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                      <span>Publicado em {selectedArticle.location}</span>
                      <span>{selectedArticle.timestamp}</span>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="w-full h-28 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl flex items-center justify-center mb-8 text-white shadow-lg relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="text-center z-10 p-4">
              <h2 className="font-extrabold text-2xl tracking-widest text-yellow-400 drop-shadow-md">MATRÍCULAS ABERTAS 2025</h2>
              <p className="text-sm font-medium text-blue-100 mt-1">Garanta o futuro do seu filho no Centro Educacional Base</p>
           </div>
        </div>
        
        {/* Active Filter Display */}
        {activeCategory !== 'Início' && searchQuery === '' && (
            <div className="mb-4 flex items-center gap-2">
                <span className="text-gray-500 text-sm">Visualizando categoria:</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    {activeCategory}
                    <button onClick={() => setActiveCategory('Início')} className="hover:text-red-600"><X size={14}/></button>
                </span>
            </div>
        )}

        {searchQuery !== '' && (
            <div className="mb-4 flex items-center gap-2">
                <span className="text-gray-500 text-sm">Resultados para:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-600"><X size={14}/></button>
                </span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (Left) */}
          <div className="lg:col-span-8 space-y-8">
            {filteredNews.length === 0 ? (
               <div className="text-center py-20 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                 <p className="text-lg font-semibold text-gray-700">Notícia não encontrada</p>
                 <p className="text-sm mt-2">Tente buscar por "FECON", "Interclasse" ou "Matrículas".</p>
                 <button onClick={() => {setSearchQuery(""); setActiveCategory('Início')}} className="mt-4 text-blue-600 hover:underline">Limpar filtros</button>
               </div>
            ) : (
              <>
                {filteredNews.map((article, index) => (
                  <NewsCard 
                    key={article.id} 
                    article={article} 
                    featured={index === 0 && searchQuery === ''} // Only highlight first if not searching
                    onClick={setSelectedArticle}
                  />
                ))}
              </>
            )}
            
            {/* Parceiros Button (Load More replacement) */}
            <button 
                onClick={handleShowPartners}
                className="w-full py-5 bg-white border border-blue-100 text-blue-700 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-all rounded-xl flex items-center justify-center gap-2 group shadow-sm"
            >
                VER PARCEIROS E EDITORAS
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-yellow-500" />
            </button>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <WeatherWidget 
                currentData={WEATHER_DATA_DB[weatherCity]} 
                onCityChange={setWeatherCity}
              />
              <MetricsWidget data={metrics} />
              <MostReadWidget onReadArticle={setSelectedArticle} />
              
              {/* Removed Cantina Ad as requested */}
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-blue-900 text-white py-12 mt-16 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center justify-center p-3 bg-white rounded-full">
              <img 
                 src="https://i.ibb.co/SwZXppdP/logo-ceb.png" 
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/3069/3069172.png";
                 }}
                 alt="Logo CEB" 
                 className="w-8 h-8 object-contain" 
               />
          </div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Jornal da BASE</h2>
          <p className="text-blue-200 text-sm max-w-md mx-auto mb-6">
            Informação, cultura e educação. Acompanhe tudo o que acontece no Centro Educacional Base.
          </p>
          
          <div className="flex justify-center gap-4 text-xs text-blue-300 font-mono opacity-60">
             <span>DAVI FELIPE</span>
             <span>•</span>
             <span>6º ANO</span>
          </div>

          <div className="mt-8 text-xs text-blue-400">
            © 2025 Centro Educacional Base - Inovando a Educação
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;