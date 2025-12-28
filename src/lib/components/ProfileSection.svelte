<script lang="ts">
  import { Github, Linkedin, Mail, MapPin, Download, ArrowUpRight, ChevronDown } from '@lucide/svelte';
  import ScrollReveal from './ui/ScrollReveal.svelte';

  const experience = [
    { role: 'Fraud Claims Specialist', company: 'J.P. Morgan', period: '2017 – 2025', current: false },
    { role: 'Self-taught Developer', company: 'Career Transition', period: '2025 – Present', current: true }
  ];

  const skills = {
    proficient: [
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-original' },
      { name: 'SvelteKit', icon: 'devicon-svelte-plain colored' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-original colored' }
    ],
    learning: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Rust', icon: 'devicon-rust-plain colored' },
      { name: 'Kotlin', icon: 'devicon-kotlin-plain colored' }
    ]
  };

  const projects = [
    {
      title: 'This Portfolio',
      description: 'Real-time stats dashboard with automated data pipeline',
      tech: ['SvelteKit', 'TypeScript', 'Vercel'],
      url: 'https://github.com/wlmr-rk/wilmerlapuz.com'
    },
    {
      title: 'NixOS Config',
      description: 'Reproducible system configuration with Hyprland',
      tech: ['Nix', 'Hyprland', 'Fish'],
      url: 'https://github.com/wlmr-rk/wlmr-nix'
    },
    {
      title: 'Project Nexus',
      description: 'Serverless data aggregation from multiple APIs',
      tech: ['Node.js', 'GitHub Actions'],
      url: 'https://github.com/wlmr-rk/proj-nexus'
    }
  ];

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
      <ScrollReveal>
        <div class="flex items-center justify-center lg:justify-start gap-3 mb-6">
          <div class="w-2 h-2 rounded-full bg-red-500 status-dot"></div>
          <span class="text-xs text-red-400 font-medium tracking-wider uppercase">Open to Work</span>
        </div>
      </ScrollReveal>

      <!-- Name with Gradient -->
      <ScrollReveal delay={100}>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium tracking-tight mb-6">
          <span style="color: var(--text-primary);">Wilmer</span>{' '}
          <span class="text-gradient">Lapuz</span>
        </h1>
      </ScrollReveal>

      <!-- Tagline -->
      <ScrollReveal delay={200}>
        <p class="text-xl lg:text-2xl mb-8" style="color: var(--text-secondary);">
          Full Stack Developer
        </p>
      </ScrollReveal>

      <!-- Bio -->
      <ScrollReveal delay={300}>
        <p class="text-base lg:text-lg leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-8" style="color: var(--text-secondary);">
          Former fraud analyst at J.P. Morgan turned software engineer. I bring 7+ years of analytical rigor to building{' '}
          <span style="color: var(--text-primary);">efficient, reliable web applications</span>. Currently focused on JavaScript ecosystem 
          while expanding into systems programming with Rust and Kotlin.
        </p>
      </ScrollReveal>

      <!-- Meta Info -->
      <ScrollReveal delay={400}>
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
      </ScrollReveal>

      <!-- Social Links -->
      <ScrollReveal delay={500}>
        <div class="flex items-center justify-center lg:justify-start gap-4 mb-16">
          {#each links as link (link.label)}
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 hover:scale-110"
              style="background: var(--bg-elevated); border-color: rgba(255,255,255,0.06); color: var(--text-secondary);"
              aria-label={link.label}
            >
              <svelte:component this={link.icon} size={18} />
            </a>
          {/each}
        </div>
      </ScrollReveal>
    </div>

    <!-- Experience & Skills Grid -->
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
      
      <!-- Experience Column -->
      <ScrollReveal delay={600}>
        <div>
          <h2 class="text-xs font-medium uppercase tracking-wider mb-6" style="color: var(--text-tertiary);">Experience</h2>
          <div class="relative">
            <!-- Timeline line -->
            <div 
              class="absolute left-[5px] top-2 bottom-2 w-px" 
              style="background: linear-gradient(to bottom, rgba(239,68,68,0.5), var(--bg-elevated));"
            ></div>
            
            <div class="space-y-6">
              {#each experience as exp (exp.role)}
                <div class="relative pl-6">
                  <!-- Timeline dot -->
                  <div 
                    class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full"
                    style={exp.current 
                      ? 'background: var(--accent-red); box-shadow: 0 0 0 4px rgba(239,68,68,0.2);' 
                      : 'background: var(--text-tertiary); border: 2px solid var(--bg-primary);'}
                  ></div>
                  
                  <div class="text-xs mb-1" style="color: var(--text-tertiary);">{exp.period}</div>
                  <div class="text-sm font-medium mb-1" style="color: var(--text-primary);">{exp.role}</div>
                  <div class="text-xs" style="color: var(--text-secondary);">{exp.company}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <!-- Skills Column -->
      <ScrollReveal delay={700}>
        <div>
          <h2 class="text-xs font-medium uppercase tracking-wider mb-6" style="color: var(--text-tertiary);">Skills</h2>
          <div class="space-y-6">
            <div>
              <div class="text-[10px] uppercase tracking-wider mb-3" style="color: var(--text-tertiary); opacity: 0.7;">Proficient</div>
              <div class="flex flex-wrap gap-3">
                {#each skills.proficient as skill (skill.name)}
                  <div class="skill-icon group relative" aria-label={skill.name}>
                    <i class="{skill.icon} text-xl" aria-hidden="true"></i>
                    <span class="skill-tooltip">{skill.name}</span>
                  </div>
                {/each}
              </div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider mb-3" style="color: var(--text-tertiary); opacity: 0.7;">Learning</div>
              <div class="flex flex-wrap gap-3">
                {#each skills.learning as skill (skill.name)}
                  <div class="skill-icon learning group relative" aria-label={skill.name}>
                    <i class="{skill.icon} text-xl" aria-hidden="true"></i>
                    <span class="skill-tooltip">{skill.name}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>

    <!-- Projects -->
    <ScrollReveal delay={800}>
      <div>
        <h2 class="text-xs font-medium uppercase tracking-wider mb-6" style="color: var(--text-tertiary);">Selected Work</h2>
        <div class="space-y-1">
          {#each projects as project, i (project.title)}
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="group block py-4 transition-colors hover:bg-white/[0.02] rounded-lg px-3 -mx-3"
              style={i !== 0 ? 'border-top: 1px solid rgba(255,255,255,0.04);' : ''}
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 
                      class="text-sm font-medium transition-colors"
                      style="color: var(--text-primary);"
                    >
                      {project.title}
                    </h3>
                    <ArrowUpRight 
                      size={12} 
                      class="transition-colors opacity-40 group-hover:opacity-100"
                      style="color: var(--accent-red);"
                    />
                  </div>
                  <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">{project.description}</p>
                </div>
                <div class="flex flex-wrap gap-2 justify-end max-w-[140px]">
                  {#each project.tech as tech (tech)}
                    <span class="text-[10px]" style="color: var(--text-tertiary);">{tech}</span>
                  {/each}
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </ScrollReveal>
  </div>

  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
    <span class="text-xs" style="color: var(--text-tertiary); opacity: 0.5;">Scroll</span>
    <ChevronDown size={16} class="scroll-indicator" style="color: var(--text-tertiary); opacity: 0.5;" />
  </div>
</section>
