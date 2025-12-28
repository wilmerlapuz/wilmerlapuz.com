<script lang="ts">
  import ProfileSection from '$lib/components/ProfileSection.svelte';
  import StatsSection from '$lib/components/StatsSection.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import type { PageData } from '$lib/types/stats';

  let { data }: { data: PageData } = $props();
</script>

<main>
  <ProfileSection />
  <StatsSection stats={data.stats} combinedActivity={data.combinedActivity} />
  <ContactSection />
</main>
