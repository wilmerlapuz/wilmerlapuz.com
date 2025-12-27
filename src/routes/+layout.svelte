<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Wilmer Lapuz — Full Stack Developer</title>
  <meta name="description" content="Full Stack Developer with 7+ years of professional experience. Specializing in JavaScript, React, SvelteKit. Open to opportunities." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
</svelte:head>

<div class="bg-gradient"></div>
<div class="relative z-10 antialiased">
  {@render children()}
</div>
