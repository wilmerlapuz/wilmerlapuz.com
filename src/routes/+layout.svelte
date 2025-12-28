<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Wilmer Lapuz — Full Stack Developer</title>
  <meta name="description" content="Full Stack Developer with 7+ years of professional experience. Specializing in JavaScript, React, SvelteKit. Open to opportunities." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet" />
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
</svelte:head>

<!-- Noise texture overlay -->
<div class="fixed inset-0 pointer-events-none z-50 noise-overlay"></div>

<!-- Gradient orbs -->
<div class="fixed inset-0 pointer-events-none overflow-hidden">
  <div class="gradient-orb gradient-orb-red"></div>
  <div class="gradient-orb gradient-orb-blue"></div>
</div>

<!-- Content -->
<div class="relative z-10 antialiased">
  {@render children()}
</div>
