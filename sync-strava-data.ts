/**
 * Script to sync Strava running data to Supabase
 * 
 * Usage:
 *   bun run sync-strava-data.ts
 */

import { supabase } from './scripts/supabase-client';

const STRAVA_DATA = {
  stats: {
    total_runs: 32,
    total_distance_km: 153.7,
    total_time_hours: 20.87,
    avg_distance_km: 4.8,
    avg_pace: 8.15,
    last_updated: '2025-12-27'
  },
  runs: [
    { date: '2025-12-25', distance_km: 5.0, time_hours: 0.88, pace: 10.59, name: 'FitShow Walk 2025-12-26 07:10:27.000' },
    { date: '2025-11-14', distance_km: 6.0, time_hours: 0.73, pace: 7.26, name: 'FitShow Run 2025-11-14 21:34:13.000' },
    { date: '2025-11-13', distance_km: 4.19, time_hours: 0.5, pace: 7.2, name: 'FitShow Run 2025-11-13 20:54:14.000' },
    { date: '2025-11-12', distance_km: 4.0, time_hours: 0.47, pace: 7.12, name: 'FitShow Run 2025-11-12 16:25:39.000' },
    { date: '2025-11-12', distance_km: 1.05, time_hours: 0.13, pace: 7.37, name: 'FitShow Run 2025-11-12 13:48:33.000' },
    { date: '2025-11-10', distance_km: 5.62, time_hours: 0.7, pace: 7.5, name: 'FitShow Run 2025-11-10 19:45:59.000' },
    { date: '2025-11-07', distance_km: 11.5, time_hours: 1.64, pace: 8.54, name: 'FitShow Run 2025-11-07 12:02:50.000' },
    { date: '2025-11-06', distance_km: 1.01, time_hours: 0.11, pace: 6.57, name: 'FitShow Run 2025-11-06 13:42:38.000' },
    { date: '2025-11-06', distance_km: 7.5, time_hours: 1.09, pace: 8.76, name: 'FitShow Run 2025-11-06 12:26:11.000' },
    { date: '2025-11-05', distance_km: 2.5, time_hours: 0.32, pace: 7.65, name: 'Indoor Run' },
    { date: '2025-11-04', distance_km: 5.0, time_hours: 0.63, pace: 7.62, name: 'FitShow Run 2025-11-04 16:48:25.000' },
    { date: '2025-11-03', distance_km: 5.0, time_hours: 0.62, pace: 7.43, name: 'FitShow Run 2025-11-03 21:26:08.000' },
    { date: '2025-11-02', distance_km: 6.75, time_hours: 0.96, pace: 8.58, name: 'FitShow Run 2025-11-02 21:16:23.000' },
    { date: '2025-11-01', distance_km: 7.53, time_hours: 0.91, pace: 7.23, name: 'FitShow Run 2025-11-01 23:00:42.000' },
    { date: '2025-10-31', distance_km: 5.0, time_hours: 0.84, pace: 10.09, name: 'FitShow Run 2025-10-31 15:28:16.000' },
    { date: '2025-10-31', distance_km: 5.0, time_hours: 0.68, pace: 8.1, name: 'FitShow Run 2025-10-31 12:29:41.000' },
    { date: '2025-10-30', distance_km: 5.0, time_hours: 0.63, pace: 7.61, name: 'FitShow Run 2025-10-31 03:21:35.000' },
    { date: '2025-10-29', distance_km: 2.52, time_hours: 0.42, pace: 9.92, name: 'FitShow Run 2025-10-29 22:52:18.000' },
    { date: '2025-10-29', distance_km: 5.0, time_hours: 0.72, pace: 8.6, name: 'FitShow Run 2025-10-29 22:05:42.000' },
    { date: '2025-10-29', distance_km: 10.0, time_hours: 1.47, pace: 8.85, name: 'FitShow Run 2025-10-29 20:33:39.000' },
    { date: '2025-10-28', distance_km: 5.0, time_hours: 0.59, pace: 7.11, name: 'FitShow Run 2025-10-28 10:59:51.000' },
    { date: '2025-10-27', distance_km: 5.03, time_hours: 0.61, pace: 7.27, name: 'FitShow Run 2025-10-27 10:59:11.000' },
    { date: '2025-10-26', distance_km: 2.5, time_hours: 0.3, pace: 7.21, name: 'FitShow Run 2025-10-26 21:24:16.000' },
    { date: '2025-10-26', distance_km: 7.5, time_hours: 1.08, pace: 8.64, name: 'FitShow Run 2025-10-26 10:49:54.000' },
    { date: '2025-10-25', distance_km: 2.5, time_hours: 0.33, pace: 7.93, name: 'FitShow Run 2025-10-25 22:42:05.000' },
    { date: '2025-10-25', distance_km: 5.0, time_hours: 0.75, pace: 9.08, name: 'FitShow Run 2025-10-25 22:05:27.000' },
    { date: '2025-10-25', distance_km: 2.5, time_hours: 0.42, pace: 10.09, name: 'FitShow Run 2025-10-25 20:23:43.000' },
    { date: '2025-10-24', distance_km: 5.11, time_hours: 0.68, pace: 7.94, name: 'FitShow Run 2025-10-24 10:17:34.000' },
    { date: '2025-10-23', distance_km: 5.0, time_hours: 0.77, pace: 9.28, name: 'FitShow Run 2025-10-23 10:21:56.000' },
    { date: '2025-10-22', distance_km: 4.03, time_hours: 0.58, pace: 8.64, name: 'FitShow Run 2025-10-22 20:35:55.000' },
    { date: '2025-10-22', distance_km: 4.21, time_hours: 0.65, pace: 9.26, name: 'FitShow Run 2025-10-22 10:19:06.000' },
    { date: '2025-10-21', distance_km: 0.15, time_hours: 0.02, pace: 9.78, name: 'FitShow Run 2025-10-21 10:48:51.000' }
  ]
};

async function syncStravaData() {
  try {
    console.log('📊 Syncing Strava data to Supabase...\n');

    // 1. Update aggregate stats
    console.log('Updating strava_stats...');
    const { error: statsError } = await supabase
      .from('strava_stats')
      .update({
        last_updated: STRAVA_DATA.stats.last_updated,
        total_runs: STRAVA_DATA.stats.total_runs,
        total_distance_km: STRAVA_DATA.stats.total_distance_km,
        total_time_hours: STRAVA_DATA.stats.total_time_hours,
        avg_distance_km: STRAVA_DATA.stats.avg_distance_km,
        avg_pace: STRAVA_DATA.stats.avg_pace,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1);

    if (statsError) {
      throw new Error(`Stats update error: ${statsError.message}`);
    }
    console.log('✅ Stats updated');

    // 2. Clear existing runs and insert all fresh data
    console.log('\nClearing old runs...');
    const { error: deleteError } = await supabase
      .from('strava_runs')
      .delete()
      .neq('id', 0); // Delete all

    if (deleteError) {
      throw new Error(`Delete error: ${deleteError.message}`);
    }
    console.log('✅ Old runs cleared');

    // 3. Insert all runs
    console.log('\nInserting fresh run data...');
    const runsToInsert = STRAVA_DATA.runs.map(run => ({
      name: run.name,
      distance_km: run.distance_km,
      run_date: run.date,
      time_hours: run.time_hours,
      pace: run.pace
    }));

    const { error: insertError } = await supabase
      .from('strava_runs')
      .insert(runsToInsert);

    if (insertError) {
      throw new Error(`Insert error: ${insertError.message}`);
    }

    console.log(`✅ Successfully synced ${STRAVA_DATA.runs.length} runs!`);
    console.log('\n📈 Summary:');
    console.log(`   Total Runs: ${STRAVA_DATA.stats.total_runs}`);
    console.log(`   Total Distance: ${STRAVA_DATA.stats.total_distance_km} km`);
    console.log(`   Total Time: ${STRAVA_DATA.stats.total_time_hours} hours`);
    console.log(`   Average Pace: ${STRAVA_DATA.stats.avg_pace} min/km`);
    console.log('\n🎉 Strava data is now up to date!');
  } catch (error) {
    console.error('❌ Error syncing Strava data:', error);
    Bun.exit(1);
  }
}

syncStravaData();
