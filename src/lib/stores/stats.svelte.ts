import type { AllStats, StravaStats, AnkiStats } from '$lib/types/stats';
import { supabase } from '$lib/supabase';

export async function fetchStats(): Promise<AllStats> {
  // Fetch latest Anki stats
  const { data: ankiData, error: ankiError } = await supabase
    .from('anki_stats')
    .select('*')
    .order('last_updated', { ascending: false })
    .limit(1)
    .single();

  if (ankiError) console.error('Anki fetch error:', ankiError);

  // Fetch Anki daily activity
  const { data: ankiActivityData, error: ankiActivityError } = await supabase
    .from('anki_daily_activity')
    .select('activity_date, review_count')
    .order('activity_date', { ascending: false });

  if (ankiActivityError) console.error('Anki activity fetch error:', ankiActivityError);

  // Fetch latest Strava aggregate stats
  const { data: stravaStatsData, error: stravaStatsError } = await supabase
    .from('strava_stats')
    .select('*')
    .order('last_updated', { ascending: false })
    .limit(1)
    .single();

  if (stravaStatsError) console.error('Strava stats fetch error:', stravaStatsError);

  // Fetch recent Strava runs
  const { data: stravaRunsData, error: stravaRunsError } = await supabase
    .from('strava_runs')
    .select('*')
    .order('run_date', { ascending: false })
    .limit(5);

  if (stravaRunsError) console.error('Strava runs fetch error:', stravaRunsError);

  const stats: AllStats = { 
    lastUpdated: new Date().toISOString() 
  };

  // Transform Anki data to match expected format
  if (ankiData) {
    // Transform daily activity data
    const dailyActivity = ankiActivityData?.reduce((acc, record) => {
      acc[record.activity_date] = record.review_count;
      return acc;
    }, {} as Record<string, number>) || {};

    stats.anki = {
      lastUpdated: ankiData.last_updated,
      totalCards: ankiData.total_cards,
      totalNotes: ankiData.total_notes,
      deckCount: ankiData.deck_count,
      cardStates: {
        new: ankiData.new_cards,
        learning: ankiData.learning_cards,
        young: ankiData.young_cards,
        mature: ankiData.mature_cards,
        suspended: ankiData.suspended_cards,
        buried: ankiData.buried_cards,
      },
      today: {
        studied: ankiData.today_studied,
        timeMinutes: ankiData.today_time_minutes,
      },
      retention: {
        overall: parseFloat(ankiData.retention_overall),
        young: parseFloat(ankiData.retention_young),
        mature: parseFloat(ankiData.retention_mature),
      },
      forecast: {
        next30Days: ankiData.forecast_next_30_days,
        avgPerDay: ankiData.forecast_avg_per_day,
      },
      topDecks: ankiData.top_decks || [],
      dailyActivity,
    } as AnkiStats;
  }

  // Transform Strava data to match expected format
  if (stravaStatsData && stravaRunsData) {
    stats.strava = {
      totalRuns: stravaStatsData.total_runs,
      totalDistanceKm: stravaStatsData.total_distance_km.toString(),
      totalTimeHours: stravaStatsData.total_time_hours.toString(),
      avgDistanceKm: stravaStatsData.avg_distance_km.toString(),
      avgPace: stravaStatsData.avg_pace.toString(),
      recentRuns: stravaRunsData.map(run => ({
        name: run.name,
        distanceKm: run.distance_km.toString(),
        date: run.run_date,
        pace: run.pace.toString(),
      })),
    } as StravaStats;
  }

  return stats;
}
