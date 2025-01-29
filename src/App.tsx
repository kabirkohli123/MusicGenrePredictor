import React, { useState } from 'react';
import { Sliders as Slider } from 'lucide-react';
import { MusicFeatures, predictGenre } from './lib/musicModel';

function App() {
  const [features, setFeatures] = useState<MusicFeatures>({
    tempo: 120,
    energy: 0.5,
    danceability: 0.5,
    acousticness: 0.5
  });

  const [prediction, setPrediction] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePredict = () => {
    setIsAnimating(true);
    // Simulate ML processing time
    setTimeout(() => {
      const genre = predictGenre(features);
      setPrediction(genre);
      setIsAnimating(false);
    }, 1000);
  };

  const handleSliderChange = (name: keyof MusicFeatures, value: number) => {
    setFeatures(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getBackgroundImage = () => {
    switch (prediction) {
      case 'Classical':
        return 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=2000&q=80';
      case 'Jazz':
        return 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=2000&q=80';
      case 'Rock':
        return 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=2000&q=80';
      case 'Electronic':
        return 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=2000&q=80';
      default:
        return 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=2000&q=80';
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${getBackgroundImage()})`
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Music Genre Predictor
          </h1>
          
          <div className="space-y-6">
            {Object.entries(features).map(([name, value]) => (
              <div key={name} className="space-y-2">
                <label className="block text-lg font-medium text-white capitalize">
                  {name}
                </label>
                <input
                  type="range"
                  min={name === 'tempo' ? 60 : 0}
                  max={name === 'tempo' ? 180 : 1}
                  step={name === 'tempo' ? 1 : 0.1}
                  value={value}
                  onChange={(e) => handleSliderChange(name as keyof MusicFeatures, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white">
                  {value.toFixed(name === 'tempo' ? 0 : 2)}
                </span>
              </div>
            ))}

            <button
              onClick={handlePredict}
              disabled={isAnimating}
              className={`w-full py-3 px-6 text-white rounded-lg text-lg font-semibold transition-all
                ${isAnimating 
                  ? 'bg-purple-500 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
            >
              {isAnimating ? 'Analyzing...' : 'Predict Genre'}
            </button>

            {prediction && (
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Predicted Genre:</h2>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {prediction}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;