<script lang="ts">
  import { onMount } from 'svelte';
  import type { ECharts } from 'echarts';

  interface Props {
    value: number;
    max?: number;
    title?: string;
    unit?: string;
    color?: string;
  }

  let { 
    value, 
    max = 100, 
    title = '', 
    unit = '%',
    color = '#3b82f6'
  }: Props = $props();
  
  let chartContainer: HTMLDivElement | undefined = $state();
  let chart: ECharts | null = null;

  onMount(() => {
    if (!chartContainer) return;

    let cleanup: (() => void) | undefined;

    const initChart = async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const echarts = await import('echarts');
      
      if (!chartContainer) return;
      
      chart = echarts.init(chartContainer);

      const option = {
        backgroundColor: 'transparent',
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max,
            center: ['50%', '75%'],
            radius: '90%',
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [1, 'rgba(255, 255, 255, 0.1)']
                ]
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              valueAnimation: true,
              formatter: `{value}${unit}`,
              color: '#fafafa',
              fontSize: 24,
              fontWeight: '500',
              offsetCenter: [0, '-20%']
            },
            title: {
              show: !!title,
              offsetCenter: [0, '20%'],
              fontSize: 12,
              color: '#a1a1aa'
            },
            data: [
              {
                value,
                name: title,
                itemStyle: {
                  color
                }
              }
            ],
            progress: {
              show: true,
              width: 8,
              roundCap: true
            },
            animationDuration: 1200,
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

<div bind:this={chartContainer} class="w-full h-40"></div>
