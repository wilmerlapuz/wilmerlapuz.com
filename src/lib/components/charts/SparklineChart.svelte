<script lang="ts">
  import { onMount } from 'svelte';
  import type { ECharts } from 'echarts';

  interface Props {
    data: number[];
    labels?: string[];
    color?: string;
    height?: string;
  }

  let { 
    data, 
    labels = [],
    color = '#3b82f6',
    height = 'h-24'
  }: Props = $props();
  
  let chartContainer: HTMLDivElement | undefined = $state();
  let chart: ECharts | null = null;

  onMount(() => {
    if (!chartContainer) return;

    let cleanup: (() => void) | undefined;

    const initChart = async () => {
      const echarts = await import('echarts');
      chart = echarts.init(chartContainer!);

      const option = {
        backgroundColor: 'transparent',
        grid: {
          left: 0,
          right: 0,
          top: 8,
          bottom: 0,
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: labels.length > 0 ? labels : data.map((_, i) => i),
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            type: 'line',
            data,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color,
              width: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: color.replace(')', ', 0.3)').replace('rgb', 'rgba') },
                  { offset: 1, color: 'transparent' }
                ]
              }
            },
            animationDuration: 800,
            animationEasing: 'cubicOut'
          }
        ]
      };

      chart.setOption(option);

      const handleResize = () => chart?.resize();
      window.addEventListener('resize', handleResize);

      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        chart?.dispose();
      };
    };

    initChart();

    return () => cleanup?.();
  });
</script>

<div bind:this={chartContainer} class="w-full {height}"></div>
