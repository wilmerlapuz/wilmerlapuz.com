<script lang="ts">
  import { Github, Linkedin, Mail, MapPin, Download, ArrowUpRight, ChevronDown } from '@lucide/svelte';

  const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/wlmr-rk' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/wilmerlapuz/' },
    { icon: Mail, label: 'Email', href: 'mailto:wilmer.lapuz@gmail.com' }
  ];
</script>

<section id="profile" class="min-h-screen flex flex-col justify-center px-4 py-16 lg:py-24 relative">
  <div class="max-w-6xl mx-auto w-full">
    
    <!-- Hero Content -->
    <div class="text-center lg:text-left mb-20 lg:mb-24">
      <!-- Status Badge -->
      <div class="flex items-center justify-center lg:justify-start gap-3 mb-6">
        <div class="w-2 h-2 rounded-full bg-red-500 status-dot"></div>
        <span class="text-xs text-red-400 font-medium tracking-wider uppercase">Open to Work</span>
      </div>

      <!-- Name with Gradient -->
      <h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium tracking-tight mb-6">
        <span style="color: var(--text-primary);">Wilmer</span>{' '}
        <span class="text-gradient">Lapuz</span>
      </h1>

      <!-- Tagline -->
      <p class="text-xl lg:text-2xl mb-8" style="color: var(--text-secondary);">
        Full Stack Developer
      </p>

      <!-- Bio -->
      <p class="text-base lg:text-lg leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-8" style="color: var(--text-secondary);">
        Former fraud analyst at J.P. Morgan turned software engineer. I bring 7+ years of analytical rigor to building{' '}
        <span style="color: var(--text-primary);">efficient, reliable web applications</span>. Currently focused on JavaScript ecosystem 
        while expanding into systems programming with Rust and Kotlin.
      </p>

      <!-- Meta Info -->
      <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm mb-10" style="color: var(--text-tertiary);">
        <span class="flex items-center gap-1.5">
          <MapPin size={14} />
          Philippines · GMT+8
        </span>
        <span style="color: var(--text-tertiary); opacity: 0.3;">·</span>
        <span>Remote preferred</span>
        <span style="color: var(--text-tertiary); opacity: 0.3;">·</span>
        <a href="/resume.pdf" class="flex items-center gap-1.5 link-underline transition-colors" style="color: var(--accent-red);">
          <Download size={14} />
          Resume
        </a>
      </div>

      <!-- Social Links -->
      <div class="flex items-center justify-center lg:justify-start gap-4 mb-16">
        {#each links as link (link.label)}
          <a 
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
            style="background: var(--bg-elevated); border: 1px solid var(--glass-border); color: var(--text-secondary);"
            aria-label={link.label}
          >
            <svelte:component this={link.icon} size={20} />
          </a>
        {/each}
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
      <ChevronDown size={24} style="color: var(--text-tertiary);" />
    </div>
  </div>
</section>
