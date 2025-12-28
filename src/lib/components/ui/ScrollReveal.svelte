<script lang="ts">
  interface Props {
    children: any;
    delay?: number;
    y?: number;
    threshold?: number;
    class?: string;
  }

  let {
    children,
    class: className = ''
  }: Props = $props();
</script>

<!-- Simplified version - just render children without animation for now -->
<div class={className}>
  {@render children()}
</div>
