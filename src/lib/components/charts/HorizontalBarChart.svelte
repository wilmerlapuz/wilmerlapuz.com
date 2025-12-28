<script lang="ts">
  import { onMount } from 'svelte';
  import type { ECharts } from 'echarts';

  interface Props {
    data: Array<{ name: string; value: number }>;
    color?: string;
    height?: string;
  }

  let { 
    data, 
    color = '#3b82f6',
    height = 'h-64'
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
          left: 10,
          right: 40,
          top: 10,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          data: data.map(d => d.name),
          axisLabel: {
            color: '#a1a1aa',
            fontSize: 11,
            width: 120,
            overflow: 'truncate'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            data: data.map(d => d.value),
            itemStyle: {
              color,
              borderRadius: [0, 4, 4, 0]
            },
            label: {
              show: true,
              position: 'right',
              color: '#fafafa',
              fontSize: 11,
              formatter: '{c}'
            },
            barMaxWidth: 20,
            animationDuration: 800,
            animationEasing: 'cubicOut',
            animationDelay: (idx: number) => idx * 100
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
