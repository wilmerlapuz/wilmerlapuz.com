<script lang="ts">
  import ProfileSection from '$lib/components/ProfileSection.svelte';
  import StatsSection from '$lib/components/StatsSection.svelte';
  import NewContactSection from '$lib/components/NewContactSection.svelte';

  let { data }: any = $props();
</script>

<main>
  <ProfileSection />
  <StatsSection stats={data.stats} combinedActivity={data.combinedActivity} />
  <NewContactSection />
</main>
