<script lang="ts">
  import { Heart } from 'lucide-svelte';
  const year = new Date().getFullYear();
</script>

<footer class="px-4 py-8 border-t border-white/5">
  <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
    <div class="flex items-center gap-1.5">
      Built with <Heart size={12} class="text-red-500" /> using SvelteKit
    </div>
    <div class="flex items-center gap-4">
      <span>© {year} Wilmer Lapuz</span>
      <div class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-red-500 status-dot"></span>
        <span class="text-red-400">Open to work</span>
      </div>
    </div>
  </div>
</footer>
