<script lang="ts">
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import GlassCard from '$lib/components/ui/GlassCard.svelte';

  let form = $state({ email: '', message: '' });
  let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function send(e: Event) {
    e.preventDefault();
    status = 'sending';
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Quick Contact',
          email: form.email,
          company: '',
          subject: 'general-inquiry',
          message: form.message
        })
      });

      if (res.ok || res.status === 207) {
        status = 'sent';
        setTimeout(() => {
          form = { email: '', message: '' };
          status = 'idle';
        }, 3000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Contact form error:', errorData.error || res.statusText);
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      status = 'error';
      setTimeout(() => status = 'idle', 3000);
    }
  }
</script>

<section id="contact" class="min-h-screen px-4 py-16 lg:py-24 flex items-center">
  <div class="max-w-4xl mx-auto w-full">
    <ScrollReveal>
      <div class="mb-10">
        <h2 class="text-3xl font-serif font-medium mb-2 text-[var(--text-primary)]">Get in touch</h2>
        <p class="text-sm text-[var(--text-tertiary)]">Available for opportunities</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <GlassCard>
        <form onsubmit={send} class="space-y-5">
          <div>
            <label for="contact-email" class="sr-only">Your email</label>
            <input
              id="contact-email"
              type="email"
              bind:value={form.email}
              required
              disabled={status === 'sending' || status === 'sent'}
              class="glass-input"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label for="contact-message" class="sr-only">Your message</label>
            <textarea
              id="contact-message"
              bind:value={form.message}
              required
              disabled={status === 'sending' || status === 'sent'}
              rows="6"
              class="glass-input resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            class="w-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-orange)] text-white py-3.5 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {#if status === 'sending'}
              <span class="inline-flex items-center gap-2">
                <span class="animate-pulse">Sending</span>
              </span>
            {:else if status === 'sent'}
              <span class="inline-flex items-center gap-2">
                <span>✓</span> Message sent successfully
              </span>
            {:else if status === 'error'}
              <span class="inline-flex items-center gap-2">
                <span>⚠</span> Failed - Try again
              </span>
            {:else}
              Send message
            {/if}
          </button>
        </form>
      </GlassCard>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <div class="mt-12">
        <div class="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
          <a href="mailto:wilmer.lapuz@gmail.com" class="link-underline hover:text-[var(--accent-orange)] transition-colors">wilmer.lapuz@gmail.com</a>
          <span class="text-[var(--border-subtle)]">·</span>
          <a href="https://github.com/wlmr-rk" target="_blank" rel="noopener noreferrer" class="link-underline hover:text-[var(--accent-orange)] transition-colors">GitHub</a>
          <span class="text-[var(--border-subtle)]">·</span>
          <a href="https://www.linkedin.com/in/wilmerlapuz/" target="_blank" rel="noopener noreferrer" class="link-underline hover:text-[var(--accent-orange)] transition-colors">LinkedIn</a>
        </div>
        <div class="mt-6 text-xs text-[var(--text-muted)]">
          © 2025 Wilmer Lapuz
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
