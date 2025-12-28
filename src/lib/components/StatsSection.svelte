<script lang="ts">
  import { Activity, BookOpen } from '@lucide/svelte';
  import AnimatedNumber from './ui/AnimatedNumber.svelte';
  import GlassCard from './ui/GlassCard.svelte';
  import ScrollReveal from './ui/ScrollReveal.svelte';
  import DonutChart from './charts/DonutChart.svelte';
  import GaugeChart from './charts/GaugeChart.svelte';
  import SparklineChart from './charts/SparklineChart.svelte';
  import HorizontalBarChart from './charts/HorizontalBarChart.svelte';
  import WeeklyRunChart from './WeeklyRunChart.svelte';
  import ActivityGrid from './ActivityGrid.svelte';
  import type { Stats, CombinedActivity } from '$lib/types/stats';

  interface Props {
    stats: Stats;
    combinedActivity?: CombinedActivity;
  }

  let { stats, combinedActivity = {} }: Props = $props();

  // Helper to format relative time
  function getRelativeTime(dateStr?: string): string {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Updated just now';
    if (hours < 24) return `Updated ${hours}h ago`;
    if (days < 7) return `Updated ${days}d ago`;
    
    return `Updated ${date.toLocaleDateString()}`;
  }

  // Prepare donut chart data for card states
  const cardStatesData = $derived(() => {
    if (!stats.anki) return [];
    return [
      { name: 'New', value: stats.anki.cardStates.new, color: '#52525b' },
      { name: 'Young', value: stats.anki.cardStates.young, color: '#60a5fa' },
      { name: 'Mature', value: stats.anki.cardStates.mature, color: '#3b82f6' }
    ];
  });

  // Prepare forecast data for sparkline
  const forecastData = $derived(() => {
    if (!stats.anki) return [];
    // Generate 30 days of forecast data (simplified)
    const avgPerDay = stats.anki.forecast.avgPerDay;
    return Array.from({ length: 30 }, (_, i) => avgPerDay + (Math.random() * 10 - 5));
  });
</script>

<section id="stats" class="min-h-screen px-4 py-16 lg:py-24">
  <div class="max-w-7xl mx-auto">
    
    <!-- Section Header -->
    <ScrollReveal>
      <div class="mb-12">
        <h2 class="text-3xl lg:text-4xl font-serif font-medium mb-3" style="color: var(--text-primary);">Activity Dashboard</h2>
        <p class="text-sm" style="color: var(--text-secondary);">Real-time metrics from my daily routine</p>
      </div>
    </ScrollReveal>

    <!-- Two Column Layout: Learning | Running -->
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
      
      <!-- Learning Panel (Anki) -->
      <div class="space-y-6">
        <ScrollReveal delay={100}>
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <BookOpen size={18} style="color: var(--accent-blue);" />
              <h3 class="text-sm font-medium uppercase tracking-wider" style="color: var(--text-tertiary);">Learning</h3>
            </div>
            {#if stats.anki?.lastUpdated}
              <span class="text-xs" style="color: var(--text-tertiary); opacity: 0.6;">
                {getRelativeTime(stats.anki.lastUpdated)}
              </span>
            {/if}
          </div>
        </ScrollReveal>

        {#if stats.anki}
          <!-- Big Numbers -->
          <ScrollReveal delay={200}>
            <div class="grid grid-cols-2 gap-4">
              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Total Cards</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.anki.totalCards} />
                </div>
              </GlassCard>

              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Retention</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.anki.retention.overall} decimals={1} suffix="%" />
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>

          <!-- Card States Donut -->
          <ScrollReveal delay={300}>
            <GlassCard>
              <div class="text-xs font-medium mb-2" style="color: var(--text-secondary);">Card Distribution</div>
              <DonutChart data={cardStatesData()} />
              <div class="flex items-center justify-center gap-4 text-xs mt-2">
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" style="background: #52525b;"></div>
                  <span style="color: var(--text-tertiary);">New</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" style="background: #60a5fa;"></div>
                  <span style="color: var(--text-tertiary);">Young</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" style="background: #3b82f6;"></div>
                  <span style="color: var(--text-tertiary);">Mature</span>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          <!-- Retention Gauge -->
          <ScrollReveal delay={350}>
            <GlassCard>
              <div class="text-xs font-medium mb-2" style="color: var(--text-secondary);">Overall Retention Rate</div>
              <GaugeChart value={stats.anki.retention.overall} color="var(--accent-blue)" />
            </GlassCard>
          </ScrollReveal>

          <!-- 30-Day Forecast -->
          <ScrollReveal delay={400}>
            <GlassCard>
              <div class="flex items-end justify-between mb-2">
                <div class="text-xs font-medium" style="color: var(--text-secondary);">30-Day Forecast</div>
                <div class="text-sm font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.anki.forecast.next30Days} /> cards
                </div>
              </div>
              <SparklineChart data={forecastData()} color="var(--accent-blue)" />
            </GlassCard>
          </ScrollReveal>

          <!-- Top Decks -->
          <ScrollReveal delay={450}>
            <GlassCard>
              <div class="text-xs font-medium mb-4" style="color: var(--text-secondary);">Top Decks</div>
              <HorizontalBarChart 
                data={stats.anki.topDecks.slice(0, 5).map(d => ({ name: d.name, value: d.cards }))} 
                color="var(--accent-blue)"
                height="h-56"
              />
            </GlassCard>
          </ScrollReveal>

        {:else}
          <GlassCard>
            <p class="text-sm text-center py-8" style="color: var(--text-tertiary);">No learning data available</p>
          </GlassCard>
        {/if}
      </div>

      <!-- Running Panel (Strava) -->
      <div class="space-y-6">
        <ScrollReveal delay={100}>
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <Activity size={18} style="color: var(--accent-orange);" />
              <h3 class="text-sm font-medium uppercase tracking-wider" style="color: var(--text-tertiary);">Running</h3>
            </div>
            {#if stats.strava?.lastUpdated}
              <span class="text-xs" style="color: var(--text-tertiary); opacity: 0.6;">
                {getRelativeTime(stats.strava.lastUpdated)}
              </span>
            {/if}
          </div>
        </ScrollReveal>

        {#if stats.strava}
          <!-- Big Numbers -->
          <ScrollReveal delay={200}>
            <div class="grid grid-cols-2 gap-4">
              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Distance</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.strava.totalDistanceKm} decimals={1} suffix=" km" />
                </div>
              </GlassCard>

              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Total Runs</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.strava.totalRuns} />
                </div>
              </GlassCard>

              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Avg Pace</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.strava.avgPace} decimals={2} />
                  <span class="text-sm ml-1" style="color: var(--text-secondary);">min/km</span>
                </div>
              </GlassCard>

              <GlassCard padding="p-5">
                <div class="text-[10px] uppercase tracking-wider mb-2" style="color: var(--text-tertiary);">Total Time</div>
                <div class="text-3xl font-medium" style="color: var(--text-primary);">
                  <AnimatedNumber value={stats.strava.totalTimeHours} decimals={1} />
                  <span class="text-sm ml-1" style="color: var(--text-secondary);">hrs</span>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>

          <!-- Pace Gauge -->
          <ScrollReveal delay={300}>
            <GlassCard>
              <div class="text-xs font-medium mb-2" style="color: var(--text-secondary);">Average Pace</div>
              <GaugeChart value={stats.strava.avgPace} max={15} unit=" min/km" color="var(--accent-orange)" />
            </GlassCard>
          </ScrollReveal>

          <!-- Weekly Overview Chart -->
          <ScrollReveal delay={350}>
            <GlassCard>
              <div class="text-xs font-medium mb-3" style="color: var(--text-secondary);">Weekly Overview</div>
              {#if stats.strava.allRuns && stats.strava.allRuns.length > 0}
                <WeeklyRunChart runs={stats.strava.allRuns} />
              {/if}
            </GlassCard>
          </ScrollReveal>

          <!-- Recent Runs -->
          <ScrollReveal delay={400}>
            <GlassCard>
              <div class="text-xs font-medium mb-3" style="color: var(--text-secondary);">Recent Runs</div>
              <div class="space-y-2">
                {#each stats.strava.allRuns.slice(0, 5) as run (run.date)}
                  <div 
                    class="flex items-center justify-between py-2 border-b last:border-0"
                    style="border-color: rgba(255,255,255,0.04);"
                  >
                    <div class="flex-1">
                      <div class="text-xs" style="color: var(--text-secondary);">
                        {new Date(run.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div class="flex items-center gap-4 text-xs">
                      <div style="color: var(--text-primary);">{run.distanceKm.toFixed(1)} km</div>
                      <div style="color: var(--text-tertiary);">{run.pace.toFixed(2)} min/km</div>
                    </div>
                  </div>
                {/each}
              </div>
            </GlassCard>
          </ScrollReveal>

        {:else}
          <GlassCard>
            <p class="text-sm text-center py-8" style="color: var(--text-tertiary);">No running data available</p>
          </GlassCard>
        {/if}
      </div>
    </div>

    <!-- Combined Activity Grid -->
    <ScrollReveal delay={500}>
      <div class="mb-6">
        <h3 class="text-sm font-medium uppercase tracking-wider mb-4" style="color: var(--text-tertiary);">Combined Activity</h3>
      </div>
      <GlassCard>
        <ActivityGrid activity={combinedActivity} />
      </GlassCard>
    </ScrollReveal>
  </div>
</section>
