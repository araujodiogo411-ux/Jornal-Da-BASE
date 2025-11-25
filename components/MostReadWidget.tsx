import React from 'react';
import { NewsArticle } from '../types';

interface MostReadProps {
    onReadArticle: (article: NewsArticle) => void;
}

const MostReadWidget: React.FC<MostReadProps> = ({ onReadArticle }) => {
  // Hardcoded specific content requested by user
  const feconArticle: NewsArticle = {
      id: 'fecon-1',
      category: 'Educação',
      title: 'A fecon foi sucesso 2025!',
      summary: ['Projetos sobre Pernambuco', 'Decoração feita pelos alunos'],
      location: 'CEB',
      timestamp: 'Agora',
      imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2000&auto=format&fit=crop', 
      content: `A Feira de Conhecimentos (FECON) do Centro Educacional Base foi um sucesso absoluto em 2025! O tema deste ano foi "Pernambuco meu país".
      
      Cada turma representou uma cidade ou região de Pernambuco com riqueza de detalhes:
      - 6º Ano: Goiana
      - 7º Ano: Pesqueira
      - 8º Ano: Fernando de Noronha
      
      Os alunos do Fundamental I apresentarão seus projetos no dia 28. O evento contou com uma decoração trabalhada e feita pelos próprios alunos, além de apresentações muito educadas e educativas, reforçando o compromisso da escola com a cultura local.`
  };

  const articles: NewsArticle[] = [
    feconArticle,
    { 
      id: 'mr-2', 
      title: "Turmas do Fundamental I se preparam para dia 28", 
      category: "Agenda",
      summary: ['Expectativa alta', 'Projetos criativos'],
      location: 'CEB',
      timestamp: 'Em breve',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000',
      content: 'As turmas do Fundamental I estão finalizando os preparativos para a sua apresentação na FECON. A expectativa é de que os trabalhos sejam tão impressionantes quanto os do Fundamental II. Os temas abordarão aspectos lúdicos da cultura pernambucana.'
    },
    { 
      id: 'mr-3', 
      title: "Canetão recebe estrutura para Interclasse nesta quarta", 
      category: "Esportes",
      summary: ['Estrutura montada', 'Jogos começam cedo'],
      location: 'Canetão',
      timestamp: 'Hoje',
      imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2000',
      content: 'O campo do Canetão já está sendo preparado para receber os atletas do Centro Educacional Base. As redes foram trocadas e a marcação do campo reforçada para o início do Interclasse. A torcida organizada já está ensaiando os gritos de guerra!'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Mais Lidas</h3>
      </div>
      
      <ol className="space-y-6">
        {articles.map((item, index) => (
          <li 
            key={item.id} 
            className="flex gap-4 group cursor-pointer"
            onClick={() => onReadArticle(item)}
          >
            <span className="text-4xl font-light text-gray-300 group-hover:text-yellow-500 transition-colors duration-300">
              {index + 1}
            </span>
            <div>
                 <span className="text-xs text-gray-400 uppercase">{item.category}</span>
                 <p className="text-blue-900 font-semibold group-hover:underline text-sm leading-relaxed group-hover:text-blue-700">
                  {item.title}
                </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MostReadWidget;