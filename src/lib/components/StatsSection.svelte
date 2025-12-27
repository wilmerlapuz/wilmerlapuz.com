<script lang="ts">
  import { Activity, BookOpen, Loader2, AlertCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fetchStats } from '$lib/stores/stats.svelte';
  import type { AllStats } from '$lib/types/stats';

  let stats = $state<AllStats | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      stats = await fetchStats();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load stats';
    } finally {
      loading = false;
    }
  });
</script>

<section id="stats" class="px-4 py-16 lg:py-24 border-t border-zinc-800/50">
  <div class="max-w-4xl mx-auto">
    <div class="mb-10">
      <h2 class="text-2xl font-serif font-medium mb-2">Activity</h2>
      <p class="text-sm text-zinc-500">What I've been up to lately</p>
    </div>

    {#if loading}
      <div class="py-12 text-center">
        <Loader2 size={20} class="animate-spin text-zinc-600 mx-auto mb-3" />
        <p class="text-xs text-zinc-600">Loading...</p>
      </div>
    {:else if error}
      <div class="py-12 text-center">
        <AlertCircle size={20} class="text-zinc-600 mx-auto mb-3" />
        <p class="text-xs text-zinc-600">{error}</p>
      </div>
    {:else}
      <div class="grid lg:grid-cols-2 gap-12">
        
        <!-- Strava / Running -->
        <div>
          <div class="flex items-center gap-2 mb-6">
            <Activity size={16} class="text-orange-500" />
            <h3 class="text-xs font-medium text-zinc-500 uppercase tracking-wider">Running</h3>
          </div>
          
          {#if stats?.strava}
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Total Distance</div>
                <div class="text-2xl font-serif font-medium">{stats.strava.totalDistanceKm}<span class="text-sm text-zinc-500 ml-1">km</span></div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Runs</div>
                <div class="text-2xl font-serif font-medium">{stats.strava.totalRuns}</div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Avg Pace</div>
                <div class="text-2xl font-serif font-medium">{stats.strava.avgPace}<span class="text-sm text-zinc-500 ml-1">min/km</span></div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Total Time</div>
                <div class="text-2xl font-serif font-medium">{parseFloat(stats.strava.totalTimeHours).toFixed(1)}<span class="text-sm text-zinc-500 ml-1">hrs</span></div>
              </div>
            </div>
            
            <!-- Recent runs -->
            <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">Recent</div>
            <div class="space-y-2">
              {#each stats.strava.recentRuns.slice(0, 3) as run (run.date)}
                <div class="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <div class="text-xs text-zinc-400">{new Date(run.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <div class="text-xs text-white">{run.distanceKm} km</div>
                  <div class="text-xs text-zinc-500">{run.pace} min/km</div>
                </div>
              {/each}
            </div>
          {:else}
            <p class="text-xs text-zinc-600">No running data</p>
          {/if}
        </div>

        <!-- Anki / Learning -->
        <div>
          <div class="flex items-center gap-2 mb-6">
            <BookOpen size={16} class="text-blue-500" />
            <h3 class="text-xs font-medium text-zinc-500 uppercase tracking-wider">Learning</h3>
          </div>
          
          {#if stats?.anki}
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Total Cards</div>
                <div class="text-2xl font-serif font-medium">{stats.anki.totalCards.toLocaleString()}</div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Retention</div>
                <div class="text-2xl font-serif font-medium">{stats.anki.retention.overall}<span class="text-sm text-zinc-500 ml-1">%</span></div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Mature</div>
                <div class="text-2xl font-serif font-medium">{stats.anki.cardStates.mature}</div>
              </div>
              <div>
                <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Due (30d)</div>
                <div class="text-2xl font-serif font-medium">{stats.anki.forecast.next30Days}</div>
              </div>
            </div>
            
            <!-- Top decks -->
            <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">Decks</div>
            <div class="space-y-2">
              {#each stats.anki.topDecks.slice(0, 3) as deck (deck.name)}
                <div class="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <div class="text-xs text-zinc-400">{deck.name}</div>
                  <div class="text-xs text-white">{deck.cards.toLocaleString()}</div>
                </div>
              {/each}
            </div>
          {:else}
            <p class="text-xs text-zinc-600">No Anki data</p>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>
