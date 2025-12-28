<script lang="ts">
  import { onMount } from 'svelte';
  import type { ECharts } from 'echarts';

  interface Props {
    data: Array<{ name: string; value: number; color: string }>;
    title?: string;
  }

  let { data, title = '' }: Props = $props();
  
  let chartContainer: HTMLDivElement | undefined = $state();
  let chart: ECharts | null = null;

  onMount(() => {
    if (!chartContainer) return;

    let cleanup: (() => void) | undefined;

    const initChart = async () => {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const echarts = await import('echarts');
      
      if (!chartContainer) return;
      
      chart = echarts.init(chartContainer);

      const option = {
        backgroundColor: 'transparent',
        title: title ? {
          text: title,
          left: 'center',
          top: 10,
          textStyle: {
            color: '#a1a1aa',
            fontSize: 12,
            fontWeight: 'normal'
          }
        } : undefined,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(24, 24, 27, 0.95)',
          borderColor: '#3f3f46',
          textStyle: { 
            color: '#fafafa', 
            fontSize: 12 
          },
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: false
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#09090b',
              borderWidth: 2
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'normal',
                color: '#fafafa'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              show: false
            },
            data: data.map(item => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: item.color
              }
            })),
            animationType: 'scale',
            animationEasing: 'cubicOut',
            animationDelay: () => Math.random() * 200
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

<div bind:this={chartContainer} class="w-full h-64"></div>
