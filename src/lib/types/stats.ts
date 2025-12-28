export interface AnkiStats {
  totalCards: number;
  totalNotes: number;
  cardStates: {
    mature: number;
    young: number;
    new: number;
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
  topDecks: Array<{ name: string; cards: number }>;
  todayStudied: number;
  dailyActivity: Record<string, number>;
  lastUpdated?: string;
}

export interface StravaRun {
  date: string;
  distanceKm: number;
  pace: number;
}

export interface StravaStats {
  totalRuns: number;
  totalDistanceKm: number;
  totalTimeHours: number;
  avgPace: number;
  allRuns: StravaRun[];
  lastUpdated?: string;
}

export interface Stats {
  anki?: AnkiStats;
  strava?: StravaStats;
}

export interface CombinedActivity {
  [date: string]: {
    anki: number;
    strava: boolean;
  };
}

export interface PageData {
  stats: Stats;
  combinedActivity: CombinedActivity;
}
