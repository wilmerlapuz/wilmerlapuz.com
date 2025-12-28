import { supabase } from '$lib/supabase';
import type { Stats, CombinedActivity, AnkiStats, StravaStats, StravaRun } from '$lib/types/stats';

interface AnkiRow {
  total_cards: number;
  total_notes: number;
  mature_cards: number;
  young_cards: number;
  new_cards: number;
  retention_overall: string;
  retention_young: string;
  retention_mature: string;
  forecast_next_30_days: number;
  forecast_avg_per_day: number;
  top_decks: Array<{ name: string; cards: number }> | null;
  today_studied: number;
  last_updated: string;
}

interface AnkiActivityRow {
  activity_date: string;
  review_count: number;
}

interface StravaStatsRow {
  total_runs: number;
  total_distance_km: number;
  total_time_hours: number;
  avg_pace: number;
  last_updated: string;
}

interface StravaRunRow {
  run_date: string;
  distance_km: number;
  pace: number;
}

export async function load() {
  const [ankiRes, ankiActivityRes, stravaStatsRes, stravaRunsRes] = await Promise.all([
    supabase.from('anki_stats').select('*').order('last_updated', { ascending: false }).limit(1).single(),
    supabase.from('anki_daily_activity').select('activity_date, review_count').order('activity_date', { ascending: false }),
    supabase.from('strava_stats').select('*').order('last_updated', { ascending: false }).limit(1).single(),
    supabase.from('strava_runs').select('*').order('run_date', { ascending: false })
  ]);

  // Log errors for debugging (non-blocking)
  if (ankiRes.error) console.error('Anki stats error:', ankiRes.error.message);
  if (ankiActivityRes.error) console.error('Anki activity error:', ankiActivityRes.error.message);
  if (stravaStatsRes.error) console.error('Strava stats error:', stravaStatsRes.error.message);
  if (stravaRunsRes.error) console.error('Strava runs error:', stravaRunsRes.error.message);

  const stats: Stats = {};
  const combinedActivity: CombinedActivity = {};

  // Process Anki activity data once and reuse
  const ankiActivityData = (ankiActivityRes.data ?? []) as AnkiActivityRow[];
  const dailyActivity = ankiActivityData.reduce<Record<string, number>>((acc, record) => {
    acc[record.activity_date] = record.review_count;
    return acc;
  }, {});

  // Build combined activity from Anki data
  for (const record of ankiActivityData) {
    combinedActivity[record.activity_date] = { 
      anki: record.review_count, 
      strava: false 
    };
  }

  if (ankiRes.data) {
    const d = ankiRes.data as AnkiRow;
    
    stats.anki = {
      totalCards: d.total_cards,
      totalNotes: d.total_notes,
      cardStates: { mature: d.mature_cards, young: d.young_cards, new: d.new_cards },
      retention: { 
        overall: parseFloat(d.retention_overall), 
        young: parseFloat(d.retention_young), 
        mature: parseFloat(d.retention_mature) 
      },
      forecast: { next30Days: d.forecast_next_30_days, avgPerDay: d.forecast_avg_per_day },
      topDecks: d.top_decks ?? [],
      todayStudied: d.today_studied,
      dailyActivity,
      lastUpdated: d.last_updated
    } satisfies AnkiStats;
  }

  // Process Strava runs once and reuse
  const stravaRuns = (stravaRunsRes.data ?? []) as StravaRunRow[];
  
  // Add Strava runs to combined activity
  for (const run of stravaRuns) {
    if (combinedActivity[run.run_date]) {
      combinedActivity[run.run_date].strava = true;
    } else {
      combinedActivity[run.run_date] = { anki: 0, strava: true };
    }
  }

  if (stravaStatsRes.data) {
    const s = stravaStatsRes.data as StravaStatsRow;
    
    stats.strava = {
      totalRuns: s.total_runs,
      totalDistanceKm: s.total_distance_km,
      totalTimeHours: s.total_time_hours,
      avgPace: s.avg_pace,
      allRuns: stravaRuns.map((r): StravaRun => ({
        date: r.run_date,
        distanceKm: r.distance_km,
        pace: r.pace
      })),
      lastUpdated: s.last_updated
    } satisfies StravaStats;
  }

  return { stats, combinedActivity };
}
