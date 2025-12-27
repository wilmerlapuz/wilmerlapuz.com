<script lang="ts">
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
        throw new Error('Failed');
      }
    } catch {
      status = 'error';
      setTimeout(() => status = 'idle', 3000);
    }
  }
</script>

<section id="contact" class="min-h-screen px-4 py-16 lg:py-24">
  <div class="max-w-4xl mx-auto">
    <div class="mb-10">
      <h2 class="text-2xl font-serif font-medium mb-2 text-zinc-100">Get in touch</h2>
      <p class="text-sm text-zinc-400">Available for opportunities</p>
    </div>

    <form onsubmit={send} class="max-w-2xl space-y-4">
      <input
        type="email"
        bind:value={form.email}
        required
        disabled={status === 'sending' || status === 'sent'}
        class="w-full bg-transparent border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none transition-colors disabled:opacity-50"
        placeholder="your@email.com"
      />
      
      <textarea
        bind:value={form.message}
        required
        disabled={status === 'sending' || status === 'sent'}
        rows="4"
        class="w-full bg-transparent border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none transition-colors resize-none disabled:opacity-50"
        placeholder="Your message..."
      ></textarea>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        class="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if status === 'sending'}
          Sending...
        {:else if status === 'sent'}
          ✓ Sent
        {:else if status === 'error'}
          Failed - Try again
        {:else}
          Send message
        {/if}
      </button>
    </form>

    <div class="mt-12">
      <div class="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
        <a href="mailto:wilmer.lapuz@gmail.com" class="link-underline">wilmer.lapuz@gmail.com</a>
        <span class="text-zinc-600">·</span>
        <a href="https://github.com/wlmr-rk" target="_blank" rel="noopener noreferrer" class="link-underline">GitHub</a>
        <span class="text-zinc-600">·</span>
        <a href="https://www.linkedin.com/in/wilmerlapuz/" target="_blank" rel="noopener noreferrer" class="link-underline">LinkedIn</a>
      </div>
      <div class="mt-6 text-xs text-zinc-600">
        © 2025 Wilmer Lapuz
      </div>
    </div>
  </div>
</section>
