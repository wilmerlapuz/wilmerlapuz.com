<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { prefersReducedMotion } from 'svelte/motion';

  interface Props {
    children: any;
    delay?: number;
    y?: number;
    threshold?: number;
    class?: string;
  }

  let {
    children,
    delay = 0,
    y = 20,
    threshold = 0.1,
    class: className = ''
  }: Props = $props();

  let isVisible = $state(false);
  let element: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  });
</script>

<div bind:this={element} class={className}>
  {#if isVisible}
    <div
      in:fly={{ 
        y: prefersReducedMotion.current ? 0 : y, 
        duration: prefersReducedMotion.current ? 0 : 600, 
        delay,
        easing: cubicOut 
      }}
    >
      {@render children()}
    </div>
  {/if}
</div>
