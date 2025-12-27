export interface StravaStats {
  totalRuns: number;
  totalDistanceKm: string;
  totalTimeHours: string;
  avgDistanceKm: string;
  avgPace: string;
  recentRuns: Array<{
    name: string;
    distanceKm: string;
    date: string;
    pace: string;
  }>;
}

export interface AnkiStats {
  lastUpdated: string;
  totalCards: number;
  totalNotes: number;
  deckCount: number;
  cardStates: {
    new: number;
    learning: number;
    young: number;
    mature: number;
    suspended: number;
    buried: number;
  };
  today: {
    studied: number;
    timeMinutes: number;
  };
  retention: {
    overall: number;
    young: number;
    mature: number;
  };
  forecast: {
    next30Days: number;
    avgPerDay: number;
  };
  topDecks: Array<{
    name: string;
    cards: number;
  }>;
}

export interface AllStats {
  strava?: StravaStats;
  anki?: AnkiStats;
  lastUpdated: string;
}
