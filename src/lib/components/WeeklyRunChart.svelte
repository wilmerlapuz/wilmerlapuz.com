<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts/core';
  import { BarChart, LineChart } from 'echarts/charts';
  import {
    GridComponent,
    TooltipComponent
  } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  echarts.use([
    BarChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    CanvasRenderer
  ]);

  let { runs }: { runs: Array<{ date: string; distanceKm: number; pace: number }> } = $props();
  
  let chartContainer: HTMLDivElement | undefined = $state();
  
  onMount(() => {
    if (!chartContainer) return;
    
    // Group runs by week
    const groupByWeek = () => {
      const weeks: any = {};
      runs.forEach((run) => {
        const date = new Date(run.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Sunday
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeks[weekKey]) {
          weeks[weekKey] = { totalDistance: 0, paces: [], runCount: 0 };
        }
        weeks[weekKey].totalDistance += run.distanceKm;
        weeks[weekKey].paces.push(run.pace);
        weeks[weekKey].runCount++;
      });
      
      return Object.entries(weeks)
        .map(([week, data]: any) => ({
          week: new Date(week),
          distance: parseFloat(data.totalDistance.toFixed(1)),
          avgPace: parseFloat((data.paces.reduce((sum: number, p: number) => sum + p, 0) / data.paces.length).toFixed(2)),
          runCount: data.runCount
        }))
        .sort((a, b) => a.week.getTime() - b.week.getTime());
    };
    
    const weeklyData = groupByWeek();
    
    const chart = echarts.init(chartContainer, 'dark');
    
    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: '50px',
        right: '50px',
        top: '20px',
        bottom: '40px',
        containLabel: false
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(24, 24, 27, 0.95)',
        borderColor: '#3f3f46',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: (params: any) => {
          const barData = params[0];
          const lineData = params[1];
          const date = new Date(barData.axisValue);
          return `
            <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">
              ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div style="color: #fb923c; font-weight: 600; margin-bottom: 2px;">
              ${barData.value} km
            </div>
            <div style="color: #60a5fa; font-size: 11px;">
              ${lineData.value} min/km avg
            </div>
            <div style="color: #71717a; font-size: 10px; margin-top: 2px;">
              ${barData.data.runCount} run${barData.data.runCount > 1 ? 's' : ''}
            </div>
          `;
        }
      },
      xAxis: {
        type: 'category',
        data: weeklyData.map(d => d.week),
        axisLabel: {
          formatter: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          },
          color: '#71717a',
          fontSize: 10,
          interval: Math.floor(weeklyData.length / 6),
          rotate: 0
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'km',
          nameTextStyle: {
            color: '#71717a',
            fontSize: 10
          },
          axisLabel: {
            color: '#71717a',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: '#27272a',
              opacity: 0.5
            }
          }
        },
        {
          type: 'value',
          name: 'min/km',
          nameTextStyle: {
            color: '#60a5fa',
            fontSize: 10
          },
          axisLabel: {
            color: '#60a5fa',
            fontSize: 10
          },
          splitLine: {
            show: false
          },
          inverse: true
        }
      ],
      series: [
        {
          name: 'Distance',
          type: 'bar',
          data: weeklyData.map(d => ({ value: d.distance, runCount: d.runCount })),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#fb923c' },
              { offset: 1, color: '#ea580c' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fdba74' },
                { offset: 1, color: '#fb923c' }
              ])
            }
          },
          barMaxWidth: 40
        },
        {
          name: 'Avg Pace',
          type: 'line',
          yAxisIndex: 1,
          data: weeklyData.map(d => d.avgPace),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color: '#60a5fa',
            width: 2
          },
          itemStyle: {
            color: '#60a5fa',
            borderColor: '#000',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3
            }
          }
        }
      ]
    };
    
    chart.setOption(option);
    
    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(chartContainer);
    
    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  });
</script>

<div bind:this={chartContainer} class="w-full h-64"></div>
