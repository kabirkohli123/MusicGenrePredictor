// Simple music genre prediction model using basic features
export type MusicFeatures = {
  tempo: number;        // beats per minute (60-180)
  energy: number;       // scale of 0-1
  danceability: number; // scale of 0-1
  acousticness: number; // scale of 0-1
};

const genreRanges = {
  'Classical': {
    tempo: [60, 120],
    energy: [0, 0.4],
    danceability: [0, 0.3],
    acousticness: [0.7, 1]
  },
  'Jazz': {
    tempo: [80, 140],
    energy: [0.3, 0.6],
    danceability: [0.3, 0.6],
    acousticness: [0.4, 0.8]
  },
  'Rock': {
    tempo: [100, 160],
    energy: [0.6, 1],
    danceability: [0.4, 0.7],
    acousticness: [0, 0.4]
  },
  'Electronic': {
    tempo: [120, 180],
    energy: [0.7, 1],
    danceability: [0.7, 1],
    acousticness: [0, 0.3]
  }
};

export function predictGenre(features: MusicFeatures): string {
  let bestMatch = '';
  let highestScore = -1;

  for (const [genre, ranges] of Object.entries(genreRanges)) {
    let score = 0;
    
    // Calculate how well the features match each genre's ranges
    if (features.tempo >= ranges.tempo[0] && features.tempo <= ranges.tempo[1]) score++;
    if (features.energy >= ranges.energy[0] && features.energy <= ranges.energy[1]) score++;
    if (features.danceability >= ranges.danceability[0] && features.danceability <= ranges.danceability[1]) score++;
    if (features.acousticness >= ranges.acousticness[0] && features.acousticness <= ranges.acousticness[1]) score++;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = genre;
    }
  }

  return bestMatch;
}