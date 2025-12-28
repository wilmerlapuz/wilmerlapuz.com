<script lang="ts">
  type DayData = {
    date: string;
    anki: number;
    strava: boolean;
  };

  let { activity = {} }: { activity: Record<string, { anki: number; strava: boolean }> } = $props();

  function generateGridData(): DayData[][] {
    const today = new Date();
    
    // Find the first Strava date
    const stravaDates = Object.keys(activity).filter(date => activity[date].strava);
    if (stravaDates.length === 0) {
      return [];
    }
    
    const firstStravaDate = new Date(Math.min(...stravaDates.map(d => new Date(d).getTime())));
    
    // Start from the first Sunday before or on the first Strava date
    const startDate = new Date(firstStravaDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const weeks: DayData[][] = [];
    let currentWeek: DayData[] = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayData = activity[dateStr] || { anki: 0, strava: false };
      
      currentWeek.push({
        date: dateStr,
        anki: dayData.anki,
        strava: dayData.strava
      });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Add remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', anki: 0, strava: false });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  }

  function getMonthLabels(weeks: DayData[][]): Array<{ label: string; col: number }> {
    const labels: Array<{ label: string; col: number }> = [];
    let lastMonth = -1;
    
    weeks.forEach((week, idx) => {
      const firstDay = week.find(d => d.date);
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        
        if (month !== lastMonth) {
          labels.push({
            label: date.toLocaleDateString('en', { month: 'short' }),
            col: idx
          });
          lastMonth = month;
        }
      }
    });
    
    return labels;
  }

  function getCellColor(day: DayData): string {
    if (!day.date) return 'bg-transparent';
    
    const hasAnki = day.anki > 0;
    const hasStrava = day.strava;
    
    if (hasAnki && hasStrava) {
      // Both activities - use gradient class
      return 'activity-both';
    } else if (hasAnki) {
      // Only Anki - blue scale
      const intensity = Math.min(day.anki / 200, 1);
      if (intensity > 0.75) return 'bg-blue-500';
      if (intensity > 0.5) return 'bg-blue-600';
      if (intensity > 0.25) return 'bg-blue-700';
      return 'bg-blue-900';
    } else if (hasStrava) {
      // Only Strava - orange
      return 'bg-orange-600';
    }
    
    // No activity
    return 'bg-zinc-900';
  }

  function getTooltip(day: DayData): string {
    if (!day.date) return '';
    
    const date = new Date(day.date).toLocaleDateString('en', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const parts = [];
    if (day.anki > 0) parts.push(`${day.anki} cards`);
    if (day.strava) parts.push('Run');
    
    if (parts.length === 0) return `${date}: No activity`;
    return `${date}: ${parts.join(' + ')}`;
  }

  const weeks = $derived(generateGridData());
  const monthLabels = $derived(getMonthLabels(weeks));
</script>

<div class="activity-grid">
  <!-- Month labels -->
  <div class="flex gap-1.5 mb-2 pl-8">
    {#each monthLabels as { label, col }}
      <div class="text-[10px]" style="margin-left: {col * 20}px; color: var(--text-tertiary);">
        {label}
      </div>
    {/each}
  </div>

  <!-- Grid -->
  <div class="flex gap-1">
    <!-- Day labels -->
    <div class="flex flex-col gap-1.5 text-[10px] pr-2" style="color: var(--text-tertiary);">
      <div style="height: 14px"></div>
      <div>Mon</div>
      <div style="height: 14px"></div>
      <div>Wed</div>
      <div style="height: 14px"></div>
      <div>Fri</div>
      <div style="height: 14px"></div>
    </div>

    <!-- Weeks -->
    <div class="flex gap-1.5" role="grid" aria-label="Activity calendar">
      {#each weeks as week, weekIdx}
        <!-- Add gap between months (skip first month) -->
        {#if weekIdx > 0 && monthLabels.some(m => m.col === weekIdx)}
          <div class="w-3"></div>
        {/if}
        
        <div class="flex flex-col gap-1.5" role="row">
          {#each week as day}
            <div
              class="w-[14px] h-[14px] rounded {getCellColor(day)} transition-all hover:ring-2 hover:scale-110"
              style="--tw-ring-color: rgba(255,255,255,0.2);"
              role="gridcell"
              aria-label={getTooltip(day)}
            ></div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Legend -->
  <div class="flex items-center gap-3 mt-4 text-[10px]" style="color: var(--text-tertiary);">
    <span>Less</span>
    <div class="flex gap-1.5">
      <div class="w-[14px] h-[14px] rounded bg-zinc-900"></div>
      <div class="w-[14px] h-[14px] rounded bg-blue-900"></div>
      <div class="w-[14px] h-[14px] rounded bg-blue-700"></div>
      <div class="w-[14px] h-[14px] rounded bg-blue-500"></div>
    </div>
    <span style="color: var(--accent-blue);">Anki</span>
    
    <div class="w-[14px] h-[14px] rounded bg-orange-600"></div>
    <span style="color: var(--accent-orange);">Run</span>
    
    <div class="w-[14px] h-[14px] rounded activity-both"></div>
    <span style="color: var(--text-secondary);">Both</span>
    <span>More</span>
  </div>
</div>

<style>
  .activity-both {
    background: linear-gradient(135deg, #3b82f6 0%, #3b82f6 48%, #7e6fd9 50%, #ea580c 52%, #ea580c 100%);
  }
</style>
