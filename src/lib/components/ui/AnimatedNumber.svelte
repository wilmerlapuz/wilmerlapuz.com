<script lang="ts">
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { prefersReducedMotion } from 'svelte/motion';

  interface Props {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    class?: string;
  }

  let { 
    value, 
    duration = 1200,
    decimals = 0,
    prefix = '',
    suffix = '',
    class: className = ''
  }: Props = $props();

  const tween = new Tween(0, {
    duration: () => prefersReducedMotion.current ? 0 : duration,
    easing: cubicOut
  });

  $effect(() => {
    tween.set(value);
  });

  const formattedValue = $derived(() => {
    const num = tween.current;
    if (decimals === 0) {
      return Math.round(num).toLocaleString();
    }
    return num.toFixed(decimals);
  });
</script>

<span class={className}>
  {prefix}{formattedValue()}{suffix}
</span>
