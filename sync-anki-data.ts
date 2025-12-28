/**
 * Script to sync Anki daily activity data to Supabase
 * 
 * Usage:
 *   bun run sync-anki-data.ts [environment]
 * 
 * Examples:
 *   bun run sync-anki-data.ts           # Sync to localhost (dev)
 *   bun run sync-anki-data.ts prod      # Sync to production
 * 
 * This script directly inserts Anki daily activity data into Supabase.
 * The data should be provided in the ANKI_DAILY_ACTIVITY constant below.
 */

import { supabase } from './scripts/supabase-client';

// Anki daily activity data (last updated: 2025-12-27)
// Total days with activity: 145
// Total reviews: 87,142
const ANKI_DAILY_ACTIVITY: Record<string, number> = {
  "2024-11-30": 24088,
  "2024-12-01": 571,
  "2024-12-02": 563,
  "2024-12-03": 1072,
  "2024-12-04": 1130,
  "2024-12-05": 130,
  "2024-12-06": 912,
  "2024-12-07": 460,
  "2024-12-08": 582,
  "2024-12-09": 1068,
  "2024-12-10": 567,
  "2024-12-11": 362,
  "2024-12-12": 222,
  "2024-12-17": 128,
  "2025-01-04": 15,
  "2025-01-22": 1,
  "2025-02-07": 10,
  "2025-02-09": 614,
  "2025-02-10": 75,
  "2025-02-11": 386,
  "2025-02-12": 498,
  "2025-02-13": 877,
  "2025-02-14": 520,
  "2025-02-15": 338,
  "2025-02-16": 310,
  "2025-02-17": 532,
  "2025-02-18": 284,
  "2025-02-19": 456,
  "2025-02-20": 143,
  "2025-02-21": 508,
  "2025-02-22": 509,
  "2025-02-23": 204,
  "2025-02-24": 671,
  "2025-02-25": 295,
  "2025-02-26": 1245,
  "2025-02-27": 258,
  "2025-02-28": 649,
  "2025-03-01": 896,
  "2025-03-02": 770,
  "2025-03-03": 544,
  "2025-03-04": 463,
  "2025-03-05": 911,
  "2025-03-06": 414,
  "2025-03-07": 773,
  "2025-03-08": 1233,
  "2025-03-09": 721,
  "2025-03-10": 1320,
  "2025-03-11": 626,
  "2025-03-12": 635,
  "2025-03-13": 556,
  "2025-03-14": 519,
  "2025-03-15": 64,
  "2025-03-16": 2605,
  "2025-03-17": 614,
  "2025-03-18": 525,
  "2025-03-19": 786,
  "2025-03-20": 807,
  "2025-03-21": 1090,
  "2025-03-22": 113,
  "2025-03-23": 128,
  "2025-03-24": 2669,
  "2025-03-25": 637,
  "2025-03-26": 561,
  "2025-03-27": 865,
  "2025-03-28": 1156,
  "2025-03-29": 766,
  "2025-03-30": 567,
  "2025-03-31": 496,
  "2025-04-01": 166,
  "2025-04-02": 16,
  "2025-04-04": 11,
  "2025-04-05": 2,
  "2025-04-10": 225,
  "2025-04-11": 221,
  "2025-04-12": 1,
  "2025-04-13": 142,
  "2025-05-11": 1120,
  "2025-06-06": 3,
  "2025-06-10": 4,
  "2025-06-11": 1,
  "2025-06-25": 116,
  "2025-06-26": 156,
  "2025-06-27": 357,
  "2025-06-29": 36,
  "2025-07-11": 126,
  "2025-07-12": 52,
  "2025-07-13": 124,
  "2025-07-14": 33,
  "2025-07-15": 128,
  "2025-07-16": 15,
  "2025-07-17": 6,
  "2025-07-18": 5,
  "2025-07-19": 71,
  "2025-07-20": 76,
  "2025-07-21": 12,
  "2025-07-24": 74,
  "2025-07-28": 30,
  "2025-07-29": 25,
  "2025-08-06": 21,
  "2025-08-10": 1,
  "2025-10-12": 10,
  "2025-10-20": 2,
  "2025-10-21": 276,
  "2025-10-22": 576,
  "2025-10-23": 512,
  "2025-10-24": 424,
  "2025-10-25": 196,
  "2025-10-26": 3072,
  "2025-10-27": 503,
  "2025-10-28": 290,
  "2025-10-29": 114,
  "2025-10-30": 90,
  "2025-10-31": 186,
  "2025-11-01": 16,
  "2025-11-02": 138,
  "2025-11-03": 229,
  "2025-11-04": 1933,
  "2025-11-05": 13,
  "2025-11-06": 404,
  "2025-11-07": 218,
  "2025-11-08": 49,
  "2025-11-09": 10,
  "2025-11-10": 64,
  "2025-11-12": 95,
  "2025-11-13": 64,
  "2025-11-14": 1,
  "2025-11-15": 76,
  "2025-11-16": 22,
  "2025-11-17": 300,
  "2025-12-10": 373,
  "2025-12-11": 1,
  "2025-12-13": 2877,
  "2025-12-14": 161,
  "2025-12-15": 527,
  "2025-12-16": 503,
  "2025-12-17": 448,
  "2025-12-18": 340,
  "2025-12-19": 150,
  "2025-12-20": 187,
  "2025-12-21": 572,
  "2025-12-22": 170,
  "2025-12-24": 43,
  "2025-12-25": 98,
  "2025-12-26": 487,
  "2025-12-27": 863
};

async function syncAnkiData() {
  try {
    if (Object.keys(ANKI_DAILY_ACTIVITY).length === 0) {
      console.log('⚠️  No daily activity data provided.');
      console.log('');
      console.log('Please add your Anki data to the ANKI_DAILY_ACTIVITY constant in this script.');
      console.log('You can get this data using OpenCode by running:');
      console.log('  personal-stats_anki_get_daily_activity');
      console.log('');
      console.log('Then paste the JSON object into ANKI_DAILY_ACTIVITY.');
      return;
    }

    console.log(`📊 Syncing ${Object.keys(ANKI_DAILY_ACTIVITY).length} days of Anki activity...`);

    // Prepare data for upsert
    const records = Object.entries(ANKI_DAILY_ACTIVITY).map(([date, count]) => ({
      activity_date: date,
      review_count: count,
    }));

    // Upsert all records (insert or update if exists)
    const { data, error } = await supabase
      .from('anki_daily_activity')
      .upsert(records, { 
        onConflict: 'activity_date',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log(`✅ Successfully synced ${data?.length || 0} records!`);
    console.log('');
    console.log('Your Anki activity is now available on the website.');
  } catch (error) {
    console.error('❌ Error syncing Anki data:', error);
    Bun.exit(1);
  }
}

syncAnkiData();
