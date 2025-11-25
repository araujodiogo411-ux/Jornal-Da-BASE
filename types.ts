export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  summary: string[]; // Bullet points
  content?: string; // Full text for the modal
  location: string;
  timestamp: string;
  imageUrl: string;
  isBreaking?: boolean;
}

export interface WeatherForecast {
  period: 'Manhã' | 'Tarde' | 'Noite';
  temp: number;
  condition: 'rain' | 'sun' | 'cloudy';
}

export interface WeatherData {
  city: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  probability: number;
  precipitation: number;
  forecasts: WeatherForecast[];
}

export interface TrendingMetric {
  topic: string;
  views: number;
  growth: number; // percentage
}