import { json, type RequestEvent } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const body = await request.json();
    const { dailyActivity } = body;

    if (!dailyActivity || typeof dailyActivity !== 'object') {
      return json({ error: 'Invalid daily activity data' }, { status: 400 });
    }

    // Prepare data for upsert
    const records = Object.entries(dailyActivity).map(([date, count]) => ({
      activity_date: date,
      review_count: count as number,
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
      console.error('Supabase error:', error);
      return json({ error: error.message }, { status: 500 });
    }

    return json({ 
      message: 'Anki daily activity synced successfully',
      recordsUpserted: data?.length || 0
    });
  } catch (err) {
    console.error('API Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return json({ error: errorMessage }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    // Fetch all daily activity records
    const { data, error } = await supabase
      .from('anki_daily_activity')
      .select('activity_date, review_count')
      .order('activity_date', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return json({ error: error.message }, { status: 500 });
    }

    // Transform to the format: { "2024-12-27": 863, ... }
    const dailyActivity = data.reduce((acc, record) => {
      acc[record.activity_date] = record.review_count;
      return acc;
    }, {} as Record<string, number>);

    return json({ dailyActivity });
  } catch (err) {
    console.error('API Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return json({ error: errorMessage }, { status: 500 });
  }
};
