<script lang="ts">
  interface Props {
    children: any;
    class?: string;
    glow?: boolean;
    padding?: string;
  }

  let {
    children,
    class: className = '',
    glow = false,
    padding = 'p-6'
  }: Props = $props();
</script>

<div class="glass {glow ? 'glass-glow' : ''} {padding} {className}">
  {@render children()}
</div>
