<script lang="ts">
  import { Activity, BookOpen } from '@lucide/svelte';
  import WeeklyRunChart from './WeeklyRunChart.svelte';
  import ActivityGrid from './ActivityGrid.svelte';

  let { stats, combinedActivity = {} }: any = $props();
</script>

<section id="stats" class="min-h-screen px-4 py-16 lg:py-24">
  <div class="max-w-4xl mx-auto">
    <div class="mb-10">
      <h2 class="text-2xl font-serif font-medium mb-2 text-zinc-100">Activity</h2>
      <p class="text-sm text-zinc-400">What I've been up to lately</p>
    </div>

    <!-- Activity Grid -->
    <div class="mb-12">
      <ActivityGrid activity={combinedActivity} />
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      
      <!-- Strava / Running -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <Activity size={16} class="text-orange-500" />
          <h3 class="text-xs font-medium text-zinc-400 uppercase tracking-wider">Running</h3>
        </div>
        
        {#if stats?.strava}
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Distance</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.strava.totalDistanceKm}<span class="text-sm text-zinc-400 ml-1">km</span></div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Runs</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.strava.totalRuns}</div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Avg Pace</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.strava.avgPace}<span class="text-sm text-zinc-400 ml-1">min/km</span></div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Time</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{parseFloat(stats.strava.totalTimeHours).toFixed(1)}<span class="text-sm text-zinc-400 ml-1">hrs</span></div>
            </div>
          </div>
          
          <!-- Weekly Overview Chart -->
          {#if stats.strava.allRuns && stats.strava.allRuns.length > 0}
            <div class="mt-8">
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-3">Weekly Overview</div>
              <WeeklyRunChart runs={stats.strava.allRuns} />
            </div>
          {/if}
        {:else}
          <p class="text-xs text-zinc-500">No running data</p>
        {/if}
      </div>

      <!-- Anki / Learning -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <BookOpen size={16} class="text-blue-500" />
          <h3 class="text-xs font-medium text-zinc-400 uppercase tracking-wider">Learning</h3>
        </div>
        
        {#if stats?.anki}
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Cards</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.anki.totalCards.toLocaleString()}</div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Retention</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.anki.retention.overall}<span class="text-sm text-zinc-400 ml-1">%</span></div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Mature</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.anki.cardStates.mature}</div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Due (30d)</div>
              <div class="text-2xl font-serif font-medium text-zinc-100">{stats.anki.forecast.next30Days}</div>
            </div>
          </div>
          
          <!-- Top decks -->
          <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-3">Top Decks</div>
          <div class="space-y-2">
            {#each stats.anki.topDecks.slice(0, 5) as deck (deck.name)}
              <div class="flex items-center justify-between py-2 border-b border-zinc-800/50">
                <div class="text-xs text-zinc-300 truncate pr-4">{deck.name}</div>
                <div class="text-xs text-zinc-100">{deck.cards.toLocaleString()}</div>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-xs text-zinc-500">No Anki data</p>
        {/if}
      </div>
    </div>
  </div>
</section>
