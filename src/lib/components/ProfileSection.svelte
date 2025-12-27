<script lang="ts">
  import { GithubIcon, LinkedinIcon, Mail, MapPin, ExternalLink, Download, ArrowUpRight } from 'lucide-svelte';

  const experience = [
    { role: 'Fraud Claims Specialist', company: 'J.P. Morgan', period: '2017 – 2025', current: false },
    { role: 'Self-taught Developer', company: 'Career Transition', period: '2025 – Present', current: true }
  ];

  const skills = {
    proficient: [
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'SvelteKit', icon: 'devicon-svelte-plain colored' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-original colored' }
    ],
    learning: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Rust', icon: 'devicon-rust-original' },
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
    { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/wlmr-rk' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/wilmerlapuz/' },
    { icon: Mail, label: 'Email', href: 'mailto:wilmerlapuz@gmail.com' }
  ];
</script>

<section id="profile" class="min-h-screen px-4 py-16 lg:py-24">
  <div class="max-w-4xl mx-auto">
    
    <!-- Header -->
    <header class="mb-16">
      <div class="flex items-start justify-between mb-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-2 h-2 rounded-full bg-red-500 status-dot"></div>
            <span class="text-xs text-red-400 font-medium tracking-wide">OPEN TO WORK</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-3">
            Wilmer <span class="text-gradient">Lapuz</span>
          </h1>
          <p class="text-lg text-zinc-400">Full Stack Developer</p>
        </div>
        
        <div class="hidden sm:flex items-center gap-3">
          {#each links as link (link.label)}
            <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors" aria-label={link.label}>
              <link.icon size={18} />
            </a>
          {/each}
        </div>
      </div>

      <p class="text-zinc-400 leading-relaxed max-w-2xl mb-6">
        Former fraud analyst at J.P. Morgan turned software engineer. I bring 7+ years of analytical rigor to building 
        <span class="text-white">efficient, reliable web applications</span>. Currently focused on JavaScript ecosystem 
        while expanding into systems programming with Rust and Kotlin.
      </p>

      <div class="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
        <span class="flex items-center gap-1.5">
          <MapPin size={14} />
          Philippines · GMT+8
        </span>
        <span class="text-zinc-700">·</span>
        <span>Remote preferred</span>
        <span class="text-zinc-700">·</span>
        <a href="/resume.pdf" class="flex items-center gap-1.5 text-red-400 link-underline">
          <Download size={14} />
          Resume
        </a>
      </div>
    </header>

    <!-- Two Column Layout -->
    <div class="grid lg:grid-cols-5 gap-8 lg:gap-12">
      
      <!-- Left Column: Experience & Skills -->
      <div class="lg:col-span-2 space-y-10">
        
        <!-- Experience - Timeline Style -->
        <div>
          <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">Experience</h2>
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-red-500/50 via-zinc-700 to-transparent"></div>
            
            <div class="space-y-6">
              {#each experience as exp, i (exp.role)}
                <div class="relative pl-6">
                  <!-- Timeline dot -->
                  <div class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full {exp.current ? 'bg-red-500 ring-4 ring-red-500/20' : 'bg-zinc-600 ring-2 ring-zinc-800'}"></div>
                  
                  <div class="text-xs text-zinc-600 mb-1">{exp.period}</div>
                  <div class="text-sm font-medium text-white">{exp.role}</div>
                  <div class="text-xs text-zinc-500">{exp.company}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Skills - Icon only with tooltip -->
        <div>
          <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Skills</h2>
          <div class="space-y-4">
            <div>
              <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">Proficient</div>
              <div class="flex flex-wrap gap-3">
                {#each skills.proficient as skill (skill.name)}
                  <div class="skill-icon group relative" title={skill.name}>
                    <i class="{skill.icon} text-xl"></i>
                    <span class="skill-tooltip">{skill.name}</span>
                  </div>
                {/each}
              </div>
            </div>
            <div>
              <div class="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">Learning</div>
              <div class="flex flex-wrap gap-3">
                {#each skills.learning as skill (skill.name)}
                  <div class="skill-icon learning group relative" title={skill.name}>
                    <i class="{skill.icon} text-xl"></i>
                    <span class="skill-tooltip">{skill.name}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Social Links -->
        <div class="sm:hidden">
          <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Connect</h2>
          <div class="flex gap-2">
            {#each links as link (link.label)}
              <a href={link.href} target="_blank" rel="noopener noreferrer" class="p-2.5 text-zinc-400" aria-label={link.label}>
                <link.icon size={18} />
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Column: Projects - Minimal border-left style -->
      <div class="lg:col-span-3">
        <h2 class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">Selected Work</h2>
        <div class="space-y-1">
          {#each projects as project, i (project.title)}
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-item group block py-4 {i !== 0 ? 'border-t border-zinc-800/50' : ''}">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{project.title}</h3>
                    <ArrowUpRight size={12} class="text-zinc-700 group-hover:text-red-400 transition-colors" />
                  </div>
                  <p class="text-xs text-zinc-500 leading-relaxed">{project.description}</p>
                </div>
                <div class="flex flex-wrap gap-1 justify-end max-w-[120px]">
                  {#each project.tech as tech (tech)}
                    <span class="text-[10px] text-zinc-600">{tech}</span>
                  {/each}
                </div>
              </div>
            </a>
          {/each}
        </div>
        
        <a href="https://github.com/wlmr-rk" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 mt-6 text-xs text-zinc-500 link-underline">
          View all on GitHub
          <ExternalLink size={12} />
        </a>
      </div>
    </div>

  </div>
</section>
