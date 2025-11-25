import React, { useState } from 'react';
import { CloudRain, Sun, CloudMoon, MapPin } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  onCityChange: (city: string) => void;
  currentData: WeatherData;
}

const CITY_OPTIONS = [
  "Recife",
  "Olinda",
  "Camaragibe",
  "São Paulo",
  "Brasil (Geral)"
];

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onCityChange, currentData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-lg">Previsão do Tempo</h3>
        <CloudRain className="text-blue-400" size={20} />
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Escolha a Região</label>
        <div className="relative">
            <select 
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded text-gray-700 font-semibold focus:outline-none focus:border-yellow-500"
                onChange={(e) => onCityChange(e.target.value)}
                value={currentData.city}
            >
                {CITY_OPTIONS.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
            <MapPin className="absolute right-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-2">
            <h4 className="text-4xl font-bold text-gray-800">{currentData.currentTemp}°</h4>
            <span className="text-gray-500 mb-1">{currentData.city}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Chuva: {currentData.probability}% | {currentData.precipitation}mm
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {currentData.forecasts.map((forecast, idx) => (
          <div key={idx} className="flex flex-col items-center text-center bg-gray-50 p-2 rounded">
            <div className="mb-2 text-gray-400">
               {forecast.condition === 'rain' && <CloudRain size={24} className="text-blue-400" />}
               {forecast.condition === 'sun' && <Sun size={24} className="text-yellow-500" />}
               {forecast.condition === 'cloudy' && <CloudMoon size={24} className="text-gray-400" />}
            </div>
            <span className="text-xs text-gray-500 uppercase font-semibold mb-1">{forecast.period}</span>
            <span className="text-sm font-bold">{forecast.temp}°</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end text-gray-600 mb-6 bg-blue-50 p-3 rounded-lg">
          <div className="text-center w-full border-r border-blue-100">
             <span className="text-xl font-bold text-gray-800">{currentData.maxTemp}°</span>
             <span className="text-xs block text-blue-600 uppercase">Máxima</span>
          </div>
          <div className="text-center w-full">
             <span className="text-xl font-bold text-gray-800">{currentData.minTemp}°</span>
             <span className="text-xs block text-blue-600 uppercase">Mínima</span>
          </div>
      </div>
    </div>
  );
};

export default WeatherWidget;