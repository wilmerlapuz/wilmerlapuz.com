<script lang="ts">
  import { onMount } from 'svelte';
  import type { StravaRun } from '$lib/types/stats';

  interface WeekData {
    week: string;
    distance: number;
    avgPace: number;
    runCount: number;
  }

  interface Props {
    runs: StravaRun[];
  }

  let { runs }: Props = $props();
  let chartContainer: HTMLDivElement | undefined = $state();
  let chartReady = $state(false);
  
  function groupByWeek(): WeekData[] {
    const weeks: Record<string, { totalDistance: number; paces: number[]; runCount: number }> = {};
    runs.forEach((run) => {
      const date = new Date(run.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      if (!weeks[weekKey]) weeks[weekKey] = { totalDistance: 0, paces: [], runCount: 0 };
      weeks[weekKey].totalDistance += run.distanceKm;
      weeks[weekKey].paces.push(run.pace);
      weeks[weekKey].runCount++;
    });
    return Object.entries(weeks)
      .map(([week, data]) => ({
        week,
        distance: parseFloat(data.totalDistance.toFixed(1)),
        avgPace: parseFloat((data.paces.reduce((sum, p) => sum + p, 0) / data.paces.length).toFixed(2)),
        runCount: data.runCount
      }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-12); // Last 12 weeks
  }
  
  onMount(() => {
    if (!chartContainer) return;
    
    let chart: import('echarts').ECharts | null = null;
    let ro: ResizeObserver | null = null;
    
    const initChart = async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const echarts = await import('echarts');
      
      const weeklyData = groupByWeek();
      if (weeklyData.length === 0 || !chartContainer) return;
      
      chart = echarts.init(chartContainer);
      
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 45, right: 45, top: 30, bottom: 30, containLabel: false },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(24, 24, 27, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          textStyle: { color: '#fafafa', fontSize: 12 }
        },
        xAxis: {
          type: 'category',
          data: weeklyData.map(d => {
            const date = new Date(d.week);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          axisLabel: { color: '#a1a1aa', fontSize: 10 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: [
          { 
            type: 'value',
            axisLabel: { color: '#a1a1aa', fontSize: 10, formatter: '{value}' },
            splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
          },
          { 
            type: 'value',
            axisLabel: { color: '#3b82f6', fontSize: 10 },
            splitLine: { show: false },
            inverse: true
          }
        ],
        series: [
          { 
            name: 'Distance (km)', 
            type: 'bar', 
            data: weeklyData.map(d => d.distance),
            itemStyle: { 
              color: '#f97316',
              borderRadius: [4, 4, 0, 0]
            },
            barMaxWidth: 30
          },
          { 
            name: 'Pace (min/km)', 
            type: 'line', 
            yAxisIndex: 1,
            data: weeklyData.map(d => d.avgPace),
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: { color: '#3b82f6', width: 2 },
            itemStyle: { color: '#3b82f6' }
          }
        ]
      });
      
      chartReady = true;
      
      ro = new ResizeObserver(() => chart?.resize());
      ro.observe(chartContainer);
    };
    
    initChart();
    
    return () => { 
      ro?.disconnect(); 
      chart?.dispose(); 
    };
  });
</script>

<div bind:this={chartContainer} class="w-full h-64 min-h-[256px]"></div>
