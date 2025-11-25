import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingMetric } from '../types';

const MetricsWidget: React.FC<{ data: TrendingMetric[] }> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-lg">Em Alta no CEB</h3>
        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold animate-pulse">AGORA</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="topic" 
              type="category" 
              width={100} 
              tick={{fontSize: 11, fontWeight: 600}} 
              interval={0}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="views" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#EAB308' : '#E5E7EB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-xs text-gray-400 mt-2 text-center">Interesse dos alunos (em tempo real)</p>
    </div>
  );
};

export default MetricsWidget;