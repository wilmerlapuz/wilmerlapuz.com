import { supabase } from '$lib/supabase.js';

export async function load() {
  const [ankiRes, ankiActivityRes, stravaStatsRes, stravaRunsRes] = await Promise.all([
    supabase.from('anki_stats').select('*').order('last_updated', { ascending: false }).limit(1).single(),
    supabase.from('anki_daily_activity').select('activity_date, review_count').order('activity_date', { ascending: false }),
    supabase.from('strava_stats').select('*').order('last_updated', { ascending: false }).limit(1).single(),
    supabase.from('strava_runs').select('*').order('run_date', { ascending: false })
  ]);

  const stats: any = {};

  if (ankiRes.data) {
    const d = ankiRes.data;
    
    // Transform daily activity data to { "2024-12-27": 863, ... } format
    const dailyActivity = ankiActivityRes.data?.reduce((acc: any, record: any) => {
      acc[record.activity_date] = record.review_count;
      return acc;
    }, {}) || {};
    
    stats.anki = {
      totalCards: d.total_cards,
      totalNotes: d.total_notes,
      cardStates: { mature: d.mature_cards, young: d.young_cards, new: d.new_cards },
      retention: { overall: parseFloat(d.retention_overall), young: parseFloat(d.retention_young), mature: parseFloat(d.retention_mature) },
      forecast: { next30Days: d.forecast_next_30_days, avgPerDay: d.forecast_avg_per_day },
      topDecks: d.top_decks || [],
      todayStudied: d.today_studied,
      dailyActivity
    };
  }

  if (stravaStatsRes.data && stravaRunsRes.data) {
    const s = stravaStatsRes.data;
    stats.strava = {
      totalRuns: s.total_runs,
      totalDistanceKm: s.total_distance_km.toString(),
      totalTimeHours: s.total_time_hours.toString(),
      avgPace: s.avg_pace.toString(),
      allRuns: stravaRunsRes.data.map((r: any) => ({
        date: r.run_date,
        distanceKm: parseFloat(r.distance_km),
        pace: parseFloat(r.pace)
      }))
    };
  }

  // Combine daily activity from both sources
  const combinedActivity: Record<string, { anki: number; strava: boolean }> = {};
  
  // Add Anki activity
  if (ankiActivityRes.data) {
    ankiActivityRes.data.forEach((record: any) => {
      combinedActivity[record.activity_date] = { 
        anki: record.review_count, 
        strava: false 
      };
    });
  }
  
  // Add Strava activity
  if (stravaRunsRes.data) {
    stravaRunsRes.data.forEach((run: any) => {
      if (combinedActivity[run.run_date]) {
        combinedActivity[run.run_date].strava = true;
      } else {
        combinedActivity[run.run_date] = { anki: 0, strava: true };
      }
    });
  }

  return { stats, combinedActivity };
}
