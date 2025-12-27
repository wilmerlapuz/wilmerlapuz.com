<script lang="ts">
  import { Mail, MessageCircle, Send, Github, Linkedin, MapPin, Calendar, Clock, CircleCheck, CircleAlert, ExternalLink, Download } from '@lucide/svelte';

  let formData = $state({ name: '', email: '', company: '', subject: '', message: '' });
  let status = $state<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'wilmer.lapuz@gmail.com', href: 'mailto:wilmer.lapuz@gmail.com', description: 'Best way to reach me' },
    { icon: MapPin, label: 'Location', value: 'Philippines', description: 'Available for remote work globally' },
    { icon: Clock, label: 'Timezone', value: 'GMT+8 (PHT)', description: 'Flexible with meeting times' },
    { icon: Calendar, label: 'Availability', value: 'Immediate', description: 'Ready to start contributing' }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/wlmr-rk', username: '@wlmr-rk', description: 'View my code and contributions' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/wilmerlapuz/', username: 'Wilmer Lapuz', description: 'Professional network and experience' },
    { icon: Download, label: 'Resume', href: '/resume.pdf', username: 'Download PDF', description: 'Complete professional background' }
  ];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    status = { type: 'loading', message: 'Sending message...' };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        status = { type: 'success', message: "Message sent successfully! I'll get back to you soon." };
        formData = { name: '', email: '', company: '', subject: '', message: '' };
      } else if (response.status === 207) {
        const result = await response.json();
        status = { type: 'success', message: result.message || 'Your message was saved, but the email notification failed.' };
        formData = { name: '', email: '', company: '', subject: '', message: '' };
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      status = { type: 'error', message: 'An error occurred. Please try emailing me directly at wilmer.lapuz@gmail.com' };
    }
  }
</script>

<section id="contact" class="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8">
  <div class="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]"></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">Let's Connect</h2>
      <p class="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">Ready to contribute to your team or collaborate on exciting projects</p>
      <div class="inline-flex items-center px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 backdrop-blur-[40px]">
        <span class="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-red-500 size-2 mr-3 shadow-[0_0_12px_rgba(220,38,38,0.8)]"></span>
        <span class="text-sm font-semibold text-red-500">Available for immediate opportunities</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div class="lg:col-span-2">
        <div class="card-container relative perspective-distant">
          <div class="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 p-8 lg:p-12 backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22">
            <div class="floating-accent absolute top-6 right-6 z-10 size-1.5 animate-[float-accent_5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-red-500 to-red-600 shadow-[0_0_16px_rgba(255,90,90,0.9)]"></div>

            <div class="flex items-center mb-8">
              <div class="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-4">
                <MessageCircle size={24} class="text-red-500" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Send a Message</h3>
                <p class="text-white/60">I'll respond within 24 hours</p>
              </div>
            </div>

            <form onsubmit={handleSubmit} class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-semibold text-white mb-2">Full Name *</label>
                  <input type="text" id="name" bind:value={formData.name} required class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Your name" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-semibold text-white mb-2">Email Address *</label>
                  <input type="email" id="email" bind:value={formData.email} required class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="your.email@example.com" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="company" class="block text-sm font-semibold text-white mb-2">Company/Organization</label>
                  <input type="text" id="company" bind:value={formData.company} class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Your company (optional)" />
                </div>
                <div>
                  <label for="subject" class="block text-sm font-semibold text-white mb-2">Subject *</label>
                  <select id="subject" bind:value={formData.subject} required class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-[20px] transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                    <option value="">Select a subject</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="project-collaboration">Project Collaboration</option>
                    <option value="freelance-inquiry">Freelance Inquiry</option>
                    <option value="technical-consultation">Technical Consultation</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-white mb-2">Message *</label>
                <textarea id="message" bind:value={formData.message} required rows={6} class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none" placeholder="Tell me about the opportunity, project, or how I can help..."></textarea>
              </div>

              {#if status.type !== 'idle'}
                <div class="flex items-center p-4 rounded-xl border {status.type === 'success' ? 'border-red-500/20 bg-red-500/5 text-red-500' : status.type === 'error' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-blue-500/20 bg-blue-500/5 text-blue-400'}">
                  {#if status.type === 'success'}
                    <CircleCheck size={20} class="mr-3 flex-shrink-0" />
                  {:else if status.type === 'error'}
                    <CircleAlert size={20} class="mr-3 flex-shrink-0" />
                  {:else}
                    <div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-400/20 border-t-blue-400 mr-3 flex-shrink-0"></div>
                  {/if}
                  <span class="text-sm">{status.message}</span>
                </div>
              {/if}

              <button type="submit" disabled={status.type === 'loading'} class="ease-snappy w-full flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-semibold transition-all duration-400 hover:from-red-500 hover:to-red-600 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                <Send size={18} class="mr-2" />
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
          <h3 class="text-lg font-bold text-white mb-6 flex items-center">
            <Mail size={20} class="mr-3 text-red-500" />Contact Information
          </h3>
          <div class="space-y-4">
            {#each contactInfo as info (info.label)}
              <div class="flex items-start">
                <div class="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3 mt-0.5">
                  <info.icon size={16} class="text-red-500" />
                </div>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-white mb-1">{info.label}</div>
                  {#if info.href}
                    <a href={info.href} class="text-sm text-red-500 hover:text-white transition-colors">{info.value}</a>
                  {:else}
                    <div class="text-sm text-white/80">{info.value}</div>
                  {/if}
                  <div class="text-xs text-white/50 mt-1">{info.description}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
          <h3 class="text-lg font-bold text-white mb-6">Connect With Me</h3>
          <div class="space-y-3">
            {#each socialLinks as social (social.label)}
              <a href={social.href} target="_blank" rel="noopener noreferrer" class="ease-snappy flex items-center p-3 rounded-xl border border-white/8 bg-white/5 text-white/80 transition-all duration-400 hover:border-white/15 hover:bg-white/10 hover:text-white group">
                <div class="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                  <social.icon size={16} class="text-red-500" />
                </div>
                <div class="flex-1">
                  <div class="text-sm font-semibold">{social.label}</div>
                  <div class="text-xs text-white/60">{social.username}</div>
                </div>
                <ExternalLink size={14} class="text-white/40 group-hover:text-white/60 transition-colors" />
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
